import { transactions } from "@/db/schema";
import { z } from "zod";

export const transactionSchema = z
  .object({
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Must be a valid amount",
    }),
    status: z
      .enum(transactions.status.enumValues, {
        required_error: "Must be a valid status",
      })
      .default(transactions.status.enumValues[1]),
    type: z.enum(transactions.type.enumValues, {
      required_error: "Must be a valid type",
    }),
    account: z.enum(transactions.account.enumValues, {
      required_error: "Must be a valid account type",
    }),
    accountId: z.string().min(1),
    number: z.string().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      // Check if the type is 'transfer' and the number is not provided
      if (data.type === "transfer" && !data.number) {
        return false; // Return false to indicate validation failed
      }
      return true; // Return true if validation passes
    },
    {
      // Custom error message for the refine check
      message: "Number is required for transfers",
    }
  );

export const accountSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid amount",
  }),
  type: z.enum(transactions.account.enumValues, {
    required_error: "Must be a valid account type",
  }),
  accountId: z.string().min(1),
  number: z.string().min(1),
});

export const pinSchema = z.object({
  pin: z
    .string()
    .min(6, "PIN must be exactly 6 digits")
    .max(6, "PIN must be exactly 6 digits")
    .regex(/^\d+$/, "PIN must contain only numbers")
    .transform((val) => val.padStart(6, "0")),
});

export const bankSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid amount",
  }),
  type: z.enum(transactions.account.enumValues, {
    required_error: "Must be a valid account type",
  }),
  accountId: z.string().min(1),
  bank: z.string().min(1),
  number: z.string().min(1),
  name: z.string().min(1),
  pin: pinSchema.shape.pin,
});

export type TransactionPayload = z.infer<typeof transactionSchema>;
export type AccountPayload = z.infer<typeof accountSchema>;
export type BankPayload = z.infer<typeof bankSchema>;
export type PinPayload = z.infer<typeof pinSchema>;
