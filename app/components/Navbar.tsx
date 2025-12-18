// "use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Link } from "next-view-transitions";
import { useRef } from "react";

// gsap.registerPlugin(SplitText);
const Navbar = () => {
  //   const nameRef = useRef(null);
  //   useGSAP(() => {
  //     const name = nameRef.current;
  //     if (name) {
  //       const nameChars = SplitText.create(name, {
  //         type: "chars",
  //       });

  //     }

  //   });

  return (
    <nav>
      <ul className="space-x-5 p-10 flex items-center justify-between uppercase text-sm">
        {/* Simply use the Link component */}
        <Link href="/">
          <div className="hover:translate-x-10">Ratul</div>
        </Link>
        <div className="space-x-5">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
