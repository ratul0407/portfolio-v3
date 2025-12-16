// components/ScrollSync.js (App Router Version)
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

// Disable native scroll restoration globally
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export function ScrollSync() {
  const lenis = useLenis();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    if (!lenis) return;

    // This runs every time the path changes (navigation happens)
    // The key is to force an immediate scroll reset to the top (0)
    // to ensure the View Transition starts from a consistent state.
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]); // Dependency on pathname ensures it runs on every page change

  return null;
}
