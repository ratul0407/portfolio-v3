"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
const technologies = {
  projects: ["PlantLife", "EParcel"],
  links: ["About", "projects"],
  contact: [
    {
      title: "resume",
      href: "https://drive.google.com/file/d/1gYDjVXZX55QXytaOKnXNF1eFmoJOHk3z/view?usp=sharing",
    },
    { title: "Github", href: "https://github.com/ratul0407" },
    {
      title: "Linkedin",
      href: "https://linkedin.com/in/ratul0407",
    },
    {
      title: "Email",
      href: "mailto:rajaulislamratul12@gmail.com",
    },
  ],
};
gsap.registerPlugin(SplitText);
const words = ["Hello", "কেমন আছেন", "こんにちは", "Ole", "Assalamualikum"];
const Home = () => {
  const [index, setIndex] = useState(0);
  const isLastWord = index === words.length - 1;
  const wordRef = useRef(null);

  useEffect(() => {
    if (isLastWord) return;

    const timer = setTimeout(
      () => {
        setIndex(index + 1);
      },

      400
    );

    return () => clearTimeout(timer);
  }, [index, isLastWord]);

  useGSAP(() => {
    if (isLastWord && wordRef.current) {
      const greeting = new SplitText(wordRef.current, {
        type: "chars",
        charsClass: "chars++",
      });

      const loaderTimeline = gsap.timeline({
        delay: 0.5, // Small delay after word appears
        defaults: {
          duration: 0.7,
        },
      });

      loaderTimeline
        .to(greeting.chars, {
          letterSpacing: "1em",
          ease: "expo.out",
          stagger: 0.08,
        })
        .to(".loader-left", {
          x: "100%",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          ".loader-right",
          {
            x: "-100%",
            duration: 1,
            ease: "power2.inOut",
          },
          "-=1"
        )
        .to(".loader", {
          display: "none",
          duration: 0,
        });

      return SplitText.create(".heading", {
        type: "lines",
        class: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          return gsap.from(self.lines, {
            yPercent: 100,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "cubic-bezier(0.55, 0, 1, 0.45)",
            delay: 3,
          });
        },
      });
    }
  }, [isLastWord]);

  return (
    <>
      <div className="loader min-h-screen grid items-center justify-center absolute inset-0 z-300 overflow-hidden">
        <div className="loader-left min-w-1/2 min-h-screen bg-black absolute top-0 right-0 z-300"></div>
        <div className="loader-right min-w-1/2 bg-black absolute top-0 left-0 z-300 min-h-screen"></div>
        <p
          ref={wordRef}
          className="text-base lg:text-5xl text-white tracking z-310 min-h-screen  flex text-center lg:items-center lg:justify-center"
        >
          {words[index]}
        </p>
      </div>

      <div className="p-10 overflow-hidden flex flex-col items-start min-h-screen justify-evenly ">
        <div className="items-center justify-center ">
          <h1 className="heading w-full text-3xl md:max-w-[20ch] font-light font-canela leading-tight lg:text-6xl lg:max-w-max lg:font-medium">
            Hi I am Ratul. A full Stack Developer from{" "}
            <span className="text-[#386641]">Bangladesh.</span> A programmer who
            loves to build things and learn new things.
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-start w-full mt-10 lg:mt-0">
          <div className="flex flex-col lg:flex-row items-start gap-20">
            <div className="text-sm space-y-4 uppercase">
              <p>(Projects)</p>
              <div className="space-y-1.5">
                {technologies.projects.map((item: string, index: number) => (
                  <Link
                    href={`/projects/${item.toLowerCase()}`}
                    className="block"
                    key={index}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-sm space-y-4 uppercase">
              <p>(links)</p>
              <div className="space-y-1.5">
                {technologies.links.map((item: string, index: number) => (
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="block"
                    key={index}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-sm space-y-4 uppercase">
              <p>(Contact)</p>
              <div className="space-y-1.5">
                {technologies.contact.map(({ title, href }, index: number) => (
                  <Link
                    href={`${href}`}
                    target="_blank"
                    className="block"
                    key={index}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="uppercase text-sm mr-auto">
              (Made with ❤️ and Nextjs)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
