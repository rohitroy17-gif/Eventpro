import Banner from "@/components/Banner";
import LatestServices from "@/components/LatestServices";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Banner></Banner>
     <LatestServices></LatestServices>
    </div>
  );
}
