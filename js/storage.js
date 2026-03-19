/**
 * storage.js — localStorage for saving/loading favorite chibis.
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

  function save(selection) {
    const saves = getSaves();
    const entry = {
      id: Date.now(),
      selection: { ...selection },
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

  function saveCurrent(selection) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(selection));
  }

  function loadCurrent() {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_KEY));
    } catch {
      return null;
    }
  }

  return { getSaves, save, deleteSave, saveCurrent, loadCurrent };
})();

window.Storage = Storage;
