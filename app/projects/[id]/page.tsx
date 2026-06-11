"use client";
import { useGSAP } from "@gsap/react";
import projectsData from "../../data/projects.json";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRef } from "react";
import Image from "next/image";
import LazyVideo from "@/app/components/shared/LazyVideo";
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
    "full-demo": {
      webm: string;
      mp4?: string;
      poster: string;
    };
    demo_1: {
      webm: string;
      mp4?: string;
      poster: string;
    };
    demo_2: {
      webm: string;
      mp4?: string;
      poster: string;
    };
    demo_3: {
      webm: string;
      mp4?: string;
      poster: string;
    };
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
    (p: IProject) => slugify(p.name) === slug,
  );

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

  if (!project) return;
  const {
    name,
    description,
    link,
    technologies,
    id,
    images,
    videos,
    color,
    github_backend,
    github_frontend,
  } = project;
  return (
    <>
      <div
        id={name}
        ref={containerRef}
        className="lg:min-h-screen flex flex-col items-start p-10  lg:container lg:mx-auto 2xl:justify-center"
      >
        <div>
          <div className="flex items-start justify-between  text-sm">
            <div className="flex items-start space-x-5 lg:space-x-20">
              <p className="uppercase">0{`${id}`}.</p>

              <p className="uppercase">{name}</p>
            </div>
            <Link
              href={link}
              target="_blank"
              className="uppercase underline-custom"
            >
              Visit Website
            </Link>
          </div>
          <div className="lg:pl-22 mt-10 lg:mt-20 space-y-16">
            <p className="description font-canela max-w-[30ch]  text-3xl lg:text-5xl font-light xl:max-w-full md:max-w-[40ch]">
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
                      ),
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
              <div className="space-y-2">
                <p className="uppercase text-sm mr-auto">
                  (Made with ❤️ and typescript)
                </p>
                <Link
                  href={github_frontend}
                  target="_blank"
                  className="uppercase text-sm block mr-auto underline-custom"
                >
                  Frontend code
                </Link>
                <Link
                  href={github_backend}
                  target="_blank"
                  className="uppercase text-sm block mr-auto underline-custom"
                >
                  Backend code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:container lg:mx-auto">
        {/* Grid is now mobile-first (1 column) and switches to 6 columns on medium screens up */}
        <div className="grid grid-cols-1 md:grid-cols-6 p-4 md:p-10 gap-4">
          {/* 1. Full Width Video Block */}
          <div
            className="col-span-1 md:col-span-6 p-4 md:p-10 rounded-sm shadow-sm"
            style={{ backgroundColor: color }}
          >
            <LazyVideo
              src={videos["full-demo"].webm}
              altSrc={videos["full-demo"].mp4}
              poster={videos["full-demo"].poster}
              priority={true}
              className="w-full mx-auto aspect-16/11 rounded-md bg-black/10 object-cover"
            />
          </div>

          {/* 2. Category Image Block */}
          <div className="col-span-1 md:col-span-3">
            {/* Wrapper matching the image's 400x400 1:1 aspect ratio */}
            <div className="relative w-full aspect-square bg-gray-100 rounded-sm overflow-hidden">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={images.image_1}
                alt="PlantLife Categories"
                className="object-cover"
              />
            </div>
          </div>

          {/* 3. Checkout Image Block */}
          <div className="col-span-1 md:col-span-3">
            <div className="relative w-full aspect-square bg-gray-100 rounded-sm overflow-hidden">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                src={images.image_2}
                alt="PlantLife Checkout"
                className="object-cover"
              />
            </div>
          </div>

          {/* 4. Mini Demo Video 1 */}
          {Array.from({ length: 3 }, (_, i) => {
            // Calculate the correct key name dynamically (demo_1, demo_2, demo_3)
            const videoKey = `demo_${i + 1}` as keyof typeof videos;
            const videoData = videos[videoKey];

            // 1. ADDED EXPLICIT RETURN
            return (
              <div
                key={videoKey} // Always provide a unique key when mapping in React
                className="col-span-1 md:col-span-2 p-6 md:p-10 flex justify-center items-center rounded-sm"
                style={{ backgroundColor: color }}
              >
                <div className="w-full max-w-[380px]">
                  <LazyVideo
                    autoPlay
                    muted
                    loop
                    src={videoData.webm}
                    altSrc={videoData.mp4}
                    poster={videoData.poster}
                    className="w-full aspect-9/16 rounded-xl bg-black/10 object-cover shadow-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default PlantLifePage;
