"use client";

import React, { useState } from "react";
import { moviesRow } from "./columns";
import { Button } from "../../ui/button";
import { Pencil, TrashIcon } from "lucide-react";
import DeleteMovieDialog from "@/app/(server)/dashboard/movies/_components/DeleteMovieDialog";
import { useRouter } from 'next/navigation'

export default function RowAction({
  movie,
}: {
  movie: moviesRow;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const route = useRouter()

  return (
    <>
      <DeleteMovieDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        movieId={movie.id}
      />
      <div className="flex flex-row gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => route.push(`${movie.id}/edit`)}
        >
          <Pencil className="h-4 w-4 shrink-0 text-green-500" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setShowDeleteDialog(true)}
        >
          <TrashIcon className="h-4 w-4 shrink-0 text-rose-500" />
        </Button>
      </div>
    </>
  );
}
