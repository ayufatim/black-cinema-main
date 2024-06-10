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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Transaction } from "@prisma/client";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
    trigger: React.ReactNode;
    transaction: Transaction;
}

export default function DeleteTransactionDialog({ trigger, transaction }: Props) {
    const deleteTran = (id: any) => {
        try {
            axios.delete('/api/transaction', id)
            Swal.fire({
                icon:'success',
                title:'Success',
                text:'Data berhasil dihapus'
            })
        } catch(error) {
            throw error
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah kamu yakin ingin menghapus data transaksi {transaction.id}?
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
                            deleteTran(transaction.id)
                        }}
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
