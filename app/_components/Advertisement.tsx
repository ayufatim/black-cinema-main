import Link from "next/link"

function Advertisement() {
    return (
        <div className="w-full h-full p-10 lg:p-20">
            <div className="flex flex-row w-full gap-5">
                <Link href="#"
                    className="group w-2/5 relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80"
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqMCU8UWpvE7XJ4QmNv0PqNzdhw18Rs77vw&s"
                        loading="lazy"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" 
                    />

                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                    </div>

                    <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Iklan 1</span>
                </Link>
                <Link href="#"
                    className="group relative flex w-3/5 h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                    <img
                        src="https://apiexcellent.com/images/blog/cinema-advertising-2-20230804152852.webp"
                        loading="lazy"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />

                    <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                    </div>

                    <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">Iklan 2</span>
                </Link>
            </div>
        </div>

    )
}

export default Advertisement