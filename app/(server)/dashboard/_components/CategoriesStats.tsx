import { useMemo } from "react";
import { DateToUTCDate, GetFormattedForCurrency } from "@/lib/helpers";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";

interface StatsCardsProps {
  from: Date;
  to: Date;
}

export default function CategoriesStats({ from, to }: StatsCardsProps) {
  const statsQuery = useQuery({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => GetFormattedForCurrency("IDR"), []);

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <CategoriesCard
          formatter={formatter}
          type="income"
          data={statsQuery.data || []}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isLoading}>
        <CategoriesCard
          formatter={formatter}
          type="expense"
          data={statsQuery.data || []}
        />
      </SkeletonWrapper>
    </div>
  );
}

function CategoriesCard({
  data,
  type,
  formatter,
}: {
  type: string;
  formatter: Intl.NumberFormat;
  data: GetCategoriesStatsResponseType;
}) {
  const filteredData = useMemo(() => data.filter((d) => d.type === type), [data, type]);

  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          Kategori {type === "income" ? "Pemasukkan" : "Pengeluaran"}
        </CardTitle>
      </CardHeader>

      <div className="flex items-center justify-between gap-2">
        {filteredData.length === 0 ? (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            Data tidak ditemukan untuk periode ini
            <p className="text-sm text-center text-muted-foreground">
              Coba pilih periode yang lain atau coba buat transaksi baru {type === "income" ? "pemasukkan" : "pengeluaran"}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredData.map((item, index) =>
                item.descriptions.map((description, descIndex) => {
                  const amount = description.amount || 0;
                  const total = item.descriptions.reduce((acc, el) => acc + (el.amount || 0), 0);
                  const percentage = total === 0 ? 0 : (amount * 100) / total;

                  return (
                    <div key={`${index}-${descIndex}`} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-400">
                          {description.description}
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
                })
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}
