import HeroSection from "@/components/base/HeroSection";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="">
      <p className="bg-red-400 text-white p-4">
        hello {JSON.stringify(session)}
      </p>
      <HeroSection />
      <div className="text-center mt-4">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Clash
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center ">
          Discover the better choice together
        </p>
        <Link href={`/login`}>
          <Button className="mt-2">Start free</Button>
        </Link>
      </div>
    </div>
  );
}
