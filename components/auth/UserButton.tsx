'use client';

import { CircleUserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const UserButton: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className="flex gap-4 ml-auto items-center w-full">
                {session?.user ? (
                    <>
                        <Image
                            src={session.user.image ?? ""}
                            alt={session.user.name ?? ""}
                            className="rounded-full w-9 h-9"
                            width={32}
                            height={32}
                        />
                        <button
                            onClick={() => signOut()}
                            className="text-sm text-white bg-red-700 p-2 rounded"
                            type="button"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Button onClick={() => router.push("/signin")} type="button" className="w-fit h-[37px]" variant={'outline'}>
                        <CircleUserRound className="w-[25px] h-[25px] duration-300" />
                    </Button>
                )}
        </div>
    );
};

export default UserButton;
