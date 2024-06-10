"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTablePaymentColumnHeader } from "./ColumnHeader";
import RowAction from "./RowAction";
import { getPaymentsType } from "@/app/api/payment/route";
import { GetFormattedForCurrency } from "@/lib/helpers";

export type PaymentsRow = getPaymentsType[0];

export const columnsPayments: ColumnDef<PaymentsRow>[] = [
  {
    accessorKey: "userName",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="User Name"
      />
    ),
    cell: ({ row }) => <div>{row.original.userName}</div>,
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="User Email"
      />
    ),
    cell: ({ row }) => <div>{row.original.userEmail}</div>,
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Start Time"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.startTime);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="End Time"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.endTime);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "feeAdmin",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Admin Fee"
      />
    ),
    cell: ({ row }) => <div>{row.original.feeAdmin}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Price"
      />
    ),
    cell: ({ row }) => {
      const price = row.original.price
      const formatter = GetFormattedForCurrency("IDR");
      return <div>{formatter.format(price)}</div>
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Total Price"
      />
    ),
    cell: ({ row }) => {
      const totalPrice = row.original.totalPrice
      const formatter = GetFormattedForCurrency("IDR");
      return <div>{formatter.format(totalPrice)}</div>
    },
  },
  {
    accessorKey: "packageName",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Package Name"
      />
    ),
    cell: ({ row }) => <div>{row.original.packageName}</div>,
  },
  {
    accessorKey: "methodPayment",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Payment Method"
      />
    ),
    cell: ({ row }) => <div>{row.original.methodPayment}</div>,
  },
  {
    accessorKey: "promoCode",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Promo Code"
      />
    ),
    cell: ({ row }) => <div>{row.original.promoCode}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    accessorKey: "room",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Room"
      />
    ),
    cell: ({ row }) => <div>{row.original.room}</div>,
  },
  {
    accessorKey: "expiredPayment",
    header: ({ column }) => (
      <DataTablePaymentColumnHeader
        column={column}
        title="Expired Payment"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.expiredPayment);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowAction payment={row.original} />,
  },
];
