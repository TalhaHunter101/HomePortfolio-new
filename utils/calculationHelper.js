

export function calculateStampDuty(amount) {
    if (amount < 40000) {
        return amount * 0;  // 0% for amounts less than 40,000
    } else if (amount < 250000) {
        return amount * 0.03;  // 3% for amounts between 40,000 and 249,999
    } else if (amount < 925000) {
        return ((amount - 250000) * 0.08) + 7500;  // 8% for amounts between 250,000 and 924,999
    } else if (amount < 1500000) {
        return ((amount - 925000) * 0.13) + 61500;  // 13% for amounts between 925,000 and 1,499,999
    } else {
        return ((amount - 1500000) * 0.15) + 136250;  // 15% for amounts 1,500,000 and above
    }
}