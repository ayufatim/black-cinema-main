import getCurrentUser from "@/app/_actions/get-user";
import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
    return;
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewQuerySchema.safeParse({ from, to });
  if (!queryParams.success) {
    return new Response(queryParams.error.message, { status: 400 });
  }

  const stats = await getCategoryStats(
    new Date(queryParams.data.from),
    new Date(queryParams.data.to)
  );

  const categoryDescriptions = await getCategoryDescriptions();

  const categorizedStats = stats.map((categoryStat) => ({
    ...categoryStat,
    descriptions: categoryDescriptions[categoryStat.type] || [],
  }));

  return new Response(JSON.stringify(categorizedStats), { status: 200 });
}

async function getCategoryStats(from: Date, to: Date) {
  const stats = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  return stats;
}

interface CategoryDescription {
  [key: string]: Array<{
    description: string;
    id: string;
    amount: number;
  }>;
}

interface CategoryStats {
  type: string;
  _sum: {
    amount: number;
  };
}

export type GetCategoriesStatsResponseType = Array<{
  type: string;
  _sum: {
    amount: number;
  };
  descriptions: Array<{
    description: string;
    id: string;
    amount: number;
  }>;
}>;

async function getCategoryDescriptions(): Promise<CategoryDescription> {
  const transactions = await prisma.transaction.findMany({
    select: {
      description: true,
      type: true,
      id: true,
      amount: true,
    },
  });

  return transactions.reduce<CategoryDescription>((acc, transaction) => {
    if (!acc[transaction.type]) {
      acc[transaction.type] = [];
    }
    acc[transaction.type].push({
      description: transaction.description,
      id: transaction.id,
      amount: transaction.amount,
    });
    return acc;
  }, {});
}
