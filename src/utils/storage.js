// Utility functions for local storage operations
export const StorageKeys = {
  TASKS: 'productivity_tasks',
  GOALS: 'productivity_goals',
  POMODORO: 'productivity_pomodoro',
  SETTINGS: 'productivity_settings'
};

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to storage: ${error}`);
  }
}

export function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error loading from storage: ${error}`);
    return defaultValue;
  }
}
