"use client";
import { useGSAP } from "@gsap/react";
import projectsData from "../../data/projects.json";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { usePathname } from "next/navigation";
import plantLifeCategoriesImg from "../../assets/plantlife/plantlife-categories.jpg";
import plantLifeCheckoutImg from "../../assets/plantlife/plantlife-checkout.jpg";
import { useEffect, useRef } from "react";
import Image from "next/image";
interface IProject {
  id: number;
  name: string;
  color: string;
  description: string;
  link: string;
  technologies: {
    frontend: string[];
    backend: string[];
  };
  videos: {
    "full-demo": string;
    demo_1: string;
    demo_2: string;
    demo_3: string;
  };
}
gsap.registerPlugin(SplitText);
const PlantLifePage = () => {
  const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "").trim();

  const containerRef = useRef(null);
  const pathname = usePathname();

  const slug = pathname?.split("/").pop();
  const project = projectsData.projects.find(
    (p: IProject) => slugify(p.name) === slug
  );

  if (!project) return;
  const { name, description, link, technologies, id, videos, color } = project;
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
          delay: 0.7,
        });
      },
    });
  }, [{ scope: containerRef }]);
  useEffect(() => {
    document.documentElement.classList.add(name);
    return () => document.documentElement.classList.remove(name);
  }, []);

  return (
    <>
      <div
        id={name}
        ref={containerRef}
        className="min-h-screen flex flex-col items-start p-10  lg:container lg:mx-auto 2xl:justify-center"
      >
        <div>
          <div className="flex items-start justify-between  text-sm">
            <div className="flex items-start space-x-5 lg:space-x-20">
              <p className="uppercase">0{`${id}`}.</p>

              <p className="uppercase">{name}</p>
            </div>
            <Link href={link} target="_blank" className="uppercase">
              Visit Website
            </Link>
          </div>
          <div className="lg:pl-22 mt-10 lg:mt-20 space-y-16">
            <p className="description font-canela max-w-[30ch] text-3xl lg:text-5xl font-light xl:max-w-full">
              {description}
            </p>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-20">
                <div className="text-sm space-y-2 uppercase">
                  <p>(FRONTEND)</p>
                  <div>
                    {technologies.frontend.map(
                      (item: string, index: number) => (
                        <p key={index}>{item}</p>
                      )
                    )}
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
              <div>
                <p className="uppercase text-sm mr-auto">
                  (Made with ❤️ and typescript)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:container lg:mx-auto">
        <div className="grid grid-cols-6 p-10 gap-2">
          <div className="col-span-6 p-10" style={{ backgroundColor: color }}>
            <video
              autoPlay
              muted
              loop
              src={videos["full-demo"]}
              className="w-full max-w-5xl mx-auto"
            />
          </div>
          <div className="col-span-3">
            <Image
              src={plantLifeCategoriesImg}
              alt="PlantLife Categories"
              className="mx-auto "
            />
          </div>
          <div className="col-span-3">
            <Image
              src={plantLifeCheckoutImg}
              alt="PlantLife Checkout"
              className="mx-auto"
            />
          </div>
          <div className="col-span-2 p-10" style={{ backgroundColor: color }}>
            <div className="max-w-[380px]">
              <video
                autoPlay
                muted
                loop
                src={videos["demo_1"]}
                className="w-full max-w-[380px]"
              />
            </div>
          </div>
          <div className="col-span-2 p-10" style={{ backgroundColor: color }}>
            <div className="max-w-[380px]">
              <video
                autoPlay
                muted
                loop
                src={videos["demo_2"]}
                className="w-full max-w-[380px] "
              />
            </div>
          </div>
          <div className=" col-span-2 p-10" style={{ backgroundColor: color }}>
            <div className="max-w-[380px]">
              <video
                autoPlay
                muted
                loop
                src={videos["demo_3"]}
                className="w-full max-w-[380px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PlantLifePage;
