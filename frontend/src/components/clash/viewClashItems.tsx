"use client";
import socket from "@/lib/Socket";
import { getImageURL } from "@/lib/utils";
import { ClashFetchData } from "@/types";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";

function ViewClashItems({ clash }: { clash: ClashFetchData }) {
  const [clashComments, setClashComments  ] = useState(clash?.ClashComments);
  const [clashItems, setClashItems] = useState(clash?.ClashItem);

  const updateCounter = (id: number) => {
    const items = [...clashItems];
    const findIndex = items.findIndex((item) => item.id === id);
    if (findIndex != -1) {
      items[findIndex].count += 1;
      setClashItems(items);
    }
  };

   const updateComment = (payload: any) => {
     if (clashComments && clashComments.length > 0) {
       setClashComments([payload, ...clashComments]);
     } else {
       setClashComments([payload]);
     }
   };
  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) => {
      updateCounter(data?.clashItemsID);
    });
     socket.on(`clashing-comment-${clash.id}`, (data) => {
       updateComment(data);
     });
  }, []);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItems &&
          clashItems?.length > 0 &&
          clashItems?.map((item, i) => {
            return (
              <Fragment key={i}>
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                  <div className="w-full flex justify-center items-center rounded-md p-2 h-[300px]">
                    <Image
                      src={getImageURL(item?.image)}
                      width={500}
                      height={500}
                      alt="preview"
                      className="w-full h-[300px] object-contain"
                    />
                  </div>
                  <CountUp
                    start={0}
                    end={item.count}
                    duration={2}
                    className="text-5xl font-extrabold bg-gray-300"
                  />
                </div>
                {i % 2 === 0 ? (
                  <div className="w-full flex lg:w-auto justify-center items-center">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                      vss
                    </h1>
                  </div>
                ) : null}
              </Fragment>
            );
          })}
      </div>
      {/* comments */}
      <div className="mt-4 text-white">
        {clashComments &&
          clashComments.length > 0 &&
          clashComments.map((item, i) => (
            <div
              className="w-full md:w-600px rounded-lg p-4 bg-muted mb-4"
              key={i}
            >
              <p className=" font-bold">{item.comment}</p>
              <p>{new Date(item.created_At).toDateString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ViewClashItems;
