import HeroSection from "@/components/base/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
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
