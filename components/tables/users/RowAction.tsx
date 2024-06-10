"use client";

import React, { useState } from "react";
import { UsersRow } from "./columns";
import { Button } from "../../ui/button";
import { TrashIcon } from "lucide-react";
import DeleteUserDialog from "@/app/(server)/dashboard/users/_components/DeleteUserDialog";

export default function RowAction({
  user,
}: {
  user: UsersRow;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteUserDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        userId={user.id}
      />
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => setShowDeleteDialog(true)}
      >
        <TrashIcon className="h-4 w-4 shrink-0 text-rose-500" />
      </Button>
    </>
  );
}
