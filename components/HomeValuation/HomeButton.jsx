// HomePortfolioButton.js
"use client"; // Make this component client-side

export default function HomePortfolioButton() {
    return (
        <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
            Home Portfolio
        </button>
    );
}
