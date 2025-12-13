"use client";
import { useGSAP } from "@gsap/react";
import projectsData from "../../data/projects.json";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRef } from "react";

gsap.registerPlugin(SplitText);
const PlantLifePage = () => {
  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "").trim();

  const containerRef = useRef(null);
  const pathname = usePathname();

  const slug = pathname?.split("/").pop(); // safer than [2]
  console.log(slug);
  const { name, description, link, technologies, id } =
    projectsData.projects.find((p) => slugify(p.name) === slug);

  useGSAP(() => {
    return new SplitText(".description", {
      type: "lines",
      linesClass: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.lines, {
          yPercent: 100,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "expo.out",
          delay: 1,
        });
      },
    });
  }, [{ scope: containerRef }]);

  return (
    <div ref={containerRef} className="p-10 lg:container lg:mx-auto ">
      <div className="flex items-start justify-between  text-sm">
        <div className="flex items-start space-x-5 lg:space-x-20">
          <p className="uppercase">0{`${id}`}.</p>

          <p className="uppercase">{name}</p>
        </div>
        <Link href={link} className="uppercase">
          Visit Website
        </Link>
      </div>
      <div className="lg:pl-22 mt-10 lg:mt-20 space-y-16">
        <p className="description font-canela max-w-[30ch] text-3xl lg:text-5xl font-light">
          {description}
        </p>
        <div className="flex items-start gap-20">
          <div className="text-sm space-y-2 uppercase">
            <p>(FRONTEND)</p>
            <div>
              {technologies.frontend.map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="text-sm space-y-2 uppercase">
            <p>(Backend)</p>
            <div>
              {technologies.backend.map((item: string, index: number) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlantLifePage;
