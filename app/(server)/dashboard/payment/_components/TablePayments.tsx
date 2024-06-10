"use client";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import { columnsPayments } from "@/components/tables/payment/columns";
import { DataTablePayment } from "@/components/tables/payment/DataTablePayment";
import { Payment } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TablePayments() {
    const payments = useQuery<Payment[]>({
        queryKey: ["payments"],
        queryFn: () =>
            fetch(
                `/api/payment`
            ).then((res) => res.json()),
    });

    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="w-full">
            <SkeletonWrapper isLoading={payments.isLoading}>
                <DataTablePayment
                    data={payments.data || []}
                    columns={columnsPayments}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </SkeletonWrapper>
        </div>
    );
}
