"use client";
import { Upload } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ClashItemForm } from "@/types";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { CLASH_ITEMS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddClashItems({ token, clashId }: { token: string; clashId: number }) {
  const imageRef1 = useRef<HTMLInputElement | null>(null);
  const imageRef2 = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<Array<ClashItemForm>>([
    { image: null },
    { image: null },
  ]);
  const [imageUrl, setImageUrl] = useState<Array<string>>(["", ""]);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Update the items array
      const updatedItems = [...items];
      updatedItems[index].image = file;
      setItems(updatedItems);

      // Update the imageUrl array

      const fileUrl = URL.createObjectURL(file);
      const updatedUrls = [...imageUrl];
      updatedUrls[index] = fileUrl;
      setImageUrl(updatedUrls);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", clashId.toString());

      items.map((item) => {
        if (item.image) formData.append("images[]", item.image);
      });
      if (formData.get("images[]")) {
        setLoading(true);
        const { data } = await axios.post(`${CLASH_ITEMS_URL}/add`, formData, {
          headers: { Authorization: token },
        });
        if (data?.message) {
          toast.success(data?.message);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
        setLoading(false);
      } else {
        toast.warning("please upload both images");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          if (error?.response?.data?.errors) {
            error?.response?.data?.errors?.map((err) => toast.error(err));
          }
        }
      } else {
        toast.error("something went wrong please try again");
      }
    }
  };

  return (
    <div className="mt-10 text-white">
      <div className=" flex flex-wrap lg:flex-nowrap justify-between items-center">
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          {/* first Block */}
          <div
            onClick={() => imageRef1?.current?.click()}
            className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
          >
            <input
              type="file"
              className=" hidden"
              ref={imageRef1}
              onChange={(e) => handleImageChange(e, 0)}
            />
            {imageUrl.length > 0 && imageUrl[0] !== "" ? (
              <Image
                src={imageUrl?.[0]}
                width={500}
                height={500}
                alt={imageUrl[1]}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center space-x-2 text-xl">
                <Upload />
                <span>Upload file</span>
              </h1>
            )}
          </div>
          {/* vs block */}
          <div className="w-full flex lg:w-auto justify-center items-center p-2 m-4">
            <h1 className="text-6xl  font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
              vs
            </h1>
          </div>
          {/* second Block */}
          <div
            onClick={() => imageRef2?.current?.click()}
            className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
          >
            <input
              type="file"
              className=" hidden"
              ref={imageRef2}
              onChange={(e) => handleImageChange(e, 1)}
            />
            {imageUrl.length > 0 && imageUrl[1] !== "" ? (
              <Image
                src={imageUrl[1]}
                width={500}
                height={500}
                alt={imageUrl[1]}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center space-x-2 text-xl">
                <Upload />
                <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className=" text-center p-2 m-4">
        <Button className="w-52" onClick={handleSubmit} disabled={loading}>
          {loading ? "processing.." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddClashItems;
