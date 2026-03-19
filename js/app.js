/**
 * app.js — Main application logic, UI routing, event handling.
 */

const App = (() => {
  // Current selection state
  let selection = {
    body: 'body-small',
    head: 'head-round',
    eyes: 'eyes-cute',
    mouth: 'mouth-smile',
    hairBack: 'hairback-long',
    hairFront: 'hairfront-bangs',
    clothes: 'clothes-tee',
    hat: 'hat-none',
    glasses: 'glasses-none',
  };

  let activeCategory = 'body';

  // ─── INIT ───────────────────────────────────────────
  function init() {
    // Try to restore last session
    const saved = Storage.loadCurrent();
    if (saved) {
      // Validate saved selection still has valid IDs
      for (const key of Object.keys(selection)) {
        if (saved[key] && PARTS[key] && PARTS[key].find(p => p.id === saved[key])) {
          selection[key] = saved[key];
        }
      }
    }

    buildCategoryBar();
    selectCategory('body');
    render();

    // Button handlers
    document.getElementById('btn-random').addEventListener('click', randomize);
    document.getElementById('btn-export').addEventListener('click', () => Exporter.exportPNG(selection));
    document.getElementById('btn-save').addEventListener('click', saveCurrentChibi);
    document.getElementById('btn-load').addEventListener('click', showLoadModal);
    document.getElementById('modal-close').addEventListener('click', hideModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) hideModal();
    });
  }

  // ─── CATEGORY BAR ──────────────────────────────────
  function buildCategoryBar() {
    const bar = document.getElementById('category-bar');
    bar.innerHTML = '';

    for (const cat of PARTS.categories) {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.dataset.cat = cat.id;
      btn.innerHTML = `<span class="cat-icon">${cat.icon}</span><span>${cat.label}</span>`;
      btn.addEventListener('click', () => selectCategory(cat.id));
      bar.appendChild(btn);
    }
  }

  function selectCategory(catId) {
    activeCategory = catId;

    // Update active state
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === catId);
    });

    buildOptionsCarousel(catId);
  }

  // ─── OPTIONS CAROUSEL ──────────────────────────────
  function buildOptionsCarousel(catId) {
    const carousel = document.getElementById('options-carousel');
    carousel.innerHTML = '';

    const parts = PARTS[catId];
    if (!parts) return;

    for (const part of parts) {
      const item = document.createElement('div');
      item.className = 'option-item';
      if (selection[catId] === part.id) item.classList.add('active');

      if (part.isNone) {
        item.classList.add('none-option');
        item.textContent = 'Aucun';
      } else {
        item.innerHTML = Renderer.renderThumbnail(catId, part.id);
      }

      item.addEventListener('click', () => {
        selection[catId] = part.id;
        Storage.saveCurrent(selection);
        render();
        // Update active state in carousel
        carousel.querySelectorAll('.option-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
      });

      carousel.appendChild(item);
    }
  }

  // ─── RENDER ────────────────────────────────────────
  function render() {
    Renderer.render(selection);
  }

  // ─── RANDOMIZE ─────────────────────────────────────
  function randomize() {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)].id;

    selection.body = pick(PARTS.body);
    selection.head = pick(PARTS.head);
    selection.eyes = pick(PARTS.eyes);
    selection.mouth = pick(PARTS.mouth);
    selection.hairBack = pick(PARTS.hairBack);
    selection.hairFront = pick(PARTS.hairFront);
    selection.clothes = pick(PARTS.clothes);

    // Hats and glasses: 50% chance of "none"
    selection.hat = Math.random() > 0.5 ? pick(PARTS.hat) : 'hat-none';
    selection.glasses = Math.random() > 0.7 ? pick(PARTS.glasses) : 'glasses-none';

    // Some combos: match hair — if hairfront is none, make sure hairback is visible
    if (selection.hairFront === 'hairfront-none' && Math.random() > 0.3) {
      const backOptions = PARTS.hairBack.filter(h => h.id !== 'hairback-short');
      selection.hairBack = backOptions[Math.floor(Math.random() * backOptions.length)].id;
    }

    Storage.saveCurrent(selection);
    render();
    buildOptionsCarousel(activeCategory);

    // Fun animation
    const preview = document.getElementById('chibi-preview');
    preview.style.transform = 'scale(0.95)';
    setTimeout(() => { preview.style.transform = ''; }, 150);
  }

  // ─── SAVE / LOAD ──────────────────────────────────
  function saveCurrentChibi() {
    Storage.save(selection);
    // Visual feedback
    const btn = document.getElementById('btn-save');
    const originalText = btn.querySelector('span').textContent;
    btn.querySelector('span').textContent = 'Sauvegardé !';
    setTimeout(() => { btn.querySelector('span').textContent = originalText; }, 1000);
  }

  function showLoadModal() {
    const saves = Storage.getSaves();
    const body = document.getElementById('modal-body');

    if (saves.length === 0) {
      body.innerHTML = '<div class="empty-state">Aucun chibi sauvegardé</div>';
    } else {
      body.innerHTML = '';
      for (const entry of saves) {
        const div = document.createElement('div');
        div.className = 'saved-chibi';

        // Render preview SVG
        div.innerHTML = Renderer.toSVGString(entry.selection);

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = '×';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Storage.deleteSave(entry.id);
          showLoadModal(); // Refresh
        });
        div.appendChild(delBtn);

        // Load on click
        div.addEventListener('click', () => {
          selection = { ...entry.selection };
          Storage.saveCurrent(selection);
          render();
          buildOptionsCarousel(activeCategory);
          hideModal();
        });

        body.appendChild(div);
      }
    }

    document.getElementById('modal-overlay').classList.remove('hidden');
  }

  function hideModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  // ─── START ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', init);

  return { selection, randomize };
})();
