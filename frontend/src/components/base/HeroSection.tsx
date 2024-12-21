import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image src={"/next.svg"} width={600} height={600} alt="banner" />
      </div>
    </div>
  );
}

export default HeroSection;
