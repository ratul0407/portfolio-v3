"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const words = [
  "Hello",
  "welcome",
  "কেমন",
  "আছেন",
  "こんにちは",
  "Ole",
  "Assalamualikum",
];

export default function Loader() {
  const [showLoader, setShowLoader] = useState(false);
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLParagraphElement | null>(null);

  const isLastWord = index === words.length - 1;

  // ✅ Check sessionStorage ONCE
  useEffect(() => {
    if (typeof window === "undefined") return;

    const played = sessionStorage.getItem("loaderPlayed");
    if (!played) {
      setShowLoader(true);
    }
  }, []);

  // word cycling
  useEffect(() => {
    if (!showLoader || isLastWord) return;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [index, isLastWord, showLoader]);

  // GSAP animation
  useEffect(() => {
    if (!showLoader || !isLastWord || !wordRef.current) return;

    const split = new SplitText(wordRef.current, { type: "chars" });

    const tl = gsap.timeline({
      delay: 0.5,
      defaults: { duration: 0.7 },
      onComplete: () => {
        sessionStorage.setItem("loaderPlayed", "true");
        setShowLoader(false);
      },
    });

    tl.to(split.chars, {
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
      );

    return () => {
      split.revert();
      tl.kill();
    };
  }, [isLastWord, showLoader]);

  // ❌ Don’t render if already played
  if (!showLoader) return null;

  return (
    <div className="loader fixed inset-0 z-[300] grid place-items-center bg-black overflow-hidden">
      <div className="loader-left absolute right-0 top-0 h-full w-1/2 bg-black" />
      <div className="loader-right absolute left-0 top-0 h-full w-1/2 bg-black" />

      <p ref={wordRef} className="text-5xl text-white z-[310]">
        {words[index]}
      </p>
    </div>
  );
}
