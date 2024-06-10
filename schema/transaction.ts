import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  paymentId: z.string().optional(),
  date: z.coerce.date(),
  type: z.union([z.literal("income"), z.literal("expense")]),
});

export type CreateTransactionSchemaType = z.infer<typeof transactionSchema>;