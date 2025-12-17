"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";
const technologies = {
  projects: ["PlantLife", "EParcel"],
  links: ["About", "projects", "contact"],
};
gsap.registerPlugin(SplitText);
const Home = () => {
  const words = [
    "Hello",
    "welcome",
    "কেমন",
    "আছেন",
    "こんにちは",
    "Ole",
    "Assalamualikum",
  ];
  const [index, setIndex] = useState(0);
  const isLastWord = index === words.length - 1;
  const wordRef = useRef(null); // Ref for the paragraph element

  // --- 1. Word Cycling Logic (Moves to the next word) ---
  useEffect(() => {
    // Stop the cycle when the last word is reached
    if (isLastWord) return;

    // Set a timeout to transition to the next word
    const timer = setTimeout(
      () => {
        setIndex(index + 1);
      },
      // You can keep the 400ms delay for all
      400
    );

    // Cleanup function for the timeout
    return () => clearTimeout(timer);
  }, [index, isLastWord]);

  // --- 2. GSAP Animation Logic (Runs only on the last word) ---
  useGSAP(() => {
    let animationDone = false;
    if (isLastWord && wordRef.current) {
      // The element must exist before trying to split it
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
          // Changed transform to y, and duration to 1.5 for smoother transition
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
  }, [isLastWord]); // Reruns ONLY when isLastWord changes to true

  return (
    <>
      <div className="loader min-h-screen grid items-center justify-center absolute inset-0 z-300 overflow-hidden">
        <div className="loader-left min-w-1/2 min-h-screen bg-black absolute top-0 right-0 z-300"></div>
        <div className="loader-right min-w-1/2 bg-black absolute top-0 left-0 z-300 min-h-screen"></div>
        <p ref={wordRef} className="text-5xl text-white tracking z-310">
          {words[index]}
        </p>
      </div>
      <div className="p-10 overflow-hidden flex flex-col items-start min-h-screen justify-evenly ">
        <div className="items-center justify-center ">
          <h1 className="heading w-full text-5xl md:max-w-[20ch] font-light font-canela leading-tight lg:text-6xl lg:max-w-max lg:font-medium">
            Hi I am Ratul. A full Stack Developer from{" "}
            <span className="text-[#386641]">Bangladesh.</span> A programmer who
            loves to build things and learn new things.
          </h1>
        </div>
        <div className="flex justify-between items-start w-full">
          <div className="flex items-start gap-20">
            <div className="text-sm space-y-2 uppercase">
              <p>(Projects)</p>
              <div>
                {technologies.projects.map((item: string, index: number) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
            <div className="text-sm space-y-2 uppercase">
              <p>(links)</p>
              <div>
                {technologies.links.map((item: string, index: number) => (
                  <p key={index}>{item}</p>
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
