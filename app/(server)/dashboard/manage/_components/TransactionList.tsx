import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { TrendingDown, TrendingUp, Plus } from 'lucide-react'
import React from 'react'
import { Button } from 'react-day-picker'
import { TransactionCard } from './TransactionCard'

export function TransactionList({ type, transaction }: { type: any, transaction: any }) {
    return (
        <div>
            <SkeletonWrapper isLoading={transaction.isLoading}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                {type === "expense" ? (
                                    <TrendingDown className="h-12 w-12 items-center rounded-xl bg-red-400/10 p-2 text-red-500" />
                                ) : (
                                    <TrendingUp className="h-12 w-12 items-center rounded-xl bg-green-400/10 p-2 text-green-500" />
                                )}
                                <span>
                                    {type === "income" ? "Pemasukkan" : "Pengeluaran"}
                                </span>
                            </div>

                            {/* <CreateCategoryDialog
                                type={type}
                                successCallback={() => categoriesQuery.refetch()}
                                trigger={ */}
                            <Button className="gap-2 text-sm">
                                <Plus className="h-6 w-6" />
                                <span>Tambah</span>
                            </Button>
                            {/* }
                            /> */}
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    {!transaction && (
                        <div className="flex h-40 w-full flex-col items-center justify-center">
                            <p>
                                Tidak ada {" "}
                                <span
                                    className={cn(
                                        "m-1",
                                        type === "income" ? "text-green-500" : "text-red-500"
                                    )}
                                >
                                    {type === "income" ? "pemasukkan" : "pengeluaran"}
                                </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Silahkan tambahkan data baru.
                            </p>
                        </div>
                    )}
                    {transaction.length > 0 && (
                        <div className="grid grid-flow-row gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {transaction.data.map((tran: any) => (
                                <TransactionCard
                                    key={tran.id}
                                    tran={tran}
                                />
                            ))}
                        </div>
                    )}
                </Card>
            </SkeletonWrapper>
        </div>
    )
}