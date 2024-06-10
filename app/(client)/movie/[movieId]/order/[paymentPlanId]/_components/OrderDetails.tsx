'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { UserRound } from 'lucide-react';
import { Mail, Calendar } from 'lucide-react';
import moment from 'moment';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
function OrderDetails({ movie, paymentPlan, currentUser, paymentCard, paymentPromo, allPayment }: { movie: any, paymentPlan: any, currentUser: any, paymentCard: any, paymentPromo: any, allPayment: any }) {
    const router = useRouter();

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 35);
    const formattedExpirationTime = `${expirationTime.getFullYear()}-${(expirationTime.getMonth() + 1).toString().padStart(2, '0')}-${expirationTime.getDate().toString().padStart(2, '0')} ${expirationTime.getHours().toString().padStart(2, '0')}:${expirationTime.getMinutes().toString().padStart(2, '0')}:${expirationTime.getSeconds().toString().padStart(2, '0')}`;

    const [isLoading, setIsLoading] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [feeAdmin, setFeeAdmin] = useState(5000);
    const [totalPrice, setTotalPrice] = useState(0);
    const [methodPayment, setMethodPayment] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [expiredPayment, setExpiredPayment] = useState('');
    const [room, setRoom] = useState(1);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setCheckedIndex(index);
        setMethodPayment(paymentCard[index].nameCard)
    };

    const [promoPrice, setPromoPrice] = useState(0)

    useEffect(() => {
        const paymentPromoCodes = paymentPromo.map((pay: { promoCode: any; }) => pay.promoCode);
        if (paymentPromoCodes.includes(promoCode)) {
            const promoIndex = paymentPromoCodes.indexOf(promoCode);
            setPromoPrice(paymentPromo[promoIndex].priceDisc);
        }
    }, [paymentPromo, promoCode]);

    const handlePromoChange = (e: any) => {
        setPromoCode(e.target.value)
    }

    useEffect(() => {
        setTotalPrice(paymentPlan.price + feeAdmin - promoPrice);
        setExpiredPayment(formattedExpirationTime)
    }, [paymentPlan.price, feeAdmin, promoPrice, formattedExpirationTime]);

    const { handleSubmit, reset, register, formState: { errors }, setValue } = useForm<FieldValues>({
        defaultValues: {
            movieId: '',
            userName: '',
            userEmail: '',
            startTime: '',
            endTime: '',
            feeAdmin: 0,
            price: 0,
            totalPrice: 0,
            packageName: '',
            methodPayment: '',
            promoCode: '',
            status: '',
            expiredPayment: '',
            successPayment: '',
            room: 1,
        }
    });

    useEffect(() => {
        const dateStart = new Date(startTime);

        const findLargestRoom = () => {
            let largestRoom = 0;
            allPayment.forEach((payment: { startTime: string | number | Date; endTime: string | number | Date; status: string; room: number; }) => {
                const paymentStart = new Date(payment.startTime);
                const paymentEnd = new Date(payment.endTime);
                if (paymentStart <= dateStart && paymentEnd > dateStart && payment.status !== 'canceled' && payment.room > largestRoom) {
                    largestRoom = payment.room;
                }
            });
            return largestRoom;
        };

        const findLargestRoom2 = () => {
            let largestRoom2 = findLargestRoom()
            allPayment.forEach((payment: { room: any; startTime: string | number | Date; endTime: string | number | Date; }) => {
                const largestRoom3 = payment.room
                const paymentStart = new Date(payment.startTime);
                const paymentEnd = new Date(payment.endTime);
                if (paymentStart <= dateStart && paymentEnd > dateStart && largestRoom3 >= largestRoom2) {
                    largestRoom2 = largestRoom3;
                }
            });
            return largestRoom2;
        };

        setRoom(findLargestRoom2() + 1);
    }, [startTime, allPayment]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const formattedStartTime = moment(startTime).toISOString();
            const formattedExpiredPayment = moment(expiredPayment).toISOString();
            const movieDuration = parseInt(movie.movieDuration) + 30;
            const endTime = moment(startTime).add(movieDuration, 'minutes').toISOString();

            const newData = {
                ...data,
                movieId: movie.id,
                userName: name,
                userEmail: email,
                feeAdmin: 5000,
                price: paymentPlan.price,
                totalPrice: totalPrice,
                packageName: paymentPlan.packageName,
                methodPayment: methodPayment,
                promoCode: promoCode,
                room: room,
                status: 'pending',
                successPayment: null,
                expiredPayment: formattedExpiredPayment,
                startTime: formattedStartTime,
                endTime: endTime
            };

            if (methodPayment == '') {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Isi data dahulu',
                });
            } else if (room > 6) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Ruangan penuh, coba pada jam lainnya!',
                });
            } else {
                await axios.post(`/api/payment/`, newData);
                await Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Redirected to Cart',
                });
                router.push('/cart')
                router.refresh();
                reset();
            }
        } catch (error) {
            await Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Isi semua data dahulu',
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMethodPayment = (e: any) => {
        setMethodPayment(e.target.value)
    }

    const inputRef = useRef(null);
    const now = new Date();

    const dateOnChange = (event: any) => {
        const selectedDateTime = event.target.value;

        if (new Date(selectedDateTime) < now) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Pilih waktu dengan benar',
            });
            setStartTime('');
            event.target.value = '';
            (inputRef.current ?? { blur: () => { } }).blur();
        } else {
            setStartTime(selectedDateTime);
        }
    };

    return (
        <div
            className="w-full bg-cover min-h-[100vh]"
            style={{
                backgroundImage: `url(${movie.backdrop_path})`
            }}
        >
            <div className="bg-white/20 dark:bg-black/50 pt-[90px] min-h-[100vh] flex justify-center items-center py-5">
                <div
                    className="flex flex-col backdrop-blur-lg border w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[60vw] rounded-lg w-fit p-5 justify-center items-center"
                >
                    <Label className="text-xl pb-5 font-bold">Checkout</Label>
                    <div className="block sm:flex sm:flex-row gap-5 ">
                        <div className="flex w-full sm:w-fit justify-center">
                            <img src={movie.poster_path} alt={movie.title} className="flex w-[250px] rounded-lg" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className='text-lg'>Detail :</Label>
                            <div className='flex flex-col'>
                                <div className='flex flex-col gap-1'>
                                    <span>Judul : {movie.title}</span>
                                    <span>Kapasitas : {paymentPlan.capacity} orang</span>
                                    <span>Ukuran Layar : {paymentPlan.screenResolution} inch</span>
                                    <span className='pb-5'>Durasi : {movie.movieDuration} menit</span>
                                </div>
                                <div className='bg-gray-200 dark:bg-gray-800 p-5 rounded-lg'>
                                    <table>
                                        <tbody>
                                            <tr className='mb-5'>
                                                <td className='pr-20'>Harga paket</td>
                                                <td>Rp {paymentPlan.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                            </tr>
                                            <tr className='mb-5'>
                                                <td>Fee admin</td>
                                                <td>Rp {feeAdmin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                            </tr>
                                            <tr className='mb-5'>
                                                <td>Promo</td>
                                                <td className='text-red-400'>Rp {promoPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                            </tr>
                                            <tr className='mb-5'>
                                                <td>Total</td>
                                                <td>Rp {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='flex mt-5'>
                                    <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
                                        <button
                                            className="!absolute right-1 top-1 z-10 select-none rounded bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                                            type="button"
                                            data-ripple-light="true"
                                        >
                                            Gunakan
                                        </button>
                                        <input
                                            type="text"
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            value={promoCode}
                                            onChange={handlePromoChange}
                                            required
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Kode Promo (Opsional)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 sm:mt-10 w-fit'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col'>
                                <div className='flex flex-col'>
                                    {paymentCard.map((pay: any, index: number) => (
                                        <div className='flex flex-col pb-2 items-center' key={index}>
                                            <div
                                                className={`flex flex-row w-full h-20 w-[70vw] lg:w-[40vw] justify-between rounded-tr-lg rounded-tl-lg ${index === checkedIndex ? 'bg-gray-200 dark:bg-gray-800' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-br-lg rounded-bl-lg cursor-pointer'}`}
                                                onClick={() => handleClick(index)}
                                            >
                                                <img
                                                    src={pay.imageCard}
                                                    alt={pay.nameCard}
                                                    className='w-[100px] pl-3 object-contain'
                                                />
                                                {index === checkedIndex ? (
                                                    <div className='flex items-center mr-3 text-black dark:text-white text-md font-semibold'>Rp {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
                                                ) : (
                                                    <input type="radio" className="flex mr-3" checked={index === checkedIndex} value={pay.nameCard} onChange={handleMethodPayment} required />
                                                )}
                                            </div>
                                            {index === checkedIndex ? (
                                                <div className='flex flex-row justify-between items-center w-full py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-br-lg rounded-bl-lg border-t-2 border-gray-400 dark:border-gray-600'>
                                                    <span className='text-black dark:text-white pl-4 font-medium'>Bayar dengan {pay.nameCard}</span>
                                                    <a href={`/tutorial/${pay.nameCard.toLowerCase()}`} className='text-blue-500 dark:text-blue-400 font-bold mr-3 border-2 border-blue-500 dark:border-blue-400 p-1 rounded-lg cursor-pointer animate-bounce mt-2'><span>Cara Kerja?</span></a>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className={`flex flex-col mt-5 bg-white dark:bg-gray-800 text-black dark:text-white rounded-[25px] p-5 gap-2`}>
                                    <div>
                                        <div className="absolute flex items-center ps-3.5 pt-3 pointer-events-none">
                                            <UserRound className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                            placeholder="Nama"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="absolute flex items-center ps-3.5 pt-3 pointer-events-none">
                                            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                            placeholder="Alamat Email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute flex items-center pl-3 pt-3 pointer-events-none">
                                            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <input type="datetime-local" value={startTime} ref={inputRef} onChange={dateOnChange} min={now.toISOString().slice(0, 16)} className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" />
                                    </div>
                                </div>

                                <Button
                                    type='submit'
                                    className='w-fit self-center mt-5'
                                    variant={'secondary'}
                                >
                                    Bayar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails