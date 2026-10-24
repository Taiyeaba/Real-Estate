import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useSmoothScroll
 * Integrates Lenis smooth scrolling synchronized with GSAP ScrollTrigger.
 * Features:
 * - Exponential luxury easing for fluid, physics-based glide
 * - Unified single animation frame loop (gsap.ticker + lenis.raf)
 * - Safe StrictMode and route unmount cleanup (prevents duplicate RAFs/leaks)
 * - Respects prefers-reduced-motion
 * - Native touch handling & anchor link preservation
 */
export const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      // Don't initialize smooth scrolling if user requested reduced motion
      return;
    }

    // Initialize Lenis with fine-tuned luxury parameters
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Synchronize GSAP ticker with Lenis requestAnimationFrame (single unified loop)
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Initial recalculation once DOM mounts
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;
