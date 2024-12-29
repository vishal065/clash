import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";
import {
  authOptions,
  CustomSession,
  CustomUser,
} from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ClashFetchData } from "@/types";
import { ClashFetch } from "../../fetch/ClashFetch";
import ClashCard from "@/components/clash/ClashCard";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const clashes: Array<ClashFetchData> | [] = await ClashFetch(
    session?.user?.token as string
  );
  return (
    <div className="container">
      <Navbar />
      <div className="text-end mt-10">
        <AddClash user={session?.user as CustomUser} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 ">
        {clashes.length > 0 &&
          clashes.map((item, i) => (
            <ClashCard
              clash={item}
              key={i}
              token={session?.user?.token as string}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
