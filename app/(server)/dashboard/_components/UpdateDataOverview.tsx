"use client";

import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

interface Props {
    payment: any;
    transaction: any;
}

export default function UpdateDataOverview({ payment, transaction }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        const filteredTransaction = payment.filter((pay: any) =>
            !transaction.some((tran: any) => tran.paymentId === pay.id)
        );

        const validationStatusTransaction = filteredTransaction.find((tran: any) => tran.status === 'success');

        setIsLoading(true);
        try {
            let dataUpdatedTransaction = false;
        
            const postDataPromises = [
                ...(filteredTransaction.length > 0 && validationStatusTransaction
                    ? filteredTransaction.map((tran: any) => {
                        const formattedData = {
                            paymentId: tran.id,
                            amount: tran.totalPrice,
                            description: 'Pemesanan Tiket',
                            date: tran.successPayment,
                            type: 'income',
                        };
                        return axios.post('/api/transaction/update', formattedData).then(() => dataUpdatedTransaction = true);
                    })
                    : []
                )
            ];
        
            await Promise.all(postDataPromises);
        
            await Swal.fire({
                icon: dataUpdatedTransaction ? 'success' : 'info',
                title: dataUpdatedTransaction ? 'Success' : 'Info',
                text: dataUpdatedTransaction ? 'Data berhasil di update!' : 'Data anda sudah terbaru.',
            }).then((result) => {
                if (dataUpdatedTransaction && result.isConfirmed) {
                    router.push('/dashboard');
                    router.refresh();
                }
            });
        } catch (error) {
            console.error(error);
            await Swal.fire({ icon: 'error', title: 'Error', text: 'Gagal update Data!' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="gap-2">
            <History />Update Data
        </Button>
    );
}