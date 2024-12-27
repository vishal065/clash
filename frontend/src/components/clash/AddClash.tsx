"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
// import { format } from "date-fns";
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
import axios from "axios";
import { CLASH_URL } from "@/lib/apiEndPoints";

function AddClash() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [clashData, setClashData] = useState<ClashFormType>({});
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };
  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();

      formData.append("title", clashData.title ?? "");
      formData.append("description", clashData.description ?? "");
      formData.append("expire_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);
      const {} = await axios.post(`${CLASH_URL}/create`, formData);
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Add clash</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault}>
        <DialogHeader>
          <DialogTitle>Create Clash</DialogTitle>
        </DialogHeader>
        <form>
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
          </div>
          <div className="mt-4">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              value={clashData?.title ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, title: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="expireAt" className="block">
              Expire At
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full mt-2 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                  {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-4">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddClash;
