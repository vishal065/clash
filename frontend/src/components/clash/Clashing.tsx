"use client";
import { getImageURL } from "@/lib/utils";
import { ClashFetchData } from "@/types";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import socket from "@/lib/Socket";
import { toast } from "sonner";

function Clashing({ clash }: { clash: ClashFetchData }) {
  const [clashComments, setClashComments] = useState(clash?.ClashComments);
  const [clashItems, setClashItems] = useState(clash.ClashItem);
  const [comment, setComment] = useState("");
  const [hideVote, setHideVote] = useState(false);

  const handleVote = (id: number) => {
    if (clashItems && clashItems.length > 0) {
      setHideVote(true);
      updateCounter(id);
      socket.emit(`clashing-${clash.id}`, {
        clashID: clash.id,
        clashItemsID: id,
      });
    }
  };

  const updateCounter = (id: number) => {
    const items = [...clashItems];
    const findIndex = items.findIndex((item) => item.id === id);
    if (findIndex != -1) {
      items[findIndex].count += 1;
      setClashItems(items);
    }
  };

  const handleComment = (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.length > 2) {
      const payload = {
        id: clash.id,
        comment: comment,
        created_At: new Date().toDateString(),
      };
      updateComment(payload);
      socket.emit(`clashing-comment-${clash.id}`, payload);
      setComment("");
    } else {
      toast.warning("please type at least 2 characters");
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
                  {hideVote ? (
                    <CountUp
                      start={0}
                      end={item.count}
                      duration={2}
                      className="text-5xl font-extrabold bg-gray-300"
                    />
                  ) : (
                    <Button onClick={() => handleVote(item.id)}>
                      <span className="mr-2 text-lg">Vote</span>
                      <ThumbsUp />
                    </Button>
                  )}
                </div>
                {i % 2 === 0 ? (
                  <div className="w-full flex lg:w-auto justify-center items-center">
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                      vs
                    </h1>
                  </div>
                ) : null}
              </Fragment>
            );
          })}
      </div>
      <form className="mt-4 w-full text-white" onSubmit={handleComment}>
        <Textarea
          value={comment}
          placeholder="Type your suggestions"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="w-full mt-2">Submit comment</Button>
      </form>
      {/* comments */}
      <div className="mt-4">
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

export default Clashing;
