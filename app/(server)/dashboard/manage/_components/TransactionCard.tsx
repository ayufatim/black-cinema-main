import { Button } from '@/components/ui/button'
import React from 'react'
import DeleteTransactionDialog from './DeleteTransactionDialog'

export function TransactionCard({ transaction }: any) {
    return (
        <div>
            <div className="flex border-separate flex-col justify-between rounded-lg border shadow-sm shadow-black/[0.1] dark:shadow-white/[0.1]">
                <div className="flex flex-col items-center gap-2 p-4">
                    <span
                        className="text-3xl"
                        role="img"
                    >
                        {transaction.amount}
                    </span>
                    <span>{transaction.description}</span>
                </div>
                <DeleteTransactionDialog
                    transaction={transaction}
                    trigger={<Button variant="ghost">Hapus</Button>}
                />
            </div>
        </div>
    )
}