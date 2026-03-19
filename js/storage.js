/**
 * storage.js — localStorage for saving/loading favorite chibis.
 * Now includes overlay items (decorations + text) alongside part selection.
 */

const Storage = (() => {
  const KEY = 'chibi-maker-saves';
  const CURRENT_KEY = 'chibi-maker-current';

  function getSaves() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(selection, overlayItems) {
    const saves = getSaves();
    const entry = {
      id: Date.now(),
      selection: { ...selection },
      overlayItems: overlayItems ? overlayItems.map(i => ({ ...i })) : [],
      date: new Date().toISOString(),
    };
    saves.unshift(entry);
    // Max 20 saves
    if (saves.length > 20) saves.pop();
    localStorage.setItem(KEY, JSON.stringify(saves));
    return entry;
  }

  function deleteSave(id) {
    const saves = getSaves().filter(s => s.id !== id);
    localStorage.setItem(KEY, JSON.stringify(saves));
  }

  function saveCurrent(selection, overlayItems) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify({
      selection,
      overlayItems: overlayItems || [],
    }));
  }

  function loadCurrent() {
    try {
      const data = JSON.parse(localStorage.getItem(CURRENT_KEY));
      if (!data) return null;
      // Support old format (just selection object)
      if (data.selection) return data;
      // Old format: data IS the selection
      return { selection: data, overlayItems: [] };
    } catch {
      return null;
    }
  }

  return { getSaves, save, deleteSave, saveCurrent, loadCurrent };
})();

window.Storage = Storage;
