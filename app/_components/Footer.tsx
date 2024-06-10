import React from 'react'
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

function Footer() {
    return (
        <>
            <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-10">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="https://res.cloudinary.com/dutlw7bko/image/upload/v1716618897/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6_1_wc2vsh.png" className="h-8 rounded-lg" alt="Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Black Cinema</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className='flex flex-row justify-between w-full'>
                        <span className="block text-sm text-start text-gray-500 dark:text-gray-400 w-full">© 2024
                            <a href="#" className="hover:underline">
                                {" "}Black Cinema
                            </a>. All Rights Reserved.
                        </span>
                        <ul className='flex flex-row w-full items-center justify-end gap-5'>
                            <li><a href="#"><FaWhatsapp className='w-8 h-8 text-white cursor-pointer'/></a></li>
                            <li><a href="#"><FaInstagram  className='w-8 h-8 text-white cursor-pointer'/></a></li>
                            <li><a href="#"><FaTelegramPlane className='w-8 h-8 text-white cursor-pointer'/></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer