import Navbar from "@/components/base/Navbar";
import AddClash from "@/components/clash/AddClash";
import React from "react";

function Dashboard() {
  return (
    <div className="container">
      <Navbar />
      <div className="text-end mt-10">
        <AddClash />
      </div>
    </div>
  );
}

export default Dashboard;
