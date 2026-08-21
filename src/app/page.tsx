import { existsSync } from "node:fs";
import path from "node:path";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ServiceA1 from "@/components/sections/ServiceA1";
import ServiceCanon from "@/components/sections/ServiceCanon";
import WhyBizUp from "@/components/sections/WhyBizUp";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import { heroMedia } from "@/lib/site";

/* Resolved once at build time. Without the film on disk the hero skips the
   <video> element entirely rather than firing a request that 404s. */
const hasHeroVideo = existsSync(
  path.join(process.cwd(), "public", heroMedia.video),
);

export default function Home() {
  return (
    <>
      <Hero hasVideo={hasHeroVideo} />
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
