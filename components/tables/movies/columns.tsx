"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./ColumnHeader";
import RowAction from '@/components/tables/movies/RowAction'
import { getMoviesType } from "@/app/api/movie/route";

export type moviesRow = getMoviesType[0];

export const columnsMovies: ColumnDef<moviesRow>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
  {
    accessorKey: "overview",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Overview"
      />
    ),
    cell: ({ row }) => <div className="line-clamp-3">{row.original.overview}</div>,
  },
  {
    accessorKey: "poster_path",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Poster"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img src={row.original.poster_path} alt={row.original.title} className="h-16" />
      </div>
    ),
  },
  {
    accessorKey: "backdrop_path",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Backdrop"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img src={row.original.backdrop_path} alt={row.original.title} className="h-16" />
      </div>
    ),
  },
  {
    accessorKey: "genres",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Genres"
      />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 flex-wrap">
        <span className="badge">
          {(row.original.genres || []).join(", ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
      />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => (
      <div className="flex gap-2 flex-wrap">
        <span className="badge">
          {(row.original.category || []).join(", ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "release_date",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Release Date"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.release_date);
      const formattedDate = date.toLocaleDateString("default", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "trailer",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Trailer"
      />
    ),
    cell: ({ row }) => (
      <a href={row.original.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        Watch Trailer
      </a>
    ),
  },
  {
    accessorKey: "movieDuration",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Duration"
      />
    ),
    cell: ({ row }) => <div>{row.original.movieDuration} minute</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <RowAction movie={row.original} />,
  },
];
