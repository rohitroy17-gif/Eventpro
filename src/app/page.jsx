import Banner from "@/components/Banner";
import FeaturesSection from "@/components/FeaturesSection";
import LatestServices from "@/components/LatestServices";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Banner></Banner>
     <LatestServices></LatestServices>
     <TestimonialsSection></TestimonialsSection>
     <FeaturesSection></FeaturesSection>
    </div>
  );
}
