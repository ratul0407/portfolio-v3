"use client";
import Image from "next/image";
import ParcelImg from "../assets/parcel-demo.png";
import parcelPhone from "../assets/parcel-phone.png";
import PlantLifeDesktop from "../assets/plantlife-desktop.png";
import PlantLifeMobile from "../assets/plantlife-mobile.png";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { slideInOut } from "../utils/slideInOut";

const ParcelPage = () => {
  const router = useTransitionRouter();

  return (
    <>
      <section className="min-h-screen w-full p-6 md:p-10 text-gray-900">
        {/* 1. Header Section */}
        <div className="flex w-full items-baseline justify-between pb-6 text-sm  tracking-wide uppercase md:text-base">
          <div className="flex gap-18">
            <span>01.</span>
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
        </div>

        {/* 2. Main Content Grid */}
        <div className="flex h-auto w-full flex-col gap-5 lg:h-[500px] lg:flex-row lg:px-24">
          {/* Left Container (Desktop View) - Takes up roughly 66% width */}
          <div className="flex flex-2 items-center justify-center bg-[#da2c38] p-8 md:p-10">
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
          </div>

          {/* Right Container (Mobile View) - Takes up roughly 33% width */}
          <div className="flex flex-1 items-center justify-center bg-[#da2c38] px-8 md:p-10">
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
      </section>
      <section className="min-h-screen w-full p-6 md:p-10 text-gray-900">
        {/* 1. Header Section */}
        <div className="flex w-full items-baseline justify-between pb-6 text-sm tracking-wide uppercase md:text-base">
          <div className="flex gap-18">
            <span>02.</span>
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
        </div>

        {/* 2. Main Content Grid */}
        <div className="flex h-auto w-full flex-col gap-5 lg:h-[500px] lg:flex-row lg:px-24">
          {/* Left Container (Desktop View) - Takes up roughly 66% width */}
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

          {/* Right Container (Mobile View) - Takes up roughly 33% width */}
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
    </>
  );
};

export default ParcelPage;
