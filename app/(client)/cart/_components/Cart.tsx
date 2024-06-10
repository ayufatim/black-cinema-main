'use client'

import CountdownTimer from "./CountdownTimer";

function Cart({ payment, movie, paymentPromo }: { payment: any, movie: any, paymentPromo: any }) {
    const now = new Date();

    return (
        <div>
            <section className="bg-white py-[60px] lg:py-11 antialiased dark:bg-gray-900 lg:pb-16 min-h-screen min-w-screen">
                <div className="mx-auto max-w-screen-xl pt-[70px] px-4 2xl:px-0">
                    <h2 className="flex text-xl font-semibold text-gray-900 w-full 2xl:justify-normal justify-end self-right dark:text-white sm:text-2xl">Shopping Cart</h2>

                    {payment.length > 0 ?
                        payment
                            .filter((pay: any) => new Date(pay.expiredPayment) >= now && pay.status === "pending")
                            .map((pay: any, index: number) => {
                                const matchedMovie = movie.find((mov: any) => mov.id === pay.movieId);
                                const matchedPromo = paymentPromo.find((promo: any) => promo.promoCode === pay.promoCode);
                                
                                return (
                                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8" key={index}>
                                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                            <div className="space-y-6">
                                                <div className="rounded-lg border bg-white p-4 shadow-sm border-gray-700 dark:bg-gray-800 md:p-6">
                                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                        <a href="#" className="flex items-center justify-center shrink-0 md:order-1">
                                                            <img className="w-[200px] block rounded-lg" src={matchedMovie?.backdrop_path} alt={matchedMovie?.title} />
                                                        </a>

                                                        <div className="w-full min-w-0 flex gap-1 md:order-2 md:max-w-md items-center flex-col">
                                                            <a href="#" className="text-lg font-semibold text-gray-900 hover:underline dark:text-white duration-300">{matchedMovie?.title}</a>
                                                            <span className="text-md">Durasi : {matchedMovie?.movieDuration} menit</span>
                                                            <span className="text-md">Ruang : nomor {pay.room}</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-4 md:order-3">
                                                            <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                            <div className="space-y-4 rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 sm:p-6">
                                                <p className="text-xl font-semibold text-white text-center">Rincian Pesanan</p>

                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <dl className="flex items-center justify-between gap-4">
                                                            <dt className="text-base font-normal text-gray-400">Paket {pay.packageName}</dt>
                                                            <dd className="text-base font-medium text-white">Rp {pay.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</dd>
                                                        </dl>

                                                        <dl className="flex items-center justify-between gap-4">
                                                            <dt className="text-base font-normal text-gray-400">Promo</dt>
                                                            <dd className="text-base font-medium text-green-600">Rp {matchedPromo?.priceDisc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") ?? 0}</dd>
                                                        </dl>

                                                        <dl className="flex items-center justify-between gap-4">
                                                            <dt className="text-base font-normal text-gray-400">Fee Admin</dt>
                                                            <dd className="text-base font-medium text-white">{pay.feeAdmin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</dd>
                                                        </dl>
                                                    </div>

                                                    <dl className="flex items-center justify-between gap-4 border-t pt-2 border-gray-700">
                                                        <dt className="text-base font-bold text-white">Total</dt>
                                                        <dd className="text-base font-bold text-white">Rp {pay.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</dd>
                                                    </dl>
                                                </div>

                                                <a
                                                    href={`/cart/${pay.id}`}
                                                    className="flex w-full items-center justify-center rounded-lg border-white border-2 px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-gray-800 duration-300 focus:outline-none focus:ring-4 bg-primary-600 bg-primary-700 focus:ring-primary-800"
                                                >
                                                    Lanjut Pembayaran
                                                </a>

                                                <span className="flex w-full justify-center">
                                                    Countdown bayar : <span className="font-bold pl-2"><CountdownTimer targetDate={pay.expiredPayment.toString()} /></span>
                                                </span>

                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="text-sm font-normal text-gray-400"> or </span>
                                                    <a href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                                        Continue Shopping
                                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        :
                        <div className="flex w-full h-full justify-center items-center">
                            <span className="font-semibold text-lg text-white">
                                Tidak ada pembayaran
                            </span>
                        </div>
                    }
                </div>
            </section >
        </div >
    )
}

export default Cart