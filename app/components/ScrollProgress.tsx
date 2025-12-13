"use client"; // Required if you are using Next.js App Router

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  // Ref for the percentage text element
  const percentageRef = useRef(null);

  useEffect(() => {
    const percentageText = percentageRef.current;

    if (!percentageText) return;

    // 2. Create the ScrollTrigger animation
    ScrollTrigger.create({
      // Set the trigger to the entire document scroll
      trigger: "body",
      start: "top top", // Start tracking when the top of the body hits the top of the viewport
      end: "bottom bottom", // End tracking when the bottom of the body hits the bottom of the viewport
      scrub: true, // Smoothly link the animation progress to the scroll position

      // 3. Define the animation logic
      onUpdate: (self) => {
        // self.progress is a value between 0 (start) and 1 (end)
        const progressPercentage = Math.round(self.progress * 100);

        // Update the percentage text
        (
          percentageText as { textContent: string }
        ).textContent = `${progressPercentage}%`;
      },
    });

    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []); // Empty dependency array ensures this runs once after mount

  return (
    // The main container is fixed at the top of the screen
    <div className="fixed bottom-0  right-10 z-50">
      {/* Percentage Display */}
      <div
        ref={percentageRef}
        className="w-10 h-10 text-4xl text-right pr-2  text-black"
      >
        0%
      </div>
    </div>
  );
}
