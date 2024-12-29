"use client";
import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { ClashItemForm } from "@/types";

function AddClashItems({ token, clashId }: { token: string; clashId: number }) {
  const [items, setItems] = useState<Array<ClashItemForm>>([
    { image: null },
    { image: null },
  ]);
  return (
    <div className="mt-10 text-white">
      <div className=" flex flex-wrap lg:flex-nowrap justify-between items-center">
        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          {/* first Block */}
          <div className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]">
            <h1 className="flex items-center space-x-2 text-xl">
              <Upload />
              <span>Upload file</span>
            </h1>
          </div>
          {/* vs block */}
          <div className="w-full flex lg:w-auto justify-center items-center p-2 m-4">
            <h1 className="text-6xl  font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
              vs
            </h1>
          </div>
          {/* second Block */}
          <div className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]">
            <h1 className="flex items-center space-x-2 text-xl">
              <Upload />
              <span>Upload file</span>
            </h1>
          </div>
        </div>
      </div>
      <div className=" text-center p-2 m-4">
        <Button className="w-52">Submit</Button>
      </div>
    </div>
  );
}

export default AddClashItems;
