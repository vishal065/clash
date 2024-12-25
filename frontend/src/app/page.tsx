import HeroSection from "@/components/base/HeroSection";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("hekko", session?.user);

  return (
    <div className="">
      <HeroSection />
    </div>
  );
}
