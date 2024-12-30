"use client";
import { ClashFetchData } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { getImageURL } from "@/lib/utils";
import { Button } from "../ui/button";
import ClashCardMenu from "./ClashCardMenu";
import Link from "next/link";

function ClashCard({ clash, token }: { clash: ClashFetchData; token: string }) {

  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle>{clash.title}</CardTitle>
        <ClashCardMenu clash={clash} token={token} />
      </CardHeader>
      <CardContent>
        {clash?.image && (
          <Image
            className=" rounded-md w-full h-[220px] object-contain"
            src={getImageURL(clash.image)}
            alt={clash.title}
            width={500}
            height={500}
          />
        )}
        <p>{clash.description}</p>
        <p>
          <strong>Expire At</strong>
          {new Date(clash.expire_At).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/clash/items/${clash?.id}`}>
          <Button>items</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ClashCard;
