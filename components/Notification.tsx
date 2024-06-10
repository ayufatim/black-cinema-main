"use client";

import { SafePayment } from "@/utils/types/safeData";
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { format } from "date-fns";

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const formattedDate = format(date, "HH:mm:ss dd MMM yyyy");

  return formattedDate;
};

function NotificationNav({ pay }: { pay: SafePayment[] }) {
  const [openNotif, setOpenNotif] = useState(false);

  const handleOpenNotif = () => {
    setOpenNotif((prevState) => !prevState);
  };

  return (
    <div className="">
      <FaBell
        className="w-[30px] h-[30px] duration-300 hover:text-[#d4b60f]"
        onClick={() => handleOpenNotif()}
      />
      {openNotif && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
            onClick={handleOpenNotif}
          ></div>
          <div className="absolute cursor-default top-[50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-auto p-5 rounded-[20px] bg-gray-900 z-20">
            <h1 className="text-lg text-center">Notification</h1>
            <IoMdClose
              className="absolute top-5 right-5 w-[30px] h-[30px] cursor-pointer"
              onClick={() => handleOpenNotif()}
            />
            <div className="flex flex-col gap-10 mt-10 items-center">
              {pay.map((payment: any, index: any) => (
                <div key={index} className="flex flex-col items-center">
                  <div>
                    <div className="relative m-16">
                      <span className="absolute -z-10  w-full h-full inset-1 bg-violet-500 rounded-xl"></span>
                      <button className="absolute py-1 z-10 px-3 -left-8 -top-2 -rotate-[10deg] black_border bg-violet-500 text-white font-bold">
                        NOTIFICATION!
                      </button>  
                      <div className="p-8 border border-black purple_border bg-white rounded-xl z-20 flex flex-col" >                  
                        <span className="font-mono text-purple-700 font-bold">
                          Pembayaran Berhasil! 
                          </span>
                          <span className="font-mono text-purple-700 font-bold">
                          Detail Pembayaran anda telah
                          dikirimkan ke email {payment.userEmail}
                          </span>
                          <span className="font-mono text-purple-700 font-bold">
                          Cek email anda untuk melihat slip pembayaran.
                          </span>
      
                        <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                          Cek Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationNav;
