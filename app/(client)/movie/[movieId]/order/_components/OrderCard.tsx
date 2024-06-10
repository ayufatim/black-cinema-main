function OrderCard({ movie, payPlan, index }: { movie: any, payPlan: any, index: any }) {
    return (
        <div>
            <div
                className="relative flex flex-col mb-5 md:mb-0 bg-clip-border rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full max-w-[20rem] p-8"
                key={index}
            >
                <div
                    className="relative pb-8 m-0 mb-8 overflow-hidden text-center text-gray-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/10">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-white uppercase">
                        {payPlan.packageName}
                    </p>
                    <h1 className="flex justify-center gap-1 mt-6 font-sans antialiased font-normal tracking-normal text-white text-7xl">
                        <span className="mt-2 text-4xl">Rp {payPlan.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </h1>
                </div>
                <div className="p-0">
                    <ul className="flex flex-col gap-4">
                        <li className="flex items-center gap-4">
                            <span className="p-1 border rounded-full border-white/20 bg-white/20"><svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                            </svg></span>
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                Kapasitas : {payPlan.capacity} orang
                            </p>
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="p-1 border rounded-full border-white/20 bg-white/20"><svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                            </svg></span>
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                                Ukuran Layar : {payPlan.screenResolution} inch
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="p-0 mt-12">
                    <a href={`/movie/${movie.id}/order/${payPlan.id}`}>
                        <button
                            className="align-middle text-black select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                            type="button">
                            Order Now
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default OrderCard