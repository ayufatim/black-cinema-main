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
import { DeleteMovie } from "../_actions/deleteMovie";
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    movieId: string;
}

export default function DeleteMovieDialog({
    open,
    setOpen,
    movieId,
}: Props) {
    const queryClient = useQueryClient();
    const router = useRouter()

    const deleteMutation = useMutation({
        mutationFn: DeleteMovie,
        onSuccess: async () => {
            toast.success("Film berhasil dihapus", {
                id: movieId,
            });

            await queryClient.invalidateQueries({
                queryKey: ["movies"],
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: movieId,
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
                                id: movieId,
                            });

                            deleteMutation.mutate(movieId);
                        }}
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
