/**
 * overlay.js — Manages freely-placeable decorations & text over the chibi.
 * Unified drag system for touch + mouse, selection handles, resize/delete.
 */

const Overlay = (() => {
  let items = [];
  let selectedId = null;
  let nextId = 1;
  let dragState = null;
  let onUpdateCallback = null;

  // ─── ITEM MANAGEMENT ────────────────────────────────

  function addDecoration(decoId) {
    const item = {
      id: nextId++,
      type: 'deco',
      decoId,
      x: 80 + Math.random() * 40,
      y: 100 + Math.random() * 80,
      scale: 1,
    };
    items.push(item);
    selectedId = item.id;
    return item;
  }

  function addText(text, font, fontSize) {
    const item = {
      id: nextId++,
      type: 'text',
      text,
      font,
      fontSize: parseFloat(fontSize),
      x: 100,
      y: 150,
      scale: 1,
    };
    items.push(item);
    selectedId = item.id;
    return item;
  }

  function updateText(id, text, font, fontSize) {
    const item = items.find(i => i.id === id);
    if (item && item.type === 'text') {
      item.text = text;
      item.font = font;
      item.fontSize = parseFloat(fontSize);
    }
  }

  function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    if (selectedId === id) selectedId = null;
  }

  function resizeItem(id, delta) {
    const item = items.find(i => i.id === id);
    if (item) {
      item.scale = Math.max(0.3, Math.min(3, item.scale + delta));
    }
  }

  function select(id) { selectedId = id; }
  function deselect() { selectedId = null; }
  function getSelected() { return selectedId; }
  function getSelectedItem() { return items.find(i => i.id === selectedId) || null; }
  function getItems() { return items; }

  function setItems(newItems) {
    items = newItems || [];
    nextId = items.reduce((max, i) => Math.max(max, i.id + 1), 1);
    selectedId = null;
  }

  // ─── SVG RENDERING ──────────────────────────────────

  function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function toSVGContent(includeHandles) {
    let svg = '<g id="overlay-items">';

    for (const item of items) {
      if (item.type === 'deco') {
        const deco = DECORATIONS.find(d => d.id === item.decoId);
        if (!deco) continue;
        svg += `<g data-overlay-id="${item.id}" transform="translate(${item.x},${item.y}) scale(${item.scale})" style="cursor:move">${deco.svg}</g>`;
      } else if (item.type === 'text') {
        const fs = item.fontSize * item.scale;
        svg += `<text data-overlay-id="${item.id}" x="${item.x}" y="${item.y}" font-family="'${item.font}', sans-serif" font-size="${fs}" fill="#000" text-anchor="middle" dominant-baseline="middle" style="cursor:move">${escapeXml(item.text)}</text>`;
      }
    }

    svg += '</g>';

    if (includeHandles && selectedId !== null) {
      svg += renderHandles();
    }

    return svg;
  }

  function getItemBounds(item) {
    if (item.type === 'deco') {
      const r = 15 * item.scale;
      return { x: item.x, y: item.y, halfW: r, halfH: r };
    } else {
      const len = (item.text || '').length || 1;
      const fs = item.fontSize * item.scale;
      const halfW = Math.max(12, fs * len * 0.35);
      const halfH = fs * 0.6;
      return { x: item.x, y: item.y, halfW, halfH };
    }
  }

  function renderHandles() {
    const item = items.find(i => i.id === selectedId);
    if (!item) return '';

    const b = getItemBounds(item);
    const pad = 4;
    const x1 = b.x - b.halfW - pad;
    const y1 = b.y - b.halfH - pad;
    const w = (b.halfW + pad) * 2;
    const h = (b.halfH + pad) * 2;

    return `<g class="overlay-handles">
      <rect x="${x1}" y="${y1}" width="${w}" height="${h}" fill="none" stroke="#e94560" stroke-width="0.8" stroke-dasharray="3,2" rx="2"/>
      <g data-action="delete" data-action-id="${selectedId}" style="cursor:pointer">
        <circle cx="${b.x + b.halfW + pad}" cy="${y1}" r="5" fill="#e94560"/>
        <line x1="${b.x + b.halfW + pad - 2}" y1="${y1 - 2}" x2="${b.x + b.halfW + pad + 2}" y2="${y1 + 2}" stroke="#fff" stroke-width="1.5"/>
        <line x1="${b.x + b.halfW + pad + 2}" y1="${y1 - 2}" x2="${b.x + b.halfW + pad - 2}" y2="${y1 + 2}" stroke="#fff" stroke-width="1.5"/>
      </g>
      <g data-action="grow" data-action-id="${selectedId}" style="cursor:pointer">
        <circle cx="${b.x + b.halfW + pad}" cy="${y1 + h}" r="5" fill="#0f3460" stroke="#eee" stroke-width="0.5"/>
        <text x="${b.x + b.halfW + pad}" y="${y1 + h}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="8" font-weight="bold">+</text>
      </g>
      <g data-action="shrink" data-action-id="${selectedId}" style="cursor:pointer">
        <circle cx="${x1}" cy="${y1 + h}" r="5" fill="#0f3460" stroke="#eee" stroke-width="0.5"/>
        <text x="${x1}" y="${y1 + h}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="9" font-weight="bold">\u2212</text>
      </g>
    </g>`;
  }

  // ─── DRAG SYSTEM ────────────────────────────────────

  function initDrag(svg, onUpdate) {
    onUpdateCallback = onUpdate;

    function getCoords(e) {
      const src = e.touches ? e.touches[0] : e;
      if (!src) return null;
      const pt = svg.createSVGPoint();
      pt.x = src.clientX;
      pt.y = src.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return null;
      return pt.matrixTransform(ctm.inverse());
    }

    function findItemAt(svgPt) {
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const b = getItemBounds(item);
        if (Math.abs(svgPt.x - b.x) < b.halfW + 4 && Math.abs(svgPt.y - b.y) < b.halfH + 4) {
          return item;
        }
      }
      return null;
    }

    function findAction(target) {
      let el = target;
      for (let depth = 0; depth < 5 && el && el !== svg; depth++) {
        if (el.getAttribute && el.getAttribute('data-action')) {
          return {
            action: el.getAttribute('data-action'),
            id: parseInt(el.getAttribute('data-action-id')),
          };
        }
        el = el.parentElement || el.parentNode;
      }
      return null;
    }

    function onStart(e) {
      // Check actions (delete, resize)
      const act = findAction(e.target);
      if (act) {
        e.preventDefault();
        e.stopPropagation();
        if (act.action === 'delete') {
          deleteItem(act.id);
        } else if (act.action === 'grow') {
          resizeItem(act.id, 0.2);
        } else if (act.action === 'shrink') {
          resizeItem(act.id, -0.2);
        }
        onUpdate();
        return;
      }

      const svgPt = getCoords(e);
      if (!svgPt) return;
      const item = findItemAt(svgPt);

      if (item) {
        selectedId = item.id;
        dragState = {
          itemId: item.id,
          offsetX: svgPt.x - item.x,
          offsetY: svgPt.y - item.y,
        };
        e.preventDefault();
        e.stopPropagation();
        onUpdate();
      } else {
        // Only deselect if clicking on empty area of the SVG
        if (selectedId !== null) {
          selectedId = null;
          onUpdate();
        }
      }
    }

    function onMove(e) {
      if (!dragState) return;
      e.preventDefault();
      const svgPt = getCoords(e);
      if (!svgPt) return;
      const item = items.find(i => i.id === dragState.itemId);
      if (item) {
        item.x = Math.max(5, Math.min(195, svgPt.x - dragState.offsetX));
        item.y = Math.max(5, Math.min(295, svgPt.y - dragState.offsetY));
        onUpdate();
      }
    }

    function onEnd() {
      dragState = null;
    }

    svg.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    svg.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  return {
    addDecoration, addText, updateText,
    deleteItem, resizeItem,
    select, deselect, getSelected, getSelectedItem,
    getItems, setItems,
    toSVGContent, initDrag,
  };
})();

window.Overlay = Overlay;
