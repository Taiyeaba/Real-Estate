import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Compass, Building2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PropertyCard from "../components/PropertyCard";
import PropertySearch from "../components/PropertySearch";
import Loader from "../shared/Loader";
import { siteConfig } from "../data/siteConfig";
import useAxios from "../hooks/useAxios";

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("/properties")
      .then((res) => {
        if (isMounted) {
          const data = res.data;
          if (Array.isArray(data) && data.length > 0) {
            const featured = data.filter((p) => p.featured);
            setFeaturedProperties(featured.length > 0 ? featured : data.slice(0, 6));
          } else {
            setFeaturedProperties([]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Backend error fetching properties:", err.message);
        if (isMounted) {
          setFeaturedProperties([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [axiosInstance]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#173D3B]">
        {/* Architectural Background Image with Balanced Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Havenstone Fine Architecture"
            className="w-full h-full object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
          />
          {/* Subtle multidirectional dark gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#173D3B] via-[#173D3B]/50 to-black/60" />
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center pt-8 sm:pt-16 pb-10">
          {/* Subtle Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#B87556] text-xs uppercase tracking-[0.25em] font-semibold mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B87556] animate-ping" />
            <span>Curated Architectural Portfolio</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.15] drop-shadow-md">
            Distinctive Properties for Discerning Lifestyles
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-light">
            Havenstone Realty represents an exclusive collection of architecturally
            distinguished residences, skyline penthouses, and private coastal estates.
          </p>
        </div>

        {/* Hero Search Panel (Interactive & Functional) */}
        <div className="relative z-10 w-full mb-4">
          <PropertySearch />
        </div>

        {/* Subtle Bottom Trust Badges */}
        <div className="relative z-10 max-w-5xl mx-auto w-full pt-6 border-t border-white/10 hidden sm:grid grid-cols-3 gap-6 text-center text-xs text-slate-300">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B87556]" />
            <span>Strict Client Confidentiality & NDAs</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-[#B87556]" />
            <span>Vetted Architectural Provenance</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-[#B87556]" />
            <span>Prime Urban & Coastal Global Markets</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* 3. PROPERTY CATEGORIES SECTION */}
      <section className="py-20 bg-white border-y border-[#E4E1D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline="Portfolio Exploration"
            title="Browse by Architectural Style"
            description="From sky-high metropolitan penthouses to tranquil waterfront estates, discover residences tailored to your living preference."
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.propertyCategories.map((category) => (
              <Link
                key={category.id}
                to={`/properties?type=${category.type}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block border border-[#E4E1D9]"
              >
                {/* Background Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173D3B] via-[#173D3B]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B87556] mb-1">
                    {category.countText}
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-[#B87556] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed mb-3">
                    {category.tagline}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/90 group-hover:text-[#B87556] transition-colors">
                    <span>Explore Residences</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US / VALUE PROPOSITION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SectionHeading
          overline="The Havenstone Standard"
          title="Why Discerning Clients Entrust Us"
          description="In an era of generic listings, Havenstone Realty operates as a private advisory firm prioritizing discretion, structural integrity, and rigorous valuation intelligence."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.whyChooseUs.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-[#E4E1D9] shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-[#F7F5EF] border border-[#E4E1D9] text-[#173D3B] flex items-center justify-center mb-5 group-hover:border-[#B87556] transition-colors">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B87556]" />
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#173D3B] mb-2.5">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Company Key Statistics Bar */}
        <div className="mt-14 bg-[#173D3B] text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-[#B87556]/20">
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
      </section>

      {/* 5. CONTACT CTA SECTION */}
      <section className="relative py-20 bg-[#F7F5EF] border-t border-[#E4E1D9] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
            Direct Advisory Line: <strong className="text-[#173D3B]">{siteConfig.contact.phone}</strong> &bull; {siteConfig.contact.officeHours}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;