import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ServiceA1 from "@/components/sections/ServiceA1";
import ServiceCanon from "@/components/sections/ServiceCanon";
import WhyBizUp from "@/components/sections/WhyBizUp";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* Both services live under one anchor so "Usluge" lands on the pair */}
      <div id="usluge">
        <ServiceA1 />
        <ServiceCanon />
      </div>
      <WhyBizUp />
      <Team />
      <Contact />
    </>
  );
}
