import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  User,
  RotateCcw,
  Building,
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import useAxios from "../hooks/useAxios";
import useSmoothScroll from "../hooks/useSmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const axiosInstance = useAxios();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  // Initialize Lenis smooth scroll
  useSmoothScroll();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Property Acquisition",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // GSAP Entrance Animations
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      // 1. Header Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll(".header-reveal"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }

      // 2. Info Panel Entrance (Left Column)
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.querySelectorAll(".info-card"),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.2,
          }
        );
      }

      // 3. Form Panel Entrance (Right Column)
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please include a brief message.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await axiosInstance.post("/contact", formData);
    } catch (err) {
      console.warn("Could not save contact message to server:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Property Acquisition",
      message: "",
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F7F5EF] text-[#303B3A] relative overflow-hidden">
      {/* 1. Cinematic Page Header */}
      <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 border-b border-[#E4E1D9] bg-gradient-to-b from-[#FCFAF5] to-[#F7F5EF] overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 text-center sm:text-left">
          <div ref={headerRef} className="max-w-4xl">
            {/* Eyebrow */}
            <div className="header-reveal flex items-center justify-center sm:justify-start gap-2.5 mb-3.5">
              <span className="w-8 h-[1.5px] bg-[#B87556]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                CONFIDENTIAL ADVISORY DESK &bull; PRIVATE CLIENT INQUIRIES
              </span>
            </div>

            {/* Main Title */}
            <h1 className="header-reveal font-serif italic text-3xl sm:text-5xl lg:text-[60px] text-[#173D3B] font-normal tracking-tight leading-[1.1]">
              Connect with Havenstone Senior Partners
            </h1>

            {/* Subtitle */}
            <p className="header-reveal mt-5 text-sm sm:text-base lg:text-lg text-[#555B57] font-light leading-relaxed max-w-2xl">
              Whether seeking private representation for an architecturally significant estate or inquiring regarding confidential off-market acquisitions, our managing partners are prepared to assist.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container (Full width responsive layout) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column (5 cols): Global Headquarters & Regional Network */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col space-y-8">
            {/* Main Headquarters Card */}
            <div className="info-card bg-white rounded-3xl border border-[#E4E1D9] p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#B87556]">
                  GLOBAL HEADQUARTERS
                </span>
                <span className="font-mono text-[10px] uppercase text-[#8A9292]">№ HQ-01</span>
              </div>

              <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#173D3B] mb-6">
                Manhattan Flagship Office
              </h3>

              <div className="space-y-5 text-sm text-[#555B57]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F5EF] text-[#B87556] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <strong className="text-[#173D3B] font-semibold block font-serif text-base mb-0.5">
                      Havenstone Realty Group
                    </strong>
                    <p className="font-light">{siteConfig.contact.primaryAddress}</p>
                    <p className="font-light">{siteConfig.contact.cityStateZip}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-[#E4E1D9]">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F5EF] text-[#B87556] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A9292] font-semibold block">
                      Private Client Desk
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-semibold text-sm text-[#173D3B] hover:text-[#B87556] transition-colors font-mono"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-[#E4E1D9]">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F5EF] text-[#B87556] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A9292] font-semibold block">
                      Advisory Inquiries
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-medium text-sm text-[#173D3B] hover:text-[#B87556] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#E4E1D9]">
                  <div className="w-9 h-9 rounded-xl bg-[#F7F5EF] text-[#B87556] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8A9292] font-semibold block">
                      Consultation Hours
                    </span>
                    <p className="font-medium text-[#173D3B] text-xs sm:text-sm">
                      {siteConfig.contact.officeHours}
                    </p>
                    <p className="text-xs text-[#8A9292] font-light mt-0.5">
                      {siteConfig.contact.weekendNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Desks Panel (Deep Forest Teal) */}
            <div className="info-card bg-[#173D3B] text-white rounded-3xl p-7 sm:p-9 shadow-lg border border-[#B87556]/30">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B87556] block mb-1">
                REGIONAL NETWORK
              </span>
              <h3 className="font-serif italic text-xl sm:text-2xl font-normal mb-6 text-white">
                Principal Market Desks
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siteConfig.offices.map((office) => (
                  <div
                    key={office.city}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#B87556]/50 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building className="w-3.5 h-3.5 text-[#B87556]" />
                      <h4 className="font-serif text-base font-semibold text-white">
                        {office.city}
                      </h4>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B87556] block mb-1 font-mono">
                      {office.area}
                    </span>
                    <p className="text-xs text-slate-300 font-light leading-snug">{office.address}</p>
                    <a
                      href={`tel:${office.phone}`}
                      className="text-xs text-slate-400 hover:text-white mt-2 block font-mono transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Confidential Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              ref={formRef}
              className="bg-white rounded-3xl border border-[#E4E1D9] p-7 sm:p-11 lg:p-12 shadow-sm"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-[#173D3B] text-[#B87556] flex items-center justify-center mb-5 shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B87556] mb-2">
                    CONFIDENTIAL COMMUNICATION LOGGED
                  </span>

                  <h3 className="font-serif italic text-3xl sm:text-4xl font-normal text-[#173D3B] mb-3">
                    Thank You, {formData.name}
                  </h3>

                  <p className="text-sm sm:text-base text-[#555B57] max-w-lg mb-8 leading-relaxed font-light">
                    Your inquiry regarding <strong>{formData.subject}</strong> has been received by our senior partner desk. A managing partner will review your communication and follow up promptly.
                  </p>

                  <div className="w-full bg-[#F7F5EF] border border-[#E4E1D9] rounded-2xl p-6 text-left text-xs text-[#555B57] mb-8">
                    <div className="flex items-center gap-2 font-semibold text-[#173D3B] mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#B87556]" />
                      <span className="text-xs uppercase tracking-wider">Client Representation Note</span>
                    </div>
                    <p className="leading-relaxed font-light">
                      All communications transmitted through this portal are treated as privileged and confidential under Havenstone private brokerage advisory protocols.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#173D3B] hover:bg-[#B87556] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-8 border-b border-[#E4E1D9] pb-6">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                      CONFIDENTIAL INQUIRY
                    </span>
                    <h3 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173D3B] mt-1.5">
                      Initiate a Private Advisory Conversation
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555B57] mt-2 leading-relaxed font-light">
                      All correspondence is held in the strictest professional confidence. We respond within one business day.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-2">
                        Full Name <span className="text-[#B87556]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8A9292] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          name="name"
                          placeholder="e.g. Sterling Hayes"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border rounded-xl pl-10 pr-4 py-3 text-sm text-[#303B3A] placeholder-[#8A9292] font-normal focus:outline-none transition-all ${
                            errors.name
                              ? "border-red-400 focus:ring-1 focus:ring-red-400"
                              : "border-[#E4E1D9] focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-2">
                          Email Address <span className="text-[#B87556]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#8A9292] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            name="email"
                            placeholder="e.g. s.hayes@investmentgroup.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border rounded-xl pl-10 pr-4 py-3 text-sm text-[#303B3A] placeholder-[#8A9292] font-normal focus:outline-none transition-all ${
                              errors.email
                                ? "border-red-400 focus:ring-1 focus:ring-red-400"
                                : "border-[#E4E1D9] focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
                            }`}
                          />
                        </div>
                        {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-2">
                          Phone Number <span className="text-[#8A9292] font-light lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#8A9292] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+1 (212) 555-0199"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] rounded-xl pl-10 pr-4 py-3 text-sm text-[#303B3A] placeholder-[#8A9292] font-normal focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Area of Interest */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-2">
                        Matter of Consultation / Focus Area
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full appearance-none bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border border-[#E4E1D9] rounded-xl px-4 py-3 text-sm text-[#303B3A] font-medium focus:outline-none focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556] cursor-pointer transition-all"
                      >
                        <option value="Property Acquisition">Property Acquisition &amp; Private Buyer Mandate</option>
                        <option value="Private Off-Market Sale">Private Off-Market Sale / Seller Representation</option>
                        <option value="Luxury Lease & Relocation">Luxury Lease &amp; Corporate Relocation</option>
                        <option value="Portfolio Valuation & Advisory">Portfolio Valuation &amp; Asset Advisory</option>
                        <option value="Press & Media Inquiries">Press &amp; Institutional Media Inquiries</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#173D3B] mb-2">
                        Confidential Narrative / Details <span className="text-[#B87556]">*</span>
                      </label>
                      <textarea
                        rows="4"
                        name="message"
                        placeholder="Please specify any target regions, architectural styles, acquisition timelines, or confidential parameters..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full bg-[#F7F5EF] hover:bg-[#FAF8F5] focus:bg-white border rounded-xl p-4 text-sm text-[#303B3A] placeholder-[#8A9292] font-normal focus:outline-none transition-all resize-none ${
                          errors.message
                            ? "border-red-400 focus:ring-1 focus:ring-red-400"
                            : "border-[#E4E1D9] focus:ring-1 focus:ring-[#B87556] focus:border-[#B87556]"
                        }`}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group inline-flex items-center justify-center gap-3 bg-[#173D3B] hover:bg-[#B87556] text-white py-4 px-8 rounded-xl text-xs uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-md cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Advisory Request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          <span>Transmit Private Consultation Request</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-[#8A9292] text-center leading-normal pt-1 font-light">
                      Protected by end-to-end institutional discretion protocols. Direct partner assignment within 24 hours.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
