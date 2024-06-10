import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binema",
  description:
    "Ordering ticket cinema.",
    icons: {
      icon: '/favicon.ico',
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
