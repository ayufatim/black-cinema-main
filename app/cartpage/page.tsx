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
    <div className="font-[sans-serif] bg-black">
  <div className="max-w-7xl mx-auto p-6">
    <h2 className="text-2xl font-extrabold text-white-800 text-center">
      FILM
    </h2>

    <div className="grid lg:grid-cols-4 gap-4 relative mt-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
          <div className="flex items-center max-sm:flex-col gap-4">
            <div className="w-52 shrink-0">
              <img
                src="https://readymadeui.com/images/laptop2.webp"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
              <h3 className="text-xl font-bold text-gray-800">
                HP ProBook 455 (15.6) 39.6 cm G9 Business Laptop
              </h3>

              <ul className="mt-4 text-sm text-gray-800 space-y-2">
                <li>AMD Ryzen™ 5 processor</li>
                <li>FreeDOS</li>
                <li>16 GB DDR4 RAM</li>
                <li>512 GB PCIe® NVMe™ SSD Hard Drive</li>
                <li>
                  <a href="javascript:void(0);" className="text-blue-600">
                    (See more Specifications)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
          <div className="flex items-center max-sm:flex-col gap-4">
            <div className="w-52 shrink-0">
              <img
                src="https://readymadeui.com/images/laptop4.webp"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
              <h3 className="text-xl font-bold text-gray-800">
                ThinkPad E16 40.64cms - 13th Gen Intel i5
              </h3>

              <ul className="mt-4 text-sm text-gray-800 space-y-2">
                <li>AMD Ryzen™ 5 processor</li>
                <li>FreeDOS</li>
                <li>16 GB DDR4 RAM</li>
                <li>512 GB PCIe® NVMe™ SSD Hard Drive</li>
                <li>
                  <a href="javascript:void(0);" className="text-blue-600">
                    (See more Specifications)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Elemen tambahan yang akan menambah baris baru --> */}
      <div className="lg:col-span-2 space-y-4">
        <div className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
          <div className="flex items-center max-sm:flex-col gap-4">
            <div className="w-52 shrink-0">
              <img
                src="https://readymadeui.com/images/laptop3.webp"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
              <h3 className="text-xl font-bold text-gray-800">
                Dell Inspiron 15 5000
              </h3>

              <ul className="mt-4 text-sm text-gray-800 space-y-2">
                <li>Intel Core i7</li>
                <li>Windows 10</li>
                <li>8 GB DDR4 RAM</li>
                <li>1 TB HDD</li>
                <li>
                  <a href="javascript:void(0);" className="text-blue-600">
                    (See more Specifications)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
          <div className="flex items-center max-sm:flex-col gap-4">
            <div className="w-52 shrink-0">
              <img
                src="https://readymadeui.com/images/laptop5.webp"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
              <h3 className="text-xl font-bold text-gray-800">
                MacBook Pro 14-inch
              </h3>

              <ul className="mt-4 text-sm text-gray-800 space-y-2">
                <li>Apple M1 Pro chip</li>
                <li>macOS</li>
                <li>16 GB Unified Memory</li>
                <li>1 TB SSD</li>
                <li>
                  <a href="javascript:void(0);" className="text-blue-600">
                    (See more Specifications)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Tambahkan elemen tambahan di sini jika diperlukan --> */}
    </div>
  </div>
</div>

  );
}
