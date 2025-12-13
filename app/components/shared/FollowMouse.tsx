"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
const FollowMouse = () => {
  const dotRef = useRef<null | HTMLDivElement>(null);
  useGSAP(() => {
    function onMouseMove(e: any) {
      const x = e.clientX;
      const y = e.clientY;
      const blackDot = dotRef.current;
      const rect = (blackDot as HTMLDivElement).getBoundingClientRect();

      const offsetX = rect.width / 2;
      const offsetY = rect.height / 2;
      // Animate badge position with GSAP for smooth movement
      gsap.to(".black-dot", {
        x: x - offsetX,
        y: y - offsetY,
        duration: 0.3,
        ease: "power3.out",
      });
    }

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <div
      ref={dotRef}
      className="black-dot w-3 h-3 pointer-events-none rounded-full bg-white mix-blend-difference z-200 fixed top-0 left-0 translate-x-0 translate-y-0"
    ></div>
  );
};
export default FollowMouse;
