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
  const mid = Math?.floor(arr?.length / 2);
  if (arr?.length % 2 === 0) {
    return (arr?.[mid - 1] + arr?.[mid]) / 2;
  } else {
    return arr?.[mid];
  }
};

export const smallString = (str, num) => {
  if (str?.length > num) {
    return str?.slice(0, num) + "...";
  } else {
    return str;
  }
};

export const formatDateNew = (dateString) =>{
  if (!dateString) return;
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
}


export function formatCurrency(amount) {
 
  if (amount === null || amount === undefined || amount === '') {
    return 'Invalid number';
  }

  
  const numberAmount = Number(amount);

 
  if (isNaN(numberAmount)) {
    return 'Invalid number';
  }

  
  return numberAmount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatNumberWithCommas(number) {
  if (!number) return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// export function RemoveDecimal(number) {
//   return number.toFixed(0);
// }


export const convertToSquareFeet = (squareMeters) => {
  const conversionFactor = 10.7639;
  const metersValue = parseFloat(squareMeters); // Convert string to a number
  if (isNaN(metersValue)) {
    return null; // Handle invalid input
  }
  return (metersValue * conversionFactor).toFixed(0); // Round to the nearest whole number
};