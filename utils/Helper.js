export function areAllArraysEmpty(data) {
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        return false; 
      } else if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        if (!areAllArraysEmpty(data[key])) {
          return false; 
        }
      }
    }
    return true; // All arrays are empty
  }