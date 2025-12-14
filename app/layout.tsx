import type { Metadata } from "next";

import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "./components/Navbar";
import { ReactLenis } from "./utils/lenis";
import FollowMouse from "./components/shared/FollowMouse";
import localFont from "next/font/local";
import Menu from "./components/Menu/Menu";
const canela = localFont({
  src: [
    {
      path: "./font/local/Canela-Thin-Trial.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font/local/Canela-Light-Trial.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/local/Canela-Regular-Trial.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/local/Canela-Medium-Trial.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/local/Canela-Bold-Trial.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-canela",
});
const ppNeueMontreal = localFont({
  src: [
    {
      path: "./font/local/montreal/ppneuemontreal-thin.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font/local/montreal/ppneuemontreal-medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/local/montreal/ppneuemontreal-book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/local/montreal/ppneuemontreal-bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font--ppNeueMontreal",
});
export const metadata: Metadata = {
  title: "Ratul's Portfolio",
  description: "Made with ❤️ and NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <ViewTransitions>
          <body
            className={`antialiased bg-white relative ${canela.variable} ${ppNeueMontreal.variable}`}
          >
            <div className="hidden lg:block">
              <FollowMouse />
            </div>
            {/* <ScrollProgress /> */}
            {/* <Navbar /> */}
            <Menu />
            <div className="pt-20">{children}</div>
          </body>
        </ViewTransitions>
      </ReactLenis>
    </html>
  );
}
