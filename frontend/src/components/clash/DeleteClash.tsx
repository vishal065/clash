"use client";
import { clearCache } from "@/app/actions/commonActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CLASH_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

function DeleteClash({
  open,
  setOpen,
  id,
  token,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const deleteClash = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${CLASH_URL}/delete/${id}`, {
        headers: { Authorization: token },
      });

      if (data?.message) {
        clearCache("dashboard");
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
      toast.error("something went wrong please try again");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete clash permanently
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteClash} disabled={loading}>
            {loading ? `processing` : "yes continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteClash;
