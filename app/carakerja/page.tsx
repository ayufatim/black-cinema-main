"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="mx-auto w-11/12 sm:w-3/4 md:w-2/3 my-20 ">
    <div className="flex flex-col items-center border-gray-300 border-2 h-auto ">
      <table
        className="m-0 pb-8 z-[999] bg-gray-100 mt-10 text-center w-full"
        align="center"
        role="presentation"
      >
        <tbody>
          <tr>
            <td>
              <img
                alt="codepen"
                src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg"
                className="block outline-none border-none mx-auto max-w-full m-5"
                width="300"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table
        className="max-w-full mx-auto w-[648px] relative"
        align="center"
        role="presentation"
      >
        <tbody>
          <tr className="w-full">
            <td>
              <Accordion type="single" collapsible className="text-white">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Dana</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5">
                      <li>Buka aplikasi Dana atau e-wallet lain Anda.</li>
                      <li>
                        Pindai kode QR yang ada pada monitor anda / masukkan
                        nomor sebagai rekening tujuan
                      </li>
                      <li>
                        Periksa detail transaksi Anda pada aplikasi, lalu tap
                        tombol Bayar.
                      </li>
                      <li>Masukkan PIN Anda.</li>
                      <li>Transaksi Anda sudah selesai.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="text-xs leading-6 m-0 text-center text-gray-500">
                Bayar pesanan ke Virtual Account diatas sebelum membuat pesanan
                kembali dengan Virtual Account agar nomor tetap sama
              </p>
              <div className="flex justify-end mb-4"> 
              <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white 
              dark:hover:bg-blue-500 dark:focus:ring-blue-800">Kembali</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}
