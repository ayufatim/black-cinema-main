"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteUser } from "../_actions/deleteUser";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string;
}

export default function DeleteMovieDialog({
    open,
    setOpen,
    userId,
}: Props) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteUser,
        onSuccess: async () => {
            toast.success("Film berhasil dihapus", {
                id: userId,
            });

            await queryClient.invalidateQueries({
                queryKey: ["payments"],
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: userId,
            });
        },
    });

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah kamu yakin ingin menghapus data film ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Data yang sudah dihapus tidak bisa dikembalikan. Pastikan data yang
                        akan dihapus benar.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            toast.loading("Menghapus data film...", {
                                id: userId,
                            });

                            deleteMutation.mutate(userId);
                        }}
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
