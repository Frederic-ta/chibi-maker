/**
 * renderer.js — SVG composition engine.
 * Assembles chibi parts in correct z-order with anchor snapping.
 */

const Renderer = (() => {
  const svgEl = () => document.getElementById('chibi-svg');

  // Z-order for rendering layers (bottom to top)
  const LAYER_ORDER = [
    'hairBack',
    'body',
    'head',
    'clothes',
    'eyes',
    'mouth',
    'hairFront',
    'glasses',
    'hat',
  ];

  /**
   * Render the full chibi from a selection state object.
   * @param {Object} selection - { body: 'body-small', head: 'head-round', ... }
   * @param {string} overlayContent - Optional SVG content for decorations/text overlay
   */
  function render(selection, overlayContent) {
    const svg = svgEl();
    if (!svg) return;

    // Get the head part to access anchors
    const headPart = PARTS.head.find(h => h.id === selection.head);
    const anchors = headPart ? headPart.anchors : PARTS.head[0].anchors;

    let content = '';

    for (const layer of LAYER_ORDER) {
      const partId = selection[layer];
      if (!partId) continue;

      const category = PARTS[layer];
      if (!category) continue;

      const part = category.find(p => p.id === partId);
      if (!part) continue;

      // Call svg generator — pass anchors for parts that need positioning
      const needsAnchors = ['eyes', 'mouth', 'hat', 'glasses'].includes(layer);
      const svgMarkup = needsAnchors ? part.svg(anchors) : part.svg();

      content += svgMarkup;
    }

    // Append overlay (decorations, text, handles) on top of chibi layers
    if (overlayContent) {
      content += overlayContent;
    }

    svg.innerHTML = content;
  }

  /**
   * Generate chibi-only SVG content string (no wrapping <svg> tag).
   */
  function chibiContent(selection) {
    const headPart = PARTS.head.find(h => h.id === selection.head);
    const anchors = headPart ? headPart.anchors : PARTS.head[0].anchors;

    let content = '';
    for (const layer of LAYER_ORDER) {
      const partId = selection[layer];
      if (!partId) continue;
      const category = PARTS[layer];
      if (!category) continue;
      const part = category.find(p => p.id === partId);
      if (!part) continue;
      const needsAnchors = ['eyes', 'mouth', 'hat', 'glasses'].includes(layer);
      content += needsAnchors ? part.svg(anchors) : part.svg();
    }
    return content;
  }

  /**
   * Generate standalone SVG string for export/save.
   * @param {Object} selection
   * @param {string} overlayContent - Optional overlay SVG content (decos/text, no handles)
   */
  function toSVGString(selection, overlayContent) {
    let content = chibiContent(selection);
    if (overlayContent) {
      content += overlayContent;
    }
    return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  }

  /**
   * Generate a thumbnail SVG for option previews.
   */
  function renderThumbnail(category, partId) {
    const part = PARTS[category].find(p => p.id === partId);
    if (!part) return '';

    // Use default anchors for preview
    const defaultAnchors = { eyeY: 85, mouthY: 115, hatY: 28, glassesY: 82, eyeSpread: 22 };
    const needsAnchors = ['eyes', 'mouth', 'hat', 'glasses'].includes(category);

    let svgContent;
    try {
      svgContent = needsAnchors ? part.svg(defaultAnchors) : part.svg();
    } catch {
      svgContent = '';
    }

    // Determine viewBox based on category for better framing
    let viewBox = '0 0 200 300';
    switch (category) {
      case 'body':    viewBox = '30 150 140 155'; break;
      case 'head':    viewBox = '25 20 150 145'; break;
      case 'eyes':    viewBox = '55 65 90 45'; break;
      case 'mouth':   viewBox = '70 105 60 35'; break;
      case 'hairBack': viewBox = '15 20 170 240'; break;
      case 'hairFront': viewBox = '30 15 140 65'; break;
      case 'hat':     viewBox = '30 5 140 60'; break;
      case 'glasses': viewBox = '45 65 110 40'; break;
      case 'clothes': viewBox = '45 145 110 120'; break;
    }

    return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
  }

  /**
   * Generate a decoration thumbnail for the carousel.
   */
  function renderDecoThumbnail(decoId) {
    const deco = DECORATIONS.find(d => d.id === decoId);
    if (!deco) return '';
    return `<svg viewBox="-20 -20 40 40" xmlns="http://www.w3.org/2000/svg">${deco.svg}</svg>`;
  }

  return { render, toSVGString, renderThumbnail, renderDecoThumbnail };
})();

window.Renderer = Renderer;
