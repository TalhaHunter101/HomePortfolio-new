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

export function formatPrice(price) {
  if (!price) return "N/A";
  if (price >= 1e9) {
    return (price / 1e9).toFixed(1) + "B";
  } else if (price >= 1e6) {
    return (price / 1e6).toFixed(1) + "M";
  } else if (price >= 1e3) {
    return (price / 1e3).toFixed(1) + "K";
  } else {
    return price.toString();
  }
}
