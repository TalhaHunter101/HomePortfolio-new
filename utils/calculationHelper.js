export function calculateStampDuty(amount) {
    if (amount < 250000) {
        return amount * 0.05;                       // 5% for amounts between 0 and 250,000
    } else if (amount < 925000) {
        return ((amount - 250000) * 0.10) + 12500;  // 10% for amounts between 250,000 and 925,000
    } else if (amount < 1500000) {
        return ((amount - 925000) * 0.15) + 80000;  // 15% for amounts between 925,000 and 1,500,000
    } else {
        return ((amount - 1500000) * 0.17) + 166250; // 17% for amounts after 1,500,000
    }
}