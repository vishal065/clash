import Link from "next/link";
// import { headers } from "next/headers";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  // const headersList = await headers();
  // const domain = headersList.get("host");
  // console.log(headersList, domain);

  //   const data = await getSiteData(domain);
  return (
    <div className="h-screen flex flex-col justify-center items-center ">
      <Image src={`/404.svg`} width={500} height={500} alt="404" />
      <Link href={`/`}>
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
