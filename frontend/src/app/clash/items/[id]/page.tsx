import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import Navbar from "@/components/base/Navbar";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClashItems from "@/components/clash/viewClashItems";

import { SingleClashFetch } from "@/fetch/ClashFetch";
import { ClashFetchData } from "@/types";
import { getServerSession } from "next-auth";
import React from "react";

async function ClashItems({ params }: { params: { id: string } }) {
  const clashId = Number(params.id); // Convert string to number if necessary
  if (isNaN(clashId)) {
    return <div>Error: Invalid Clash ID</div>;
  }

  const session: CustomSession | null = await getServerSession(authOptions);

  const clash: ClashFetchData | null = await SingleClashFetch(clashId); 

  return (
    <div className=" container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
          {clash?.title}
        </h1>
        <p className="text-lg text-white">{clash?.description}</p>
      </div>
      {clash?.ClashItem && clash?.ClashItem?.length > 0 ? (
        <>
          <h1 className="text-white">vishal</h1>
          <ViewClashItems clash={clash} />
        </>
      ) : (
        <AddClashItems
          token={session?.user?.token as string}
          clashId={clashId}
        />
      )}
    </div>
  );
}

export default ClashItems;
