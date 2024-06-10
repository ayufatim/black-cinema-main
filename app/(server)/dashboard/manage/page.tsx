import { getAllTransaction } from "@/app/_actions/get-all-transaction";
import { TransactionList } from "./_components/TransactionList"

export default async function ManagePage() {
  const transaction = await getAllTransaction()
  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between md:flex-nowrap gap-6 py-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Manage</h2>
            <p>
              Manage pemasukan dan pengeluaran.
            </p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 p-4">
        <TransactionList type="income" transaction={transaction}/>
        <TransactionList type="expense" transaction={transaction}/>
      </div>
    </>
  );
}
