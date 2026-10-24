import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Building2,
  TrendingUp,
  KeyRound,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";
import PropertyCard from "../components/PropertyCard";
import PropertySearch from "../components/PropertySearch";
import Loader from "../shared/Loader";
import { siteConfig } from "../data/siteConfig";
import useAxios from "../hooks/useAxios";
import useSmoothScroll from "../hooks/useSmoothScroll";

import houseOrangeModern from "../assets/house_orange_modern.png";
import houseWhiteFinal from "../assets/house_white_final.png";
import houseBlueVilla from "../assets/house_blue_villa.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ongoingProjects = [
  {
    id: "ongoing-1",
    title: "Sobha Heartland II Villas",
    category: "RESIDENTIAL",
    location: "Palm Jumeirah, Dubai",
    image: houseOrangeModern,
    status: "IN PROGRESS",
    quarter: "Q4 2025",
    type: "5 Beds",
    baths: "6 Baths",
    area: "8,500 SqFt",
    floors: "3 Floors",
    progress: 65,
  },
  {
    id: "ongoing-2",
    title: "Sobha Heartland II Villas",
    category: "RESIDENTIAL",
    location: "Downtown Dubai, UAE",
    image: houseWhiteFinal,
    status: "IN PROGRESS",
    quarter: "Q2 2026",
    type: "3 Beds",
    baths: "4 Baths",
    area: "4,200 SqFt",
    floors: "2 Floors",
    progress: 48,
  },
  {
    id: "ongoing-3",
    title: "Sobha Heartland II Villas",
    category: "COMMERCIAL",
    location: "Business Bay, Dubai",
    image: houseBlueVilla,
    status: "IN PROGRESS",
    quarter: "Q1 2025",
    type: "Office",
    baths: "Washrooms",
    area: "50k SqFt",
    floors: "12 Floors",
    progress: 77,
  },
];

const fallbackCompletedProperties = [
  {
    _id: "comp-1",
    title: "The Solarium Waterfront Sanctuary",
    description:
      "A milestone achievement in sculptural architecture, this glass-sheathed waterfront estate captures panoramic views with floating pavilions, private marina, zero-edge reflection pool, and bespoke Italian travertine finishes throughout.",
    category: "Waterfront Estate",
    location: "Palm Jumeirah, Dubai",
    price: 18500000,
    bedrooms: 6,
    bathrooms: 8,
    area: 12400,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85",
    ],
    handoverDate: "Completed Q4 2024",
    architect: "Studio Havenstone Architects",
  },
  {
    _id: "comp-2",
    title: "The Bel-Air Skyline Penthouse",
    description:
      "Towering high above the horizon, this bespoke dual-level sky residence merges curated bronze finishes, double-height gallery walls, cantilevered heated infinity spa, and full smart-home automation with 360-degree metropolitan vistas.",
    category: "Sky Penthouse",
    location: "Downtown Boulevard, UAE",
    price: 14200000,
    bedrooms: 5,
    bathrooms: 6,
    area: 9800,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    ],
    handoverDate: "Completed Q1 2025",
    architect: "Havenstone Atelier",
  },
];

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [activeCompletedIndex, setActiveCompletedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll();

  // Animation Refs
  const homeContainerRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroPreviewRef = useRef(null);
  const heroSearchRef = useRef(null);
  const heroTrustRef = useRef(null);

  const featuredSectionRef = useRef(null);
  const featuredHeadingRef = useRef(null);
  const featuredGridRef = useRef(null);

  // Ongoing & Completed Projects Refs
  const ongoingSectionRef = useRef(null);
  const ongoingHeadingRef = useRef(null);
  const ongoingCardsRef = useRef(null);

  const completedSectionRef = useRef(null);
  const completedContentRef = useRef(null);
  const completedImageRef = useRef(null);

  const categoriesSectionRef = useRef(null);
  const categoriesHeadingRef = useRef(null);
  const categoryGridRef = useRef(null);

  const whyChooseUsSectionRef = useRef(null);
  const whyChooseHeadingRef = useRef(null);
  const whyChooseGridRef = useRef(null);
  const statsBarRef = useRef(null);

  const contactCtaSectionRef = useRef(null);
  const contactCtaContentRef = useRef(null);

  // Fetch properties from MongoDB via Express API
  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("/properties")
      .then((res) => {
        if (isMounted) {
          const data = res.data;
          if (Array.isArray(data) && data.length > 0) {
            setAllProperties(data);
            const featured = data.filter((p) => p.featured);
            setFeaturedProperties(featured.length > 0 ? featured : data.slice(0, 6));
          } else {
            setAllProperties([]);
            setFeaturedProperties([]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Backend error fetching properties:", err.message);
        if (isMounted) {
          setAllProperties([]);
          setFeaturedProperties([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  // Compute the last 2 properties from MongoDB (fallback to luxury mock if empty)
  const completedProjects =
    allProperties.length >= 2
      ? allProperties.slice(-2)
      : allProperties.length === 1
      ? [allProperties[0], fallbackCompletedProperties[1]]
      : fallbackCompletedProperties;

  const currentCompleted =
    completedProjects[activeCompletedIndex % completedProjects.length] || completedProjects[0];
  const nextCompletedIndex = (activeCompletedIndex + 1) % completedProjects.length;
  const nextCompleted = completedProjects[nextCompletedIndex] || completedProjects[0];

  // Handle URL hash smooth scrolling on mount / navigation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  // Line-by-line staggered animation for completed project text elements and image transition
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (completedContentRef.current) {
      const items = completedContentRef.current.querySelectorAll(".completed-anim-item");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      }
    }

    if (completedImageRef.current) {
      gsap.fromTo(
        completedImageRef.current,
        { opacity: 0.45, scale: 1.04 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
        }
      );
    }
  }, [activeCompletedIndex]);

  // GSAP Animations and ScrollTriggers
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. HERO SECTION ENTRANCE & PARALLAX
      if (heroRef.current) {
        // Hero background image subtle parallax scrub
        if (heroBgRef.current) {
          gsap.to(heroBgRef.current, {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        // Hero content entrance timeline
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (heroBadgeRef.current) {
          heroTl.fromTo(
            heroBadgeRef.current,
            { opacity: 0, x: -25 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.1 }
          );
        }

        if (heroTitleRef.current) {
          heroTl.fromTo(
            heroTitleRef.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.95 },
            "-=0.6"
          );
        }

        if (heroSubtitleRef.current) {
          heroTl.fromTo(
            heroSubtitleRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.7"
          );
        }

        if (heroCtaRef.current) {
          heroTl.fromTo(
            heroCtaRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75 },
            "-=0.6"
          );
        }

        if (heroPreviewRef.current) {
          heroTl.fromTo(
            heroPreviewRef.current,
            { opacity: 0, x: 30, scale: 0.96 },
            { opacity: 1, x: 0, scale: 1, duration: 0.9 },
            "-=0.7"
          );
        }

        if (heroSearchRef.current) {
          heroTl.fromTo(
            heroSearchRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.85 },
            "-=0.5"
          );
        }

        if (heroTrustRef.current) {
          heroTl.fromTo(
            heroTrustRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.75 },
            "-=0.4"
          );
        }
      }

      // 2. FEATURED PROPERTIES SECTION
      if (featuredSectionRef.current) {
        if (featuredHeadingRef.current) {
          gsap.fromTo(
            featuredHeadingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: featuredHeadingRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (featuredGridRef.current && featuredGridRef.current.children.length > 0) {
          gsap.fromTo(
            featuredGridRef.current.children,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: featuredGridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 2.5 ONGOING PROJECTS SECTION ENTRANCE & PROGRESS BARS
      if (ongoingSectionRef.current) {
        if (ongoingHeadingRef.current) {
          gsap.fromTo(
            ongoingHeadingRef.current,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ongoingHeadingRef.current,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (ongoingCardsRef.current && ongoingCardsRef.current.children.length > 0) {
          const cards = Array.from(ongoingCardsRef.current.children);
          gsap.fromTo(
            cards,
            { opacity: 0, y: 55, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.16,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ongoingCardsRef.current,
                start: "top 83%",
                toggleActions: "play none none none",
              },
            }
          );

          // Animate progress bars from 0% to target percentage
          const progressBars = ongoingCardsRef.current.querySelectorAll(".ongoing-progress-bar");
          if (progressBars.length > 0) {
            gsap.fromTo(
              progressBars,
              { width: "0%" },
              {
                width: (i, target) => `${target.getAttribute("data-progress")}%`,
                duration: 1.3,
                ease: "power2.out",
                delay: 0.35,
                scrollTrigger: {
                  trigger: ongoingCardsRef.current,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      }

      // 2.6 RECENTLY COMPLETED PROJECTS SECTION ENTRANCE
      if (completedSectionRef.current) {
        gsap.fromTo(
          completedSectionRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: completedSectionRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. PROPERTY CATEGORIES SECTION (Cinematic Scroll-triggered entrance sequence)
      if (categoriesSectionRef.current) {
        // 1. Heading and description smoothly reveal when approaching viewport
        if (categoriesHeadingRef.current) {
          gsap.fromTo(
            categoriesHeadingRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: categoriesHeadingRef.current,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // 2 & 3. Coordinated cards upward stagger & cinematic image clip-path with zoom-out
        // Triggered precisely when the CARDS GRID itself enters the user's viewport
        if (categoryGridRef.current && categoryGridRef.current.children.length > 0) {
          const cards = Array.from(categoryGridRef.current.children);
          const images = cards
            .map((card) => card.querySelector("img"))
            .filter(Boolean);

          // Temporarily disable CSS transitions on images so GSAP scale does not conflict
          images.forEach((img) => {
            img.style.transition = "none";
          });

          const cardsTl = gsap.timeline({
            scrollTrigger: {
              trigger: categoryGridRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });

          // 2. The four existing cards enter one after another with smooth upward momentum
          cardsTl.fromTo(
            cards,
            {
              opacity: 0,
              y: 70,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              stagger: 0.16,
              ease: "power3.out",
              clearProps: "opacity,transform",
            }
          );

          // 3. Each card's image reveals with a cinematic clip-path effect and subtle zoom-out
          if (images.length > 0) {
            cardsTl.fromTo(
              images,
              {
                clipPath: "inset(0% 0% 100% 0%)",
                scale: 1.25,
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 1.15,
                stagger: 0.16,
                ease: "power3.inOut",
                onComplete: () => {
                  // Restore natural CSS hover transitions and clean up inline styles
                  images.forEach((img) => {
                    gsap.set(img, { clearProps: "clipPath,scale,transform" });
                    img.style.transition = "";
                  });
                },
              },
              "<+=0.06"
            );
          }
        }
      }




      // 4. WHY CHOOSE US / VALUE PROPOSITION
      if (whyChooseUsSectionRef.current) {
        if (whyChooseHeadingRef.current) {
          gsap.fromTo(
            whyChooseHeadingRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: whyChooseHeadingRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (whyChooseGridRef.current && whyChooseGridRef.current.children.length > 0) {
          gsap.fromTo(
            whyChooseGridRef.current.children,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: whyChooseGridRef.current,
                start: "top 84%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (statsBarRef.current) {
          gsap.fromTo(
            statsBarRef.current,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statsBarRef.current,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // 5. CONTACT CTA SECTION
      if (contactCtaSectionRef.current && contactCtaContentRef.current) {
        gsap.fromTo(
          contactCtaContentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactCtaContentRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, homeContainerRef);

    // Refresh ScrollTrigger calculations after initial layout renders
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, [loading, featuredProperties]);

  return (
    <div ref={homeContainerRef} className="flex flex-col min-h-screen overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-14 xl:px-20 overflow-hidden bg-[#071312]"
      >
        {/* Architectural Background Image with Smooth Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            ref={heroBgRef}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2600&q=90"
            alt="Havenstone Modern Glass Architecture at Twilight"
            className="w-full h-[125%] -top-[12%] absolute inset-0 object-cover object-center scale-105 will-change-transform"
          />

          {/* Cinematic Multi-layered Atmosphere Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071312]/95 via-[#071312]/75 lg:via-[#071312]/60 to-[#071312]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071312]/90 via-transparent to-[#071312]" />
          <div className="absolute right-10 sm:right-1/4 top-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#B87556]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Delicate Architectural Golden Frame SVG Motif */}
        <div className="absolute right-0 top-24 bottom-24 w-1/2 pointer-events-none hidden lg:block overflow-hidden z-[2] opacity-40">
          <svg className="w-full h-full" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 50 0 C 150 250, 200 450, 50 800"
              stroke="url(#champagneGoldGrad)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle cx="50" cy="400" r="4" fill="#C5A46D" />
            <line x1="50" y1="400" x2="350" y2="400" stroke="url(#champagneGoldGrad)" strokeWidth="0.75" strokeDasharray="3 4" />
            <defs>
              <linearGradient id="champagneGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C5A46D" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#B87556" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F5E6D3" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Asymmetrical Editorial Body: Left Editorial + Right Architectural Showcase */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center flex-1 my-auto">

          {/* Left Editorial Section */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Overline with copper architectural indicator */}
            <div
              ref={heroBadgeRef}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-[#C5A46D] to-transparent" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A46D]">
                The Havenstone Collection • Private Estates
              </span>
            </div>

            {/* Editorial Headline */}
            <h1
              ref={heroTitleRef}
              className="font-serif text-4xl sm:text-6xl lg:text-[70px] xl:text-[82px] text-white font-normal leading-[1.06] tracking-tight"
            >
              Your Next Chapter <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#E5D2B8] to-[#C5A46D]">
                Starts Here.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              ref={heroSubtitleRef}
              className="mt-6 text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed font-light"
            >
              Havenstone Realty represents an uncompromising global portfolio of architecturally distinguished residences, skyline penthouses, and private coastal promontories.
            </p>

            {/* CTAs */}
            <div
              ref={heroCtaRef}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link
                to="/properties"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 sm:py-4 bg-gradient-to-r from-[#B87556] to-[#9E5F43] hover:from-[#C5A46D] hover:to-[#B87556] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl shadow-black/50 hover:shadow-[#B87556]/20 border border-[#C5A46D]/40"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300 hover:text-[#C5A46D] transition-colors py-3"
              >
                <span>Schedule Private Advisory</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right Architectural Showcase: Floating Monograph Card */}
          <div
            ref={heroPreviewRef}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-end lg:items-end"
          >
            <div className="w-full max-w-sm bg-[#081514]/80 backdrop-blur-xl border border-white/15 p-6 rounded-none shadow-2xl relative overflow-hidden group">
              {/* Subtle top copper accent border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A46D] via-[#B87556] to-transparent" />

              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
                <span className="flex items-center gap-2 text-[#C5A46D] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D] animate-ping" />
                  Featured Provenance
                </span>
                <span>№ 104 • BEL-AIR</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                The Promontory Glass Residence
              </h3>
              <p className="text-xs text-neutral-400 mb-4 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B87556]" />
                Bel Air Crest, Los Angeles, CA
              </p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-neutral-300 text-xs mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">Bedrooms</div>
                  <div className="font-semibold text-white mt-0.5">6 Beds</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">Bathrooms</div>
                  <div className="font-semibold text-white mt-0.5">8 Baths</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400">Interior</div>
                  <div className="font-semibold text-white mt-0.5">14,500 SQFT</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Acquisition Valuation</span>
                  <span className="font-serif text-lg text-[#F5E6D3] font-semibold tracking-wide">$28,500,000 USD</span>
                </div>
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#C5A46D] hover:text-white transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Section: Slim Dark Translucent Search Bar + Trust Indicators */}
        <div className="relative z-10 w-full mt-10 sm:mt-12">
          <div ref={heroSearchRef} className="w-full mb-6">
            <PropertySearch />
          </div>

          {/* Discreet Luxury Trust Indicators */}
          <div
            ref={heroTrustRef}
            className="max-w-5xl mx-auto w-full pt-4 border-t border-white/10 hidden sm:flex items-center justify-between text-center text-[11px] sm:text-xs text-neutral-400 tracking-wider uppercase"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>Strict Client Confidentiality & NDAs</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C5A46D]" />
              <span>Vetted Architectural Provenance</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C5A46D]" />
              <span>Prime Global Urban & Coastal Enclaves</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES SECTION */}
      <section
        ref={featuredSectionRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div
          ref={featuredHeadingRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <SectionHeading
            align="left"
            overline="Curated Collection"
            title="Featured Residences & Estates"
            description="Explore an exceptional selection of private residences characterized by peerless craftsmanship, prime positioning, and architectural vision."
          />

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#173D3B] hover:bg-[#B87556] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-sm self-start md:self-end"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Properties Grid */}
        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div
            ref={featuredGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProperties.slice(0, 6).map((property, idx) => (
              <PropertyCard
                key={property.id || property._id}
                property={property}
                priority={idx < 3}
              />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/properties"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#173D3B] text-white text-xs uppercase tracking-widest font-semibold"
          >
            <span>View All ({featuredProperties.length}+ Properties)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>



      {/* 2.5 OUR ONGOING PROJECTS (Animated Luxury Cards & Progress Bars) */}
      <section
        id="ongoing-projects"
        ref={ongoingSectionRef}
        className="relative py-24 sm:py-32 bg-[#F8F6F1] border-t border-[#E4E1D9] overflow-hidden select-none"
      >
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#173D3B]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A46D]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div ref={ongoingHeadingRef} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-[#C5A46D]" />
              <span className="text-[#C5A46D] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
                Ongoing Projects
              </span>
              <span className="w-8 h-[1px] bg-[#C5A46D]" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#173D3B] font-medium tracking-tight mb-5">
              Our Ongoing <span className="italic font-light">Projects</span>
            </h2>
            <p className="text-[#64748B] font-light text-sm sm:text-base leading-relaxed">
              We&apos;re currently working on a selection of premium residential and commercial projects, designed to bring modern living and lasting value.
            </p>
          </div>

          {/* Cards Grid Layout (Middle card offset downwards) */}
          <div
            ref={ongoingCardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          >
            {ongoingProjects.map((project, index) => {
              const isMiddle = index === 1;

              return (
                <div
                  key={project.id}
                  className={`group relative bg-white rounded-3xl overflow-hidden border border-[#E4E1D9] shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(23,61,59,0.12)] transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col ${
                    isMiddle ? "md:mt-16" : "md:mt-0"
                  }`}
                >
                  {/* Top Image Container */}
                  <div className="relative h-[270px] overflow-hidden bg-gradient-to-b from-[#E7EFF1] to-[#DCE6E9] p-4 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/5 pointer-events-none" />

                    {/* In Progress Badge */}
                    <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-[#173D3B] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-[#B87556] rounded-full animate-pulse" />
                      {project.status}
                    </div>

                    {/* Handover Quarter Badge */}
                    <div className="absolute top-5 right-5 bg-[#173D3B] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm">
                      {project.quarter}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-7 flex flex-col flex-grow">
                    {/* Category & Location */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#C5A46D] text-[10px] font-bold uppercase tracking-widest">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#64748B] text-[11px] font-light">
                        <MapPin className="w-3.5 h-3.5 text-[#B87556]" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[22px] text-[#173D3B] mb-5 leading-[1.25] group-hover:text-[#B87556] transition-colors duration-300 font-medium">
                      {project.title}
                    </h3>

                    {/* Key Features Grid (2 Rows) */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-5 border-t border-b border-[#E4E1D9]/80 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F8F6F1] flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-[#173D3B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Type</span>
                          <span className="text-[#173D3B] text-xs font-semibold truncate">{project.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F8F6F1] flex items-center justify-center shrink-0">
                          <KeyRound className="w-4 h-4 text-[#173D3B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Baths</span>
                          <span className="text-[#173D3B] text-xs font-semibold truncate">{project.baths}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F8F6F1] flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4 text-[#173D3B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Area</span>
                          <span className="text-[#173D3B] text-xs font-semibold truncate">{project.area}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F8F6F1] flex items-center justify-center shrink-0">
                          <TrendingUp className="w-4 h-4 text-[#173D3B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#64748B] uppercase tracking-wider">Floors / Park</span>
                          <span className="text-[#173D3B] text-xs font-semibold truncate">{project.floors}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-[11px] mb-2.5">
                        <span className="text-[#64748B] font-medium uppercase tracking-wider">
                          Construction Progress
                        </span>
                        <span className="text-[#173D3B] font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[#E4E1D9] h-2 rounded-full overflow-hidden relative">
                        <div
                          className="ongoing-progress-bar absolute top-0 left-0 bg-[#173D3B] h-full rounded-full transition-all duration-[1.4s] ease-out group-hover:bg-[#C5A46D]"
                          data-progress={project.progress}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2.6 RECENTLY COMPLETED PROJECTS (Split Editorial Card with Center Toggle Button) */}
      <section
        id="recent-completed"
        ref={completedSectionRef}
        className="relative py-24 sm:py-32 bg-[#0E1F1E] text-white border-t border-[#1C3A38] overflow-hidden select-none"
      >
        {/* Ambient Architectural Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#B87556]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 right-0 w-[550px] h-[550px] bg-[#C5A46D]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-[1px] bg-[#C5A46D]" />
              <span className="text-[#C5A46D] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
                Recently Completed
              </span>
              <span className="w-8 h-[1px] bg-[#C5A46D]" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5">
              Recently Completed <span className="italic font-light text-[#E4C89A]">Projects</span>
            </h2>
            <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
              Explore our latest completed architectural masterpieces, fetched live from our premier catalog. Handed over with uncompromising craftsmanship and refined luxury.
            </p>
          </div>

          {/* Master Split Card Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-white/10 bg-[#142624]">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
              {/* Left Column: Rich Burnt Terracotta Editorial Panel */}
              <div className="relative bg-[#9E5235] p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-white overflow-hidden">
                {/* Subtle Left Border Peek Strip */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/25 pointer-events-none" />

                {/* Animated Editorial Content */}
                <div ref={completedContentRef} className="flex flex-col justify-between h-full">
                  <div>
                    {/* Eyebrow / Handover Tag */}
                    <div className="completed-anim-item text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-white/80 flex items-center gap-2 mb-5">
                      <CheckCircle2 className="w-4 h-4 text-[#F5E6D3]" />
                      <span>
                        {currentCompleted.category ? currentCompleted.category.toUpperCase() : "LUXURY RESIDENCE"}{" "}
                        &bull; {currentCompleted.handoverDate || "HANDED OVER"}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="completed-anim-item font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.18] mb-6 tracking-tight">
                      {currentCompleted.title}
                    </h3>

                    {/* Narrative Description */}
                    <p className="completed-anim-item text-white/90 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg line-clamp-4">
                      {currentCompleted.description ||
                        "An extraordinary architectural achievement harmoniously executed with bespoke glass pavilions, curated natural finishes, and panoramic horizon vistas."}
                    </p>

                    {/* Spec Key Metrics Grid */}
                    <div className="completed-anim-item grid grid-cols-3 gap-3 p-4 rounded-2xl bg-black/20 border border-white/15 mb-8 backdrop-blur-sm text-left">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-0.5">
                          Valuation
                        </span>
                        <span className="text-white font-bold text-sm sm:text-base block truncate">
                          {typeof currentCompleted.price === "number"
                            ? `$${currentCompleted.price.toLocaleString()}`
                            : currentCompleted.price || "$16,500,000"}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-0.5">
                          Bed / Bath
                        </span>
                        <span className="text-white font-semibold text-xs sm:text-sm block truncate">
                          {currentCompleted.bedrooms || 5} Beds &bull; {currentCompleted.bathrooms || 6} Baths
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/60 block mb-0.5">
                          Built Area
                        </span>
                        <span className="text-white font-semibold text-xs sm:text-sm block truncate">
                          {currentCompleted.area
                            ? typeof currentCompleted.area === "number"
                              ? currentCompleted.area.toLocaleString()
                              : currentCompleted.area
                            : "8,500"}{" "}
                          SqFt
                        </span>
                      </div>
                    </div>

                    {/* Action & Location Link */}
                    <div className="completed-anim-item flex items-center gap-4 flex-wrap mb-8">
                      <Link
                        to={currentCompleted._id ? `/property/${currentCompleted._id}` : "/properties"}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#9E5235] hover:bg-[#F7F5EF] text-xs uppercase tracking-widest font-bold shadow-lg transition-transform hover:-translate-y-0.5"
                      >
                        <span>View Property</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-1.5 text-white/80 text-xs font-light">
                        <MapPin className="w-3.5 h-3.5 text-[#F5E6D3]" />
                        <span>{currentCompleted.location || "Prime Enclave, Dubai"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Footer Navigation Tracker */}
                  <div className="completed-anim-item flex items-center justify-between pt-6 border-t border-white/20 text-[10px] sm:text-xs uppercase tracking-widest text-white/75">
                    <span>
                      PROJECT 0{activeCompletedIndex + 1} / 0{completedProjects.length}
                    </span>
                    <span className="truncate max-w-[200px] text-right font-medium">
                      NEXT: {nextCompleted.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Full-Bleed Photograph Panel */}
              <div className="relative min-h-[380px] lg:min-h-[580px] overflow-hidden bg-black">
                <img
                  ref={completedImageRef}
                  src={
                    (currentCompleted.images && currentCompleted.images[0]) ||
                    currentCompleted.image ||
                    fallbackCompletedProperties[0].images[0]
                  }
                  alt={currentCompleted.title}
                  className="w-full h-full object-cover"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

                {/* Handover Complete Status Pill */}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Handover Complete</span>
                </div>

                {/* Category Pill Bottom-Left */}
                <div className="absolute bottom-6 left-6 text-white text-xs bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#E4C89A]" />
                  <span>{currentCompleted.category || "Exclusive Estate"}</span>
                </div>
              </div>
            </div>

            {/* Overlapping Center Circular Toggle Button ("Explore next") */}
            <div className="absolute z-30 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bottom-6 right-6 lg:bottom-auto lg:right-auto">
              <button
                type="button"
                onClick={() => setActiveCompletedIndex((prev) => (prev + 1) % completedProjects.length)}
                aria-label="Explore next project"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#9E5235] hover:bg-[#88432A] border-2 border-white/40 hover:border-white text-white shadow-[0_14px_45px_rgba(0,0,0,0.6)] ring-4 ring-black/40 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center p-2 text-center cursor-pointer group focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                <span className="text-[11px] sm:text-xs font-serif italic text-white/90 leading-tight">
                  Explore
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  next
                </span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1 group-hover:bg-white group-hover:text-[#9E5235] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* 3. PROPERTY CATEGORIES */}

      <section
        ref={categoriesSectionRef}
        className="relative pt-24 pb-36 lg:pb-48 bg-gradient-to-b from-[#F7F5EF] via-[#F2EDE2] to-[#E8E1D2] border-t border-[#E4E1D9] overflow-hidden select-none"
      >
        {/* 1. Cinematic Architectural Dot-Matrix Blueprint Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45 -z-0"
          style={{
            backgroundImage: `radial-gradient(rgba(23, 61, 59, 0.13) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* 2. Atmospheric Warm Ambient Light Blooms */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#B87556]/12 via-[#C5A46D]/8 to-transparent blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-[#173D3B]/8 via-[#B87556]/5 to-transparent blur-3xl pointer-events-none -z-0" />





        {/* 5. Decorative Left Dark Teal Arch Motif */}
        <div className="hidden xl:block absolute -left-12 top-28 w-32 h-64 bg-[#173D3B] rounded-r-full shadow-2xl border-r border-t border-b border-[#B87556]/20 -z-0 pointer-events-none" />

        {/* 6. Decorative Fine Arc Sweep Line */}
        <svg
          className="hidden lg:block absolute left-4 bottom-28 w-72 h-64 pointer-events-none -z-0 opacity-35 text-[#B87556]"
          fill="none"
          viewBox="0 0 240 200"
        >
          <path
            d="M10,0 C10,120 90,175 240,175"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="4 4"
          />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Area */}
          <div
            ref={categoriesHeadingRef}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8"
          >
            {/* Left: Overline, Heading, Subtitle */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#173D3B]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#173D3B]">
                  PORTFOLIO EXPLORATION
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#173D3B] font-normal leading-[1.08] tracking-tight">
                Explore Properties <br />
                by Lifestyle
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-[#6B7280] font-light leading-relaxed max-w-md">
                From sky-high metropolitan penthouses to tranquil private villas, discover residences tailored to your living preference.
              </p>
            </div>

            {/* Right: Slogan, Divider, View All Categories Link */}
            <div className="flex items-center gap-6 self-start lg:self-end pb-2">
              <div className="hidden sm:block h-10 w-[1px] bg-[#D4CEC3]" />

              <div className="hidden sm:block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] leading-tight">
                <span>DIFFERENT STYLES.</span> <br />
                <span>SAME EXCEPTIONAL STANDARD.</span>
              </div>

              <Link
                to="/properties"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#B87556] hover:text-[#173D3B] tracking-wider transition-colors ml-auto sm:ml-2 group"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* 4 Staggered Category Cards (Up-Down Rhythm) */}
          <div
            ref={categoryGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          >
            {/* Card 1: Architectural Villas (Shifted DOWN) */}
            <Link
              to="/properties?type=Villa"
              className="group relative flex flex-col rounded-br-[72px] overflow-hidden bg-[#173D3B] text-white shadow-xl hover:shadow-[0_25px_60px_rgba(23,61,59,0.28)] transition-all duration-500 border border-[#173D3B] mt-0 lg:mt-24"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-200">
                <img
                  src="https://i.ibb.co.com/RGVJVRzW/n-cube-villa-cubism-architects-and-interiors-india-01.jpg"
                  alt="Architectural Villas"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Lower Content Block (Dark Teal) */}
              <div className="p-6 flex flex-col justify-between bg-[#173D3B] min-h-[200px]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold text-[#B87556]">01</span>
                    <span className="w-8 h-[1px] bg-[#B87556]" />
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-white mb-2 leading-tight group-hover:text-[#B87556] transition-colors">
                    Architectural Villas
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Private sanctuaries with seamless indoor-outdoor living.
                  </p>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/90">
                    EXPLORE RESIDENCES
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-[#B87556] group-hover:bg-[#B87556] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2: Historic Townhomes (Shifted UP) */}
            <Link
              to="/properties?type=Townhouse"
              className="group relative flex flex-col overflow-hidden bg-white text-[#173D3B] shadow-xl hover:shadow-[0_25px_60px_rgba(23,61,59,0.18)] transition-all duration-500 border border-[#E4E1D9] rounded-sm mt-0 lg:mt-0"
            >
              {/* Image Frame with Number Overlay */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-200">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white drop-shadow">
                  <span className="font-mono text-xs font-semibold">02</span>
                  <span className="w-8 h-[1px] bg-white/70" />
                </div>

                <img
                  src="https://i.ibb.co.com/rKw5K042/pexels-cmoon-12558958.jpg"
                  alt="Historic Townhomes"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Lower Content Block (White with Organic Scoop Curve) */}
              <div className="relative p-6 pt-5 flex flex-col justify-between bg-white z-10 min-h-[200px]">
                {/* SVG Organic Wave Scoop */}
                <svg
                  className="absolute -top-6 left-0 right-0 w-full h-7 text-white fill-current pointer-events-none"
                  viewBox="0 0 100 24"
                  preserveAspectRatio="none"
                >
                  <path d="M0,24 Q 35,0 100,18 L100,24 Z" />
                </svg>

                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#173D3B] mb-2 leading-tight group-hover:text-[#B87556] transition-colors">
                    Historic Townhomes
                  </h3>

                  <p className="text-xs text-[#6B7280] font-light leading-relaxed">
                    Classic facades harboring modern bespoke interiors.
                  </p>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-[#E4E1D9]/60">
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] group-hover:text-[#B87556] transition-colors">
                    <span>EXPLORE RESIDENCES</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 3: Luxury Residences (Shifted MID/DOWN) */}
            <Link
              to="/properties?type=Apartment"
              className="group relative flex flex-col rounded-tr-[84px] overflow-hidden bg-[#173D3B] text-white shadow-xl hover:shadow-[0_25px_60px_rgba(23,61,59,0.28)] transition-all duration-500 border border-[#173D3B] mt-0 lg:mt-14"
            >
              {/* Image Frame with Arched Top-Right Corner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-200 rounded-tr-[84px]">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white drop-shadow">
                  <span className="font-mono text-xs font-semibold">03</span>
                  <span className="w-8 h-[1px] bg-white/70" />
                </div>

                <img
                  src="https://i.ibb.co.com/zhkwQb38/pexels-gerdiephotography-g-2148876750-34909558.jpg"
                  alt="Luxury Residences"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Lower Content Block (Dark Teal) */}
              <div className="p-6 flex flex-col justify-between bg-[#173D3B] min-h-[200px]">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-white mb-2 leading-tight group-hover:text-[#B87556] transition-colors">
                    Luxury Residences
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Refined city apartments in premier cultural districts.
                  </p>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/90">
                    EXPLORE RESIDENCES
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:border-[#B87556] group-hover:bg-[#B87556] transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 4: Skyline Penthouses (Shifted UP) */}
            <Link
              to="/properties?type=Penthouse"
              className="group relative flex flex-col overflow-hidden bg-white text-[#173D3B] shadow-xl hover:shadow-[0_25px_60px_rgba(23,61,59,0.18)] transition-all duration-500 border border-[#E4E1D9] rounded-sm mt-0 lg:mt-3"
            >
              {/* Image Frame with Number Overlay */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-200">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white drop-shadow">
                  <span className="font-mono text-xs font-semibold">04</span>
                  <span className="w-8 h-[1px] bg-white/70" />
                </div>

                <img
                  src="https://i.ibb.co.com/s97QFVhH/pexels-fhstudio-13201480.jpg"
                  alt="Skyline Penthouses"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Lower Content Block (White with Organic Scoop Curve) */}
              <div className="relative p-6 pt-5 flex flex-col justify-between bg-white z-10 min-h-[200px]">
                {/* SVG Organic Wave Scoop */}
                <svg
                  className="absolute -top-6 left-0 right-0 w-full h-7 text-white fill-current pointer-events-none"
                  viewBox="0 0 100 24"
                  preserveAspectRatio="none"
                >
                  <path d="M0,24 C 25,6 65,0 100,16 L100,24 Z" />
                </svg>

                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#173D3B] mb-2 leading-tight group-hover:text-[#B87556] transition-colors">
                    Skyline Penthouses
                  </h3>

                  <p className="text-xs text-[#6B7280] font-light leading-relaxed">
                    Elevated living with panoramic urban and coastal horizons.
                  </p>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-[#E4E1D9]/60">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#173D3B]">
                    EXPLORE RESIDENCES
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#173D3B]/20 flex items-center justify-center text-[#173D3B] group-hover:border-[#B87556] group-hover:bg-[#B87556] group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Organic Curved Wave Section Divider (Matching Custom Red Arc Contour) */}
        <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-16 sm:h-20 lg:h-28"
            preserveAspectRatio="none"
          >
            {/* Fill bottom area with Section 4 dark background tone (#0B1A19) */}
            <path
              d="M0,80 C150,75 250,30 380,30 C550,30 750,95 920,95 C1100,95 1300,75 1440,25 L1440,120 L0,120 Z"
              fill="#0B1A19"
            />
            {/* Elegant architectural boundary stroke */}
            <path
              d="M0,80 C150,75 250,30 380,30 C550,30 750,95 920,95 C1100,95 1300,75 1440,25"
              fill="none"
              stroke="#B87556"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          </svg>
        </div>
      </section>

      {/* 4. WHY CHOOSE US / THE HAVENSTONE STANDARD (Cinematic Dark Luxury Canvas) */}
      <section
        ref={whyChooseUsSectionRef}
        className="relative w-full bg-[#0B1A19] text-white pt-24 pb-32 overflow-hidden select-none"
      >
        {/* Cinematic Blurred Architectural Photographic Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover brightness-[0.18] contrast-125 scale-105 blur-sm"
          />
          {/* Radial Dark Vignette & Gold Ambient Spotlight */}
          <div className="absolute inset-0 bg-radial from-[#B87556]/12 via-[#0B1A19]/80 to-[#0B1A19]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1A19] via-transparent to-[#0B1A19]" />
        </div>

        {/* Floating Architectural Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[200px] lg:text-[320px] font-bold text-white/[0.015] select-none pointer-events-none leading-none -z-0">
          HAVENSTONE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header: Matching Reference Image (Lumière style centered luxury) */}
          <div
            ref={whyChooseHeadingRef}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            {/* Flanked Overline */}
            <div className="inline-flex items-center justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.3em] text-[#C5A46D] font-semibold mb-4">
              <span className="w-10 sm:w-16 h-[1px] bg-[#C5A46D]/50" />
              <span>THE HAVENSTONE STANDARD</span>
              <span className="w-10 sm:w-16 h-[1px] bg-[#C5A46D]/50" />
            </div>

            {/* Main Majestic Title */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-4 drop-shadow-md">
              Why Discerning Clients Entrust Us
            </h2>

            {/* Elegant Diamond Divider */}
            <div className="flex items-center justify-center gap-2.5 my-5 text-[#C5A46D]">
              <span className="w-8 h-[1px] bg-[#C5A46D]/40" />
              <span className="w-2 h-2 rotate-45 border border-[#C5A46D] bg-[#C5A46D]/30 inline-block" />
              <span className="w-8 h-[1px] bg-[#C5A46D]/40" />
            </div>

            {/* Italicized Gold Subtitle */}
            <p className="font-serif italic text-sm sm:text-base text-[#D4CEC3]/90 leading-relaxed font-light">
              Words of distinction and architectural stewardship across premier global enclaves
            </p>
          </div>

          {/* 4 Luxury Architectural Dossier Cards (2-Part Photo + Cream Card matching reference) */}
          <div
            ref={whyChooseGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch"
          >
            {siteConfig.whyChooseUs.map((item, idx) => {
              const icons = [Compass, ShieldCheck, TrendingUp, KeyRound];
              const IconComponent = icons[idx] || Compass;
              const cardImages = [
                "https://i.ibb.co.com/Rk66Jpp2/istockphoto-1516936022-612x612.jpg",
                "https://i.ibb.co.com/F4Kgc1Lm/bhjv.jpg",
                "https://i.ibb.co.com/DPBHRcJj/lkj.jpg",
                "https://i.ibb.co.com/fY77f6TJ/charcoal-minimal.jpg",
              ];
              const pillLabels = [
                "Pedigree Assessment",
                "Off-Market Discretion",
                "Proprietary Intel",
                "Private Concierge",
              ];
              const desks = ["NEW YORK", "LONDON", "BEVERLY HILLS", "PARIS"];

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Top Photographic Half with Dark Rounded Frame */}
                  <div className="relative h-56 sm:h-60 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-white/10">
                    <img
                      src={cardImages[idx]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Pill Badge in Top-Right Corner */}
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-white font-medium shadow-sm">
                      {pillLabels[idx]}
                    </div>
                  </div>

                  {/* Overlapping Bronze Icon Emblem in the Center */}
                  <div className="relative -mt-6 mb-2 z-20 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#B87556] text-white flex items-center justify-center shadow-xl border-[3px] border-[#0B1A19] group-hover:scale-110 group-hover:bg-[#C5A46D] transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Lower Cream / Ivory Dossier Card Block */}
                  <div className="relative flex-1 bg-[#FAF8F3] text-[#173D3B] rounded-2xl p-6 sm:p-7 pt-4 text-center shadow-2xl border border-white/30 flex flex-col justify-between">
                    <div>
                      {/* 5 Gold Stars Rating / Pedigree Marker */}
                      <div className="flex items-center justify-center gap-1.5 text-[#C5A46D] mb-3 text-sm tracking-wider">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>

                      {/* Card Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#173D3B] mb-2 leading-tight group-hover:text-[#B87556] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#5A6362] font-light leading-relaxed mb-4">
                        &ldquo;{item.description}&rdquo;
                      </p>
                    </div>

                    <div>
                      {/* Delicate Diamond Divider */}
                      <div className="flex items-center justify-center gap-2 my-3">
                        <span className="w-8 h-[1px] bg-[#E4E1D9]" />
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#B87556]" />
                        <span className="w-8 h-[1px] bg-[#E4E1D9]" />
                      </div>

                      {/* Client Desk / Authority Footer */}
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="font-serif italic font-semibold text-[#173D3B]">
                          — Advisory Desk
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-[#B87556] font-semibold uppercase">
                          {desks[idx]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integrated Statistics Showcase Bar */}
          <div
            ref={statsBarRef}
            className="mt-20 relative bg-white/[0.04] backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#B87556] animate-ping" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A46D] font-semibold">
                  PORTFOLIO BENCHMARKS & FIDUCIARY PERFORMANCE
                </span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                AUDITED 2026 // GLOBAL REACH
              </span>
            </div>

            {/* 4 Stat Columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {siteConfig.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center ${idx > 0 ? "pt-6 lg:pt-0" : ""}`}
                >
                  <span className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6CA] via-[#E2C792] to-[#B87556] mb-2 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white mb-2">
                    {stat.label}
                  </span>
                  <span className="text-xs text-slate-300 max-w-[200px] leading-relaxed font-light">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Flanked Link matching Reference Image */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-16 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A46D]">
            <span className="w-12 sm:w-24 h-[1px] bg-[#C5A46D]/40" />
            <Link
              to="/properties"
              className="hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span>EXPLORE ALL ARCHITECTURAL HOLDINGS</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="w-12 sm:w-24 h-[1px] bg-[#C5A46D]/40" />
          </div>
        </div>

        {/* Organic Bottom Curve Wave Divider to Section 5 */}
        <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative block w-full h-12 sm:h-16 lg:h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C320,75 640,15 960,50 C1200,75 1350,20 1440,40 L1440,80 L0,80 Z"
              fill="#F7F5EF"
            />
          </svg>
        </div>
      </section>




      {/* 5. CONTACT CTA SECTION */}
      <section
        ref={contactCtaSectionRef}
        className="relative py-20 bg-[#F7F5EF] border-t border-[#E4E1D9] overflow-hidden"
      >
        <div
          ref={contactCtaContentRef}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <SectionHeading
            overline="Private Advisory Desk"
            title="Looking to Acquire or Represent a Fine Property?"
            description="Whether acquiring a generational family compound or seeking confidential representation for a premier residence, our senior advisors are ready to consult."
            className="mb-8"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#173D3B] hover:bg-[#B87556] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-md cursor-pointer"
            >
              <span>Schedule Private Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/properties"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-[#173D3B] border border-[#E4E1D9] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
            >
              <span>Browse Complete Portfolio</span>
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#6B7280]">
            Direct Advisory Line:{" "}
            <strong className="text-[#173D3B]">{siteConfig.contact.phone}</strong> &bull;{" "}
            {siteConfig.contact.officeHours}
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;