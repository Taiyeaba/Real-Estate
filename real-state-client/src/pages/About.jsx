import { Link } from "react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { siteConfig } from "../data/siteConfig";

const About = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <SectionHeading
          overline="Corporate Profile"
          title="Curators of Architectural Living"
          description="Havenstone Realty represents an uncompromising commitment to architectural distinction, discretion, and high-touch private real estate advisory."
        />
      </div>

      {/* Hero Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#E4E1D9]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Havenstone Architectural Vision"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173D3B]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#B87556] block mb-1">
              Established {siteConfig.brand.establishedYear}
            </span>
            <p className="font-serif text-xl font-bold">
              Guiding Generational Assets with Enduring Purpose
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#B87556]">
            Our Advisory Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#173D3B] leading-snug">
            We operate at the intersection of architectural heritage and private wealth stewardship.
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Conventional residential brokerage prioritizes volume. Havenstone was founded upon a counter-philosophy: deliberate curation. We selectively represent homes of exceptional pedigree—properties whose design integrity, materials, and siting transcend transient market cycles.
          </p>
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
            From modern glass pavilions perched above Los Angeles to historic limestone townhouses along New York's park avenues, our advisors serve as trusted counsel to private individuals, family offices, and architectural conservators worldwide.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#173D3B] hover:bg-[#B87556] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#E4E1D9] hover:bg-slate-50 text-[#173D3B] text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <span>Contact Senior Partners</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Advisory Principles Grid */}
      <div className="mb-20">
        <SectionHeading
          overline="Four Pillars"
          title="The Havenstone Principles"
          description="Every advisory mandate and property representation is governed by four core institutional tenets."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.whyChooseUs.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E4E1D9] shadow-sm flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F7F5EF] text-[#B87556] flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#173D3B] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Stats Bar */}
      <div className="mb-20 bg-[#173D3B] text-white rounded-2xl p-8 sm:p-12 shadow-lg border border-[#B87556]/20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {siteConfig.stats.map((stat, idx) => (
            <div key={stat.label} className={`flex flex-col items-center ${idx > 0 ? "pt-4 lg:pt-0" : ""}`}>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#B87556] mb-1">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold text-white mb-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-300 max-w-[180px] leading-tight">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Global Presence Section */}
      <div className="mb-16" id="offices">
        <SectionHeading
          overline="Global Network"
          title="Primary Advisory Locations"
          description="Headquartered in New York with dedicated advisory desks across the world's most sought-after property centers."
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.offices.map((office) => (
            <div
              key={office.city}
              className="bg-white rounded-2xl p-6 border border-[#E4E1D9] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#F7F5EF] text-[#173D3B] flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-[#B87556]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#173D3B]">
                  {office.city}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#B87556] font-semibold block mb-3">
                  {office.area}
                </span>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  {office.address}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E1D9] text-xs text-[#173D3B] font-mono">
                <p>{office.phone}</p>
                <p className="text-[#6B7280] font-sans truncate mt-0.5">{office.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-[#F7F5EF] border border-[#E4E1D9] rounded-2xl p-8 sm:p-10 text-center">
        <h3 className="font-serif text-2xl font-semibold text-[#173D3B] mb-2">
          Experience the Havenstone Difference
        </h3>
        <p className="text-sm text-[#6B7280] max-w-lg mx-auto mb-6">
          Schedule a private conversation with our managing partners to explore current acquisition opportunities or discuss confidential representation.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#173D3B] hover:bg-[#B87556] text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
        >
          <span>Connect with an Advisor</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default About;
