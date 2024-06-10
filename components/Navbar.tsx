"use client";

import { cn } from "@/lib/utils";
import { BellDot, Bookmark, CircleX, FolderDot, Mail, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import UserButton from "./auth/UserButton";
import { Label } from "./ui/label";

const items = [
  { label: "Favorit", link: "/favorites", icon: <Bookmark />, roles: ['user'] },
  { label: "Notifications", link: "#", icon: <BellDot />, roles: ['user'] },
  { label: "Keranjang", link: "/cart", icon: <ShoppingCart />, roles: ['user'] },
  { label: "Dashboard", link: "/dashboard", icon: <FolderDot />, roles: ['admin', 'manager'] },
];

export default function Navbar({ user, payment }: { user: any, payment: any }) {
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationClick = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      <DesktopNavbar user={user} payment={payment} onNotificationClick={handleNotificationClick} />
      <MobileNavbar user={user} payment={payment} onNotificationClick={handleNotificationClick} />
      {showNotification && <Notification payment={payment} onCloseNotification={handleCloseNotification} />}
    </>
  );
}

function MobileNavbar({ user, payment, onNotificationClick }: { user: any, payment: any, onNotificationClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = user?.role;
  const filteredItems = items.filter(item => item.roles.includes(userRole) || item.roles.includes('user'));

  return (
    <div className="absolute z-40 h-fit w-full" style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)' }}>
      <div className="block md:hidden">
        <nav className="container flex items-center justify-between px-8">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu className="w-8 h-8 shrink-0" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
              <Logo />
              <div className="flex flex-col gap-1 pt-4">
                {filteredItems.map((item) => (
                  <NavbarItem
                    key={item.label}
                    link={item.link}
                    label={item.label}
                    icon={item.icon}
                    clickCallback={() => {
                      setIsOpen(false);
                      if (item.label === "Notifications") {
                        onNotificationClick();
                      }
                    }}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopNavbar({ user, payment, onNotificationClick }: { user: any, payment: any, onNotificationClick: () => void }) {
  const userRole = user?.role;
  const filteredItems = items.filter(item => item.roles.includes(userRole) || item.roles.includes('user'));

  return (
    <div className="absolute z-40 h-fit w-full" style={{ backgroundColor: 'rgba(128, 128, 128, 0.2)' }}>
      <div className="hidden md:block">
        <nav className="container flex items-center justify-between gap-x-4">
          <Logo />
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <div className="flex h-full gap-x-2">
              {filteredItems.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={''}
                  icon={item.icon}
                  clickCallback={() => {
                    if (item.label === "Notifications") {
                      onNotificationClick();
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavbarItem({
  link,
  label,
  clickCallback,
  icon
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
  icon: any
}) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full gap-2 justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) {
            clickCallback();
          }
        }}
      >
        {icon}
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl dark:bg-primary bg-emerald-500 md:block" />
      )}
    </div>
  );
}

export const Notification = ({ payment, onCloseNotification }: { payment: any, onCloseNotification: () => void }) => {
  return (
    <div className="fixed backdrop-blur-md inset-0 flex items-center justify-center z-50">
      <div
        className="notif__scroll relative flex flex-col h-[90vh] pt-[20px] border-2 border-white rounded-[50px] items-center gap-10 w-fit px-20"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="flex flex-row gap-5 justify-center items-center w-fit">
          <Label className="text-[40px]">INBOX</Label>
          <Mail className="w-10 h-10" />
          <CircleX className="absolute top-7.5 right-10 cursor-pointer w-10 h-10" onClick={() => onCloseNotification()} />
        </div>
        {payment.map((pay: any, index: any) => (
          <div key={index} className="relative w-fit flex">
            <div className="relative max-w-[300px] md:max-w-[400px]">
              <span className="absolute -z-10 w-full h-full inset-1 bg-violet-500 rounded-xl"></span>
              <button className="absolute py-1 z-10 px-3 -left-8 -top-2 -rotate-[10deg] black_border bg-violet-500 text-white font-bold">
                NOTIFICATION!
              </button>
              <div className="p-8 border border-black purple_border bg-white rounded-xl z-20 flex flex-col">
                <span className="font-mono text-lg text-center text-purple-700 font-bold">
                  Pembayaran Berhasil!
                </span>
                <span className="text-purple-700 text-md font-normal break-all">
                  Detail Pembayaran anda telah dikirimkan ke email {pay.userEmail}
                </span>
                <span className="text-purple-700 text-md font-normal break-all">
                  Cek email anda untuk melihat slip pembayaran.
                </span>

                <button className="mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                  Cek Email
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
