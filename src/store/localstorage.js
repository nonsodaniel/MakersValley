export function saveToLocalStorage(key, data) {
  try {
    let stringData = typeof data === "object" ? JSON.stringify(data) : data;
    localStorage.setItem(key, stringData);
  } catch (e) {
    console.warn(e);
  }
}
