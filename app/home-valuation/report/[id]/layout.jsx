import HomePortfolioButton from "@/components/HomeValuation/HomeButton";



export default function Layout ({children}) {
    return (
        <div>
        <div className="z-50 bg-white shadow-md">
            <div className="container mx-auto">
                <div className="flex items-center justify-between py-4">
                    <div>
                        <h1 className="text-2xl font-bold">Home Evaluation</h1>
                    </div>
                    <div>
                        {/* Use the client-side button here */}
                        <HomePortfolioButton />
                    </div>
                </div>
            </div>
        </div>
        {children}
    </div>
    )
}