"use client";
import { useState, useRef } from "react";
import { Link } from "next-view-transitions"; // Ensure you have this installed
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import "./index.css"; // Import the minimal CSS file
import BouncingBall from "./BouncingBall";

gsap.registerPlugin(CustomEase);

// Custom easing curve
CustomEase.create(
  "hop",
  "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
);
const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsMenuOpen((prev) => !prev);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onStart: () => setIsAnimating(true),
        onComplete: () => setIsAnimating(false),
      });

      if (isMenuOpen) {
        // OPEN ANIMATION
        tl.to(".menu", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.25,
          ease: "hop",
          onComplete: () => {
            tl.set(".menu", {
              pointerEvents: "all",
            });
          },
        })
          .to(
            ".menu-logo-link",
            { y: 0, opacity: 1, duration: 0.5, ease: "power4.out" },
            "-=0.75"
          )
          .to(
            ".nav-link",
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.75"
          )
          .to(
            ".social-item",
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.75"
          )
          .to(
            ".hero-text-char",
            {
              y: 0,
              rotateY: 0,
              scale: 1,
              stagger: 0.03,
              duration: 0.5,
              ease: "power4.out",
            },
            "-=0.75"
          );
      } else {
        // CLOSE ANIMATION
        tl.to(".menu", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "hop",
          pointerEvents: "none", // Disable clicks when closing/closed
          onComplete: () => {
            // Reset elements for next open
            gsap.set(".menu", {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
            gsap.set(".nav-link", { y: 30, opacity: 0 });
            gsap.set(".menu-logo-link", { y: -30, opacity: 0 });
            gsap.set(".social-item", { y: 30, opacity: 0 });
            gsap.set(".hero-text-char", { y: 200, rotateY: 90, scale: 0.5 });
            setIsAnimating(false);
          },
        });
      }
    },
    { scope: container, dependencies: [isMenuOpen] }
  );
  console.log(isMenuOpen);
  return (
    <div ref={container}>
      {/* Floating Logo */}
      <div className="absolute top-8 left-8 z-50">
        <Link
          href="/"
          className="fixed text-black text-3xl font-light uppercase tracking-wide mix-blend-difference"
        >
          Ratul
        </Link>
      </div>

      {/* Menu Toggle Button */}
      <div
        onClick={toggleMenu}
        className={`fixed top-8 right-8 z-200 h-[60px] cursor-pointer bg-[#0f0f0f] rounded-full transition-all duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)] flex items-center justify-end overflow-hidden
          ${isMenuOpen ? "w-[60px]" : "w-[120px] group"}`}
      >
        <div
          className={`absolute left-5 text-white font-medium text-xs uppercase transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : "opacity-100 group-hover:left-1 "
          }`}
        >
          Menu
        </div>

        {/* Toggle Icon Circle */}
        <div
          className={`relative w-[60px] h-[60px] flex items-center justify-center rounded-full bg-[#6a994e] transition-all duration-500 z-10 
          ${
            isMenuOpen
              ? "scale-90 bg-[#da2c38]"
              : "scale-100 group-hover:scale-110"
          }`}
        >
          {/* Hamburger Bars */}
          <div className="relative w-[18px] h-[12px] flex flex-col justify-between">
            <div
              className={`w-full h-[2px] bg-black transition-transform duration-300 
              ${isMenuOpen ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <div
              className={`w-full h-[2px] bg-black transition-transform duration-300 
              ${isMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </div>
        </div>
      </div>

      {/* Full Screen Menu */}
      <div className="menu fixed top-0 left-0 w-screen h-screen bg-[#0f0f0f] text-white z-100 flex flex-col lg:flex-row clip-path-start pointer-events-none p-8 lg:p-16 overflow-hidden">
        {/* Column 1: Navigation */}
        <div className="flex-1 flex flex-col justify-between items-start h-full">
          <div className="menu-logo-link opacity-0 -translate-y-[30px]">
            <Link
              href="/"
              onClick={toggleMenu}
              className="text-5xl font-light uppercase tracking-tighter"
            >
              Ratul
            </Link>
          </div>

          <div className="flex flex-col gap-4 mt-20 lg:mt-0">
            {["About", "Projects", "Contact"].map((item, idx) => (
              <div key={idx} className="overflow-hidden">
                <div className="nav-link opacity-0 translate-y-[30px]">
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={toggleMenu} // Close menu on click so view transition is visible
                    className="text-6xl lg:text-[5rem] font-light leading-[1.1] tracking-tight hover:text-[#cda272] transition-colors"
                  >
                    {item}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <BouncingBall />
          </div>
        </div>

        {/* Column 2: Info & Big Text */}
        <div className="flex-1 flex flex-col justify-between lg:items-end mt-12 lg:mt-16">
          {/* Socials / Contact Info */}
          <div className="flex flex-col sm:flex-row gap-12 text-sm font-normal uppercase tracking-wide text-gray-400">
            <div className="flex flex-col gap-2">
              <p className="social-item opacity-0 translate-y-[30px] text-white font-medium mb-2">
                Location
              </p>
              <p className="social-item opacity-0 translate-y-[30px]">Dhaka</p>
              <p className="social-item opacity-0 translate-y-[30px]">
                Bangladesh
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="social-item opacity-0 translate-y-[30px] text-white font-medium mb-2">
                Socials
              </p>
              <a
                href="https://linkedin.com/in/ratul0407"
                target="_blank"
                className="social-item opacity-0 translate-y-[30px] hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/ratul0407"
                target="_blank"
                className="social-item opacity-0 translate-y-[30px] hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Big Hero Text with Split Animation */}
          <div className="mt-12 lg:mt-0 overflow-hidden select-none">
            <h1 className="text-[14vw] leading-[0.8] font-bold uppercase tracking-tighter text-[#1a1a1a] lg:text-white lg:mix-blend-overlay opacity-90">
              {"RATUL".split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-text-char inline-block origin-bottom"
                  style={{
                    transform: "translateY(200px) rotateY(90deg) scale(0.5)",
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
