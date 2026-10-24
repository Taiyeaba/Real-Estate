import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Compass,
  Award,
  Sparkles,
  Building2,
  CheckCircle,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import useSmoothScroll from "../hooks/useSmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillarIcons = {
  "curated-portfolio": Compass,
  "discreet-transactions": ShieldCheck,
  "bespoke-marketing": Sparkles,
  "heritage-preservation": Award,
};

const partners = [
  {
    name: "John Smith",
    role: "Company CEO",
    desk: "Manhattan Flagship",
    image:
      "https://i.ibb.co.com/MxD2b1T9/pexels-sandro-tavares-260503371-17582358.jpg",
    bgColor: "#F5ECE1",
    borderColor: "#E8D8C4",
  },
  {
    name: "David Johnson",
    role: "Co-Founder",
    desk: "Beverly Hills Advisory",
    image:
      "https://i.ibb.co.com/pr1CMKWm/pexels-kooldark-17049791.jpg",
    bgColor: "#F8EAE5",
    borderColor: "#E9D2C7",
  },
  {
    name: "Mary Johnson",
    role: "Property Managers",
    desk: "Mayfair London Desk",
    image:
      "https://i.ibb.co.com/DgfgrT1Y/pexels-ionela-mat-268382825-32339458.jpg",
    bgColor: "#E2ECE9",
    borderColor: "#C7DDD8",
  },
  {
    name: "Patricia Davis",
    role: "Estate Consultant",
    desk: "Palm Beach Advisory",
    image:
      "https://i.ibb.co.com/m5jR809B/pexels-tima-miroshnichenko-5717550.jpg",
    bgColor: "#F5EFE4",
    borderColor: "#E6DDCA",
  },
];

const milestones = [
  {
    year: "2008",
    title: "The Manhattan Inception",
    detail:
      "Founded at 740 Park Avenue as a boutique private advisory rejecting volume brokerage in pursuit of pure architectural curation.",
  },
  {
    year: "2014",
    title: "Pacific Promontory Expansion",
    detail:
      "Establishing our West Coast presence in Beverly Hills to represent modernist architectural triumphs across Bel-Air and Trousdale.",
  },
  {
    year: "2019",
    title: "Transatlantic European Salon",
    detail:
      "Opening our Berkeley Square advisory in Mayfair, London to facilitate private cross-border acquisitions for sovereign family offices.",
  },
  {
    year: "2024",
    title: "$2.8B+ Curated Volume",
    detail:
      "Upholding an uncompromised standard of private client representation across 42 premier global architectural enclaves.",
  },
];

const About = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const statsSectionRef = useRef(null);

  // Initialize Lenis smooth scroll
  useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // 1. Hero Parallax & Entrance
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

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-reveal"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }

      // 2. Generic Reveal Elements
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 3. Staggered Pillars
      const pillarCards = containerRef.current.querySelectorAll(".pillar-card");
      if (pillarCards.length > 0) {
        gsap.fromTo(
          pillarCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".pillars-grid",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 4. Staggered Partners
      const partnerCards = containerRef.current.querySelectorAll(".partner-card");
      if (partnerCards.length > 0) {
        gsap.fromTo(
          partnerCards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".partners-grid",
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 5. Stats Counter Entrance
      if (statsSectionRef.current) {
        gsap.fromTo(
          statsSectionRef.current.querySelectorAll(".stat-item"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsSectionRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#F7F5EF] text-[#303B3A] relative overflow-hidden selection:bg-[#B87556] selection:text-white"
    >
      {/* 1. BREATHTAKING FULL-BLEED ARCHITECTURAL HERO */}
      <section
        ref={heroRef}
        className="relative h-[80vh] min-h-[600px] sm:h-[86vh] max-h-[920px] flex items-end pb-16 sm:pb-24 overflow-hidden"
      >
        {/* Parallax Background Photography */}
        <div className="absolute inset-0 z-0">
          <img
            ref={heroBgRef}
            src="https://i.ibb.co.com/wZCLPQJr/pexels-salmansaqib-28456461.jpg"
            alt="Havenstone Architectural Promontory Residence"
            className="w-full h-[120%] -top-[10%] object-cover object-center  scale-105"
          />
          {/* Multi-layered cinematic vignette & color blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#102B2A] via-[#102B2A]/45 to-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none" />
        </div>

        {/* Hero Narrative Overlay */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="max-w-4xl">
            {/* Eyebrow Stamp */}
            <div className="hero-reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#B87556] mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#B87556] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.26em] font-semibold text-white/90">
                HAVENSTONE ARCHIVE &bull; ESTABLISHED {siteConfig.brand.establishedYear}
              </span>
            </div>

            {/* Grand Headline */}
            <h1 className="hero-reveal font-serif italic text-4xl sm:text-6xl lg:text-[74px] text-white font-normal leading-[1.08] tracking-tight mb-6 drop-shadow-md">
              The Art of <span className="not-italic font-serif">Architectural Living</span> &amp; Private Stewardship
            </h1>

            {/* Subtitle */}
            <p className="hero-reveal text-sm sm:text-base lg:text-lg text-slate-100 font-light leading-relaxed max-w-2xl mb-8 drop-shadow-sm">
              We do not sell square footage. We represent the built expression of human ambition—curating residences of exceptional pedigree that transcend transient market cycles.
            </p>

            {/* Quick Metrics Strip */}
            <div className="hero-reveal flex flex-wrap items-center gap-6 pt-5 border-t border-white/20 text-xs text-white/90 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B87556]" />
                <span className="text-[#B87556] font-semibold text-sm">$2.8B+</span>
                <span className="text-slate-200">Curated Volume</span>
              </div>
              <div className="hidden sm:block text-white/40">&bull;</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B87556]" />
                <span className="text-white font-semibold text-sm">16+ Years</span>
                <span className="text-slate-200">Stewardship</span>
              </div>
              <div className="hidden sm:block text-white/40">&bull;</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B87556]" />
                <span className="text-slate-200">Manhattan &bull; Beverly Hills &bull; Mayfair &bull; Miami</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CURATION PHILOSOPHY (Asymmetrical Architectural Digest Spread) */}
      <section className="relative z-20 py-20 sm:py-28 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Dual Layered Photographs (7 cols) */}
          <div className="lg:col-span-7 reveal-up relative">
            {/* Primary Landscape Photograph */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-[#E4E1D9] group">
              <img
                src="https://i.ibb.co.com/S4yNPNPF/pexels-ranamatloob567-34377945.jpg"
                alt="Architectural Interior"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-6 left-6 pointer-events-none z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  REF: ARCHITECTURAL HERITAGE
                </span>
              </div>
            </div>

            {/* Overlapping Inset Detail Photograph */}
            <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-10 w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F7F5EF] group">
              <img
                src="https://i.ibb.co.com/HTZvNh7D/pexels-the-ghazi-2152398165-32570640.jpg"
                alt="Estate Detail"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white bg-[#173D3B]/90 backdrop-blur-md px-2.5 py-1 rounded-md">
                  VETTED PEDIGREE
                </span>
              </div>
            </div>
          </div>

          {/* Right: Narrative Editorial Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 reveal-up">
            {/* Signature Horizontal Line Motif */}
            <div className="flex items-center gap-3">
              <span className="w-12 h-[1.5px] bg-[#B87556] shrink-0" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                THE ADVISORY COUNTER-PHILOSOPHY
              </span>
            </div>

            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#173D3B] leading-[1.18] tracking-tight">
              We operate at the intersection of architectural heritage and private wealth stewardship.
            </h2>

            <p className="text-sm sm:text-base text-[#555B57] leading-relaxed font-light">
              Conventional residential brokerage prioritizes volume and rapid transaction velocity. Havenstone was founded upon a counter-philosophy: deliberate, uncompromising curation. We selectively represent residences of verifiable pedigree—properties whose site orientation, materiality, and architectural integrity command generational reverence.
            </p>

            <p className="text-sm sm:text-base text-[#555B57] leading-relaxed font-light">
              From cantilevered glass pavilions perched high above the Los Angeles basin to historic limestone townhouses facing New York’s park avenues, our senior partners serve as trusted counsel to private collectors, family offices, and architectural conservators worldwide.
            </p>

            {/* Founder Quote Card */}
            <div className="p-6 rounded-2xl bg-[#FCFAF5] border border-[#E4E1D9] relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#B87556]" />
              <p className="font-serif italic text-sm sm:text-base text-[#173D3B] leading-relaxed mb-3">
                &ldquo;Architecture is the most permanent physical manifestation of human ambition. Our obligation is to protect its legacy and steward its transition between distinguished custodians.&rdquo;
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-[#8A9292]">
                <span className="font-semibold text-[#173D3B]">Sterling Hayes</span>
                <span>Senior Managing Partner</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/properties"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#173D3B] hover:bg-[#B87556] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm"
              >
                <span>Explore Curated Portfolio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-[#E4E1D9] hover:border-[#B87556]/60 text-[#173D3B] hover:text-[#B87556] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xs"
              >
                <span>Consult Senior Partners</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE HAVENSTONE HERITAGE — A TIMELINE OF DISTINCTION */}
      <section className="py-20 sm:py-28 bg-[#FCFAF5] border-y border-[#E4E1D9]">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="max-w-3xl mb-16 reveal-up">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#B87556]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                INSTITUTIONAL MILESTONES
              </span>
            </div>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-normal text-[#173D3B] leading-tight">
              A Legacy of Deliberate Curation
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#555B57] font-light leading-relaxed">
              Sixteen years of uninterrupted private client stewardship across the world&apos;s most competitive architectural centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, idx) => (
              <div
                key={item.year}
                className="reveal-up group relative bg-white rounded-3xl p-8 border border-[#E4E1D9] hover:border-[#B87556]/60 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Large Background Year Accent */}
                <span className="font-mono text-5xl font-bold text-[#E4E1D9]/40 group-hover:text-[#B87556]/15 transition-colors absolute top-6 right-6 pointer-events-none">
                  {item.year}
                </span>

                <div className="relative z-10">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B87556] font-semibold block mb-3">
                    EPOCH 0{idx + 1} &bull; {item.year}
                  </span>
                  <h3 className="font-serif italic text-xl font-normal text-[#173D3B] group-hover:text-[#B87556] transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555B57] leading-relaxed font-light">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E4E1D9]/70 flex items-center justify-between text-[11px] font-mono text-[#8A9292]">
                  <span>STEWARDSHIP</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87556]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE FOUR PILLARS — INSTITUTIONAL MONOGRAPHS */}
      <section className="py-24 sm:py-32 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 reveal-up">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#B87556]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                FOUR CORE PILLARS
              </span>
            </div>
            <h2 className="font-serif italic text-3xl sm:text-5xl lg:text-[52px] font-normal text-[#173D3B] leading-[1.12]">
              The Havenstone Principles
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#555B57] font-light max-w-md leading-relaxed">
            Every client mandate, property valuation, and acquisition is governed by four non-negotiable institutional tenets.
          </p>
        </div>

        <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.whyChooseUs.map((pillar, idx) => {
            const IconComponent = pillarIcons[pillar.id] || CheckCircle;
            const monographIndex = (idx + 1).toString().padStart(2, "0");

            return (
              <div
                key={pillar.id}
                className="pillar-card group relative bg-white rounded-3xl p-8 sm:p-10 border border-[#E4E1D9] hover:border-[#B87556] shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Corner Monograph Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7F5EF] group-hover:bg-[#173D3B] text-[#B87556] group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-xs">
                    <IconComponent className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A9292] group-hover:text-[#B87556] transition-colors">
                    № {monographIndex}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif italic text-2xl font-normal text-[#173D3B] group-hover:text-[#B87556] transition-colors mb-3">
                    {pillar.title}
                  </h3>
                  <div className="w-10 h-[1.5px] bg-[#B87556] mb-4 transition-all duration-500 group-hover:w-20" />
                  <p className="text-xs sm:text-sm text-[#555B57] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-10 pt-4 border-t border-[#E4E1D9]/70 flex items-center justify-between text-[11px] font-mono text-[#8A9292]">
                  <span>INSTITUTIONAL TENET</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B87556]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. MONUMENTAL STATS — SOVEREIGN VAULT DESIGN */}
      <section
        ref={statsSectionRef}
        className="relative bg-[#173D3B] text-white py-20 sm:py-28 overflow-hidden border-y border-[#B87556]/30"
      >
        {/* Dot-matrix Architectural Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(232, 213, 181, 0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Gold Light Bloom */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#B87556]/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`stat-item flex flex-col items-center justify-center ${
                  idx > 0 ? "pt-6 lg:pt-0" : ""
                }`}
              >
                <span className="font-serif italic text-4xl sm:text-6xl lg:text-[68px] font-normal text-[#E8D5B5] mb-2 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-2">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-300 max-w-[220px] leading-relaxed font-light">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SENIOR LEADERSHIP & MANAGING PARTNERS (Bespoke Wavy Arch Cards) */}
      <section className="py-24 sm:py-32 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal-up">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87556]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#B87556]">
              LEADERSHIP & ADVISORY
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87556]" />
          </div>
          <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-[#173D3B] leading-[1.12] mb-4">
            Private Advisory Leadership
          </h2>
          <p className="text-sm sm:text-base text-[#555B57] font-light leading-relaxed max-w-2xl mx-auto">
            Our dedicated team of experienced real estate professionals is at the heart of what we do. With a deep knowledge of the local and global markets, and a passion for helping clients achieve their architectural estate ambitions.
          </p>
        </div>

        <div className="partners-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {partners.map((partner, idx) => (
            <div
              key={partner.name}
              className="partner-card group flex flex-col items-center transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              {/* Curved Wave Container Matching User Reference */}
              <div className="relative w-full max-w-[270px] aspect-[270/330] overflow-hidden drop-shadow-sm group-hover:drop-shadow-xl transition-all duration-500">
                <svg
                  viewBox="0 0 280 340"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <clipPath id={`leader-wave-${idx}`}>
                      <path d="M 0 28 Q 140 56 280 28 L 280 295 Q 140 323 0 295 Z" />
                    </clipPath>
                  </defs>
                  {/* Colored background */}
                  <path
                    d="M 0 28 Q 140 56 280 28 L 280 295 Q 140 323 0 295 Z"
                    fill={partner.bgColor}
                  />
                  {/* Subtle border outline */}
                  <path
                    d="M 0 28 Q 140 56 280 28 L 280 295 Q 140 323 0 295 Z"
                    fill="none"
                    stroke={partner.borderColor}
                    strokeWidth="1.5"
                  />
                  {/* Executive Portrait Image */}
                  <image
                    href={partner.image}
                    x="0"
                    y="16"
                    width="280"
                    height="315"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#leader-wave-${idx})`}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </svg>
              </div>

              {/* Name & Title Below Card (Matching Reference Layout) */}
              <div className="mt-5 text-center">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#173D3B] group-hover:text-[#B87556] transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#737C78] font-normal tracking-wide mt-1">
                  {partner.role}
                </p>
                <span className="inline-block text-[11px] font-mono text-[#B87556] uppercase tracking-wider mt-1.5 opacity-90">
                  {partner.desk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GLOBAL ADVISORY EMBASSIES & DESKS (Offices) */}
      <section className="py-20 sm:py-28 bg-[#FCFAF5] border-t border-[#E4E1D9]" id="offices">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6 reveal-up">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1.5px] bg-[#B87556]" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                  GLOBAL SALONS &amp; EMBASSIES
                </span>
              </div>
              <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-[#173D3B]">
                Primary Advisory Locations
              </h2>
            </div>
            <p className="text-[#555B57] max-w-sm font-light text-sm leading-relaxed text-left lg:text-right">
              Headquartered in New York with dedicated private desks positioned across the world&apos;s most sought-after property centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.offices.map((office) => (
              <div
                key={office.city}
                className="reveal-up bg-white p-8 border border-[#E4E1D9] hover:border-[#B87556]/60 hover:shadow-xl transition-all duration-500 group rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F5EF] text-[#173D3B] group-hover:bg-[#173D3B] group-hover:text-[#B87556] flex items-center justify-center mb-6 transition-colors duration-300">
                    <Building2 className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif italic text-2xl font-normal text-[#173D3B] mb-1 group-hover:text-[#B87556] transition-colors">
                    {office.city}
                  </h3>

                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#B87556] font-semibold block mb-4">
                    {office.area}
                  </span>

                  <div className="space-y-3 text-xs sm:text-sm text-[#555B57] font-light mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#B87556] mt-0.5 shrink-0" />
                      <p>{office.address}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E4E1D9] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#173D3B] font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#B87556] shrink-0" />
                    <a href={`tel:${office.phone}`} className="hover:text-[#B87556] transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#555B57] truncate font-light">
                    <Mail className="w-3.5 h-3.5 text-[#B87556] shrink-0" />
                    <a href={`mailto:${office.email}`} className="hover:text-[#173D3B] transition-colors truncate">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;