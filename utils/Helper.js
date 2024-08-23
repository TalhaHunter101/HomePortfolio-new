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

export function formatDate(dateString) {
  if (!dateString) return;
  const date = new Date(dateString);

  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}


export  const calculateMedian = (arr) => {
  const mid = Math.floor(arr.length / 2);
  if (arr.length % 2 === 0) {
    return (arr[mid - 1] + arr[mid]) / 2;
  } else {
    return arr[mid];
  }
};