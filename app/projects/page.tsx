"use client";
import Image from "next/image";
import ParcelImg from "../assets/parcel-demo.png";
import parcelPhone from "../assets/parcel-phone.png";
import PlantLifeDesktop from "../assets/plantlife-desktop.png";
import PlantLifeMobile from "../assets/plantlife-mobile.png";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../utils/slideInOut";
import { useRouter } from "next/navigation";

const projects = [
  {
    name: "Plantlife",
    phoneImage: PlantLifeMobile,
    desktopImage: PlantLifeDesktop,
    link: "/projects/plantlife",
    color: "#6a994e",
  },
  {
    name: "Eparcel",
    phoneImage: parcelPhone,
    desktopImage: ParcelImg,
    link: "/projects/eparcel",
    color: "#da2c38",
  },
];
const ParcelPage = () => {
  const router = useTransitionRouter();
  const prefetchRouter = useRouter();
  return (
    <>
      {/* <section className="min-h-screen w-full p-6 md:p-10 text-gray-900"> */}
      <div className="custom-container mx-auto">
        {projects.map((project, index) => {
          return (
            <section
              className="min-h-screen w-full p-6 md:p-10 text-gray-900 flex flex-col justify-center"
              key={index}
            >
              {/* Container Wrapper */}
              <div className="mx-auto w-full max-w-[1600px]">
                {/* Header Row */}
                <div
                  className="flex w-full items-baseline justify-between pb-6 text-sm tracking-wide uppercase md:text-base"
                  onMouseEnter={() => prefetchRouter.prefetch(project.link)}
                >
                  <div className="flex gap-18">
                    <span>0{index + 1}.</span>
                    <h1>{project.name.toUpperCase()}</h1>
                  </div>

                  <Link
                    href={project.link}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(project.link, {
                        onTransitionReady: slideInOut,
                      });
                    }}
                    className="underline-custom"
                  >
                    SEE PROJECT
                  </Link>
                </div>

                {/* Responsive Images Layout Container */}
                <div
                  className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 items-stretch"
                  onMouseEnter={() => prefetchRouter.prefetch(project.link)}
                >
                  {/* Desktop View Column (Dictates the row height on desktop screens) */}
                  <div
                    style={{ backgroundColor: project.color }}
                    className="lg:col-span-2 flex items-center justify-center p-6 sm:p-12 rounded-sm shadow-xl aspect-video w-full"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        id="parcel-img"
                        src={project.desktopImage}
                        alt="Desktop View"
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-contain rounded-sm drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>

                  {/* Mobile View Column (Perfectly stretches to match Desktop height) */}
                  <div
                    style={{ backgroundColor: project.color }}
                    className="lg:col-span-1 flex items-center justify-center p-6 sm:p-12 rounded-sm shadow-xl h-[400px] lg:h-auto"
                  >
                    {/* The phone container uses a percentage height (85%) so it never pushes the parent block's height */}
                    <div className="relative h-full aspect-12/20">
                      <Image
                        src={project.phoneImage}
                        alt="Mobile View"
                        fill
                        sizes="(max-width: 1024px) 70vw, 44vw"
                        className="object-contain rounded-xl drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      {/* 1. Header Section */}
      {/* <div
          className="flex w-full items-baseline justify-between pb-6 text-sm tracking-wide uppercase md:text-base"
          onMouseEnter={() => prefetchRouter.prefetch("/projects/plantlife")}
        >
          <div className="flex gap-18">
            <span>01.</span>
            <h1>PLANTLIFE</h1>
          </div>

          <Link
            href="/projects/plantlife"
            onClick={(e) => {
              e.preventDefault();
              router.push("/projects/plantlife", {
                onTransitionReady: slideInOut,
              });
            }}
            className="hover:opacity-70 transition-opacity"
          >
            SEE PROJECT
          </Link>
        </div> */}

      {/* 2. Main Content Grid */}
      {/* <div
          className="flex h-auto w-full flex-col gap-5 lg:h-[500px] lg:flex-row lg:px-24"
          onMouseEnter={() => prefetchRouter.prefetch("/projects/eparcel")}
        >
          <div className="flex flex-2 items-center justify-center bg-[#6a994e] p-8 md:p-10">
            <div className="relative w-full">
              <Image
                id="parcel-img"
                src={PlantLifeDesktop}
                alt="Desktop View"
                width={1200}
                height={800}
                className="h-full w-full rounded-sm object-contain shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center bg-[#6a994e] px-8 md:p-10">
            <div className="relative h-full max-h-[600px] w-auto">
              <Image
                src={PlantLifeMobile}
                alt="Mobile View"
                width={300}
                height={800}
                className="h-auto max-h-[420px] w-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen w-full p-6 md:p-10 text-gray-900 flex items-center justify-center">
        <div> */}
      {/* 1. Header Section */}
      {/* <div className="flex w-full items-baseline justify-between pb-6 text-sm  tracking-wide uppercase md:text-base">
            <div className="flex gap-18">
              <span>02.</span>
              <h1>EPARCEL</h1>
            </div>
            <Link
              href="/projects/plantlife"
              onClick={(e) => {
                e.preventDefault();
                router.push("/projects/eparcel", {
                  onTransitionReady: slideInOut,
                });
              }}
              className="hover:opacity-70 transition-opacity"
            >
              SEE PROJECT
            </Link>
          </div> */}

      {/* 2. Main Content Grid */}
      {/* <div className="flex h-auto w-full flex-row gap-5 lg:h-[500px] lg:flex-row lg:px-24"> */}
      {/* Left Container (Desktop View) - Takes up roughly 66% width */}
      {/* <div className="flex flex-2 items-center justify-center bg-[#da2c38] p-4 md:p-10">
              <div className="relative w-full">
                <Image
                  id="parcel-img"
                  src={ParcelImg}
                  alt="Desktop View"
                  width={1200}
                  height={800}
                  className="h-full w-full rounded-sm object-contain"
                  priority
                />
              </div>
            </div> */}

      {/* Right Container (Mobile View) - Takes up roughly 33% width */}
      {/* <div className="flex flex-1 items-center justify-center bg-[#da2c38] px-8 md:p-10">
              <div className="relative h-full max-h-[600px] w-auto">
                <Image
                  src={parcelPhone}
                  alt="Mobile View"
                  width={300}
                  height={800}
                  className="h-auto max-h-[420px] w-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ParcelPage;
