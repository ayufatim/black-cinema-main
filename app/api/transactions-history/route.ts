import getCurrentUser from "@/app/_actions/get-user";
import { GetFormattedForCurrency } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({
    from,
    to,
  });

  if (!queryParams.success) {
    return Response.json(queryParams.error.message, { status: 400 });
  }

  const transaction = await getTransactionHistory(
    queryParams.data.from,
    queryParams.data.to
  );

  return Response.json(transaction);
}

export type getTransactionHistoryType = Awaited<
  ReturnType<typeof getTransactionHistory>
>;

async function getTransactionHistory(from: Date, to: Date) {
  const formatter = GetFormattedForCurrency("IDR");

  const transactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions.map((transaction) => ({
    ...transaction,
    amount: formatter.format(transaction.amount),
  }));
}
