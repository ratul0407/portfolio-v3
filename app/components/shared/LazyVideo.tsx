"use client";

import { useEffect, useRef, useState } from "react";

interface ILazyVideoProps {
  src: string;
  altSrc: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  priority?: boolean;
}

const LazyVideo = ({
  src,
  altSrc,
  poster,
  className,
  autoPlay = true, // Default to true for your project showcase setup
  muted = true, // Autoplay requires muted
  loop = true,
  priority,
}: ILazyVideoProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // Loads the video when it gets within 200px of view
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // If we shouldn't load yet, render an empty div matching the video box
  // to reserve space and hold the observer target.
  if (!shouldLoad) {
    return (
      <div
        ref={videoRef}
        className={`${className} bg-black/10`}
        style={{
          backgroundImage: poster ? `url(${poster})` : "none",
          backgroundSize: "cover",
        }}
      />
    );
  }

  // Once shouldLoad is true, we mount the video tag with the actual sources
  return (
    <video
      className={className}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      preload={priority ? "auto" : "metadata"}
    >
      <source src={src} type="video/webm" />
      <source src={altSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
