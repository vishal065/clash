import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import { SingleClashFetch } from "@/fetch/ClashFetch";
import { ClashFetchData } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";

async function ClashItems({ params }: { params: { id: number } }) {
  const session: CustomSession | null = await getServerSession(authOptions);
  const clash: ClashFetchData | null = await SingleClashFetch(params.id);
  console.log("here is data ", clash);

  return (
    <div className=" container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
          {clash?.title}
        </h1>
        <p className="text-lg text-white">{clash?.description}</p>
      </div>
      <AddClashItems
        token={session?.user?.token as string}
        clashId={params.id}
      />
    </div>
  );
}

export default ClashItems;
