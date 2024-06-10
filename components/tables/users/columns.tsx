"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableUsersColumnHeader } from "./ColumnHeader";
import RowAction from "./RowAction";
import { getUsersType } from "@/app/api/user/route";

export type UsersRow = getUsersType[0];

export const columnsUsers: ColumnDef<UsersRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="User Name"
      />
    ),
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="User Email"
      />
    ),
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="User Image"
      />
    ),
    cell: ({ row }) => <div><img src={row.original.image || ''} alt={row.original.name || ''} height={32} width={32} className="rounded-full" /></div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="Created At"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="Updated At"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      const formattedDate = date.toLocaleString();
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => <div>{row.original.role}</div>,
  },
  {
    accessorKey: "favoriteMovie",
    header: ({ column }) => (
      <DataTableUsersColumnHeader
        column={column}
        title="Favorite Movies"
      />
    ),
    cell: ({ row }) => (
      <div>{row.original.favoriteMovie.join(", ")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowAction user={row.original} />,
  },
];
