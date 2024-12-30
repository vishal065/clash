"use client";
import { ClashFetchData } from "@/types";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import Env from "@/lib/env";
import { toast } from "sonner";

const EditClash = dynamic(() => import(`./EditClash`));

function ClashCardMenu({
  clash,
  token,
}: {
  clash: ClashFetchData;
  token: string;
}) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${Env.APP_URL}/clash/${clash.id}`);
    toast.success("link copied successfully");
  };
  return (
    <>
      {open && (
        <Suspense fallback={<p>loading</p>}>
          <EditClash
            open={open}
            setOpen={setOpen}
            clash={clash}
            token={token}
          />
        </Suspense>
      )}
      {deleteOpen && (
        <Suspense fallback={<p>loading</p>}>
          <EditClash
            open={deleteOpen}
            setOpen={setDeleteOpen}
            clash={clash}
            token={token}
          />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy}>Copy link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ClashCardMenu;
