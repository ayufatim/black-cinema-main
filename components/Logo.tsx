import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2"
    >
      <Image src="https://res.cloudinary.com/dutlw7bko/image/upload/v1716618897/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6_1_wc2vsh.png" alt="Logo" width={60} height={51} className="rounded-lg"/>
    </Link>
  );
}
