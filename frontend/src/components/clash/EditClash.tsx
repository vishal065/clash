"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { ClashFetchData, ClashFormType, ClashFormTypeError } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { clearCache } from "@/app/actions/commonActions";

//! by removing initialFocus from calender or adding model true in popover will fix the error
function EditClash({
  token,
  clash,
  open,
  setOpen,
}: {
  token: string;
  clash: ClashFetchData;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [date, setDate] = React.useState<Date | null>(
    new Date(clash.expire_At)
  );
  const [clashData, setClashData] = useState<ClashFormType>({
    title: clash.title,
    description: clash.description,
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ClashFormTypeError>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();

      formData.append("title", clashData.title ?? "");
      formData.append("description", clashData.description ?? "");
      formData.append("expire_At", date?.toISOString() ?? "");
      if (image) formData.append("image", image);

      const { data } = await axios.put(
        `${CLASH_URL}/update/${clash.id}`,
        formData,
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      if (data?.message) {
        clearCache("dashboard");
        setClashData({});
        setDate(null);
        setImage(null);
        setErrors({});
        toast.success(data?.message);
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error?.response?.data?.errors);
        }
      } else {
        toast.error("something went wrong please try again ");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="text-white">Add clash</div>
      </DialogTrigger>
      <DialogContent
        className="xl:max-h-[95vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Clash</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Please fill in the details below to create a clash. All fields are
          required.
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={clashData?.title ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, title: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.title}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter your description"
              value={clashData?.description ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, description: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.description}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" onChange={handleImageChange} />
            <span className="text-red-500">{errors?.image}</span>
          </div>
          <div className="mt-4 ">
            <Label htmlFor="expireAt" className="block">
              Expire At
            </Label>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full mt-2 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date ?? new Date()}
                  onSelect={(date) => setDate(date!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-red-500">{errors?.expire_At}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "processing" : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditClash;
