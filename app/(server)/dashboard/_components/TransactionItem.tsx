import React from "react";
import { Progress } from "@/components/ui/progress";

function TransactionItem({ item, formatter, percentage, transactionDescription, type, amount }: {
    item: any;
    formatter: Intl.NumberFormat;
    percentage: number;
    transactionDescription: string;
    type: any;
    amount: number
}) {
    return (
        <div key={item.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <span className="flex items-center text-gray-400">
                    {transactionDescription}
                    <span className="ml-2 text-xs text-muted-foreground">
                        ({percentage.toFixed(0)}%)
                    </span>
                </span>
                <span className="text-sm text-gray-400">
                    {formatter.format(amount)}
                </span>
            </div>
            <Progress
                value={percentage}
                indicator={type === "income" ? "bg-green-600" : "bg-rose-600"}
            />
        </div>
    );
}

export default TransactionItem;
