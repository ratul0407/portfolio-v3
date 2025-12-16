"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);
const Home = () => {
  useGSAP(() => {
    return SplitText.create(".heading", {
      type: "lines",
      class: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.lines, {
          yPercent: 100,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "expo.out",
          delay: 0.4,
        });
      },
    });
  }, []);
  return (
    <>
      <div className="p-10">
        <h1 className="heading w-full text-5xl md:max-w-[20ch] font-light font-canela leading-tight">
          Hi I am Ratul. A full Stack Developer from{" "}
          <span className="text-[#386641]">
            Bangladesh. <br />
          </span>{" "}
          A programmer who loves to build things and learn new things.
        </h1>
      </div>
    </>
  );
};
export default Home;
