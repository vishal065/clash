import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function Dashboard() {
  const session: CustomSession = await getServerSession(authOptions);
  return (
    <div className="container">
      <Navbar />
      <div className="text-end mt-10">
        <AddClash user={session.user!} />
      </div>
    </div>
  );
}

export default Dashboard;
