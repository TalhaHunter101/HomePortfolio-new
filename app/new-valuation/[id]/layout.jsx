


export default function Layout ({children}) {
    return (
        <div>
            <div className=" z-50 bg-white shadow-md">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between py-4">
                        <div>
                           <h1 className="text-2xl font-bold">Home Evaluation</h1>
                        </div>
                        <div>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Home PortFolio</button>
                        </div>
                    </div>
                </div>

            </div>
           
                {children}
          
        </div>
    )
}