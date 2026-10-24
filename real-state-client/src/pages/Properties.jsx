import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "react-router";
import gsap from "gsap";
import PropertyFilters from "../components/PropertyFilters";
import PropertyGrid from "../components/PropertyGrid";
import Loader from "../shared/Loader";
import { filterProperties } from "../data/properties";
import useAxios from "../hooks/useAxios";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { AlertCircle, RefreshCw } from "lucide-react";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const axiosInstance = useAxios();
  const headerRef = useRef(null);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll();

  // Entrance animation for luxury page header
  useEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.querySelectorAll(".header-reveal"),
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [loading]);

  // Fetch properties from MongoDB via Express API
  const loadProperties = useCallback(() => {
    axiosInstance
      .get("/properties")
      .then((res) => {
        setProperties(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend API connection error:", err);
        setFetchError(err.message || "Failed to reach backend server on port 3000");
        setProperties([]);
        setLoading(false);
      });
  }, [axiosInstance]);

  const handleRetry = () => {
    setLoading(true);
    setFetchError(null);
    loadProperties();
  };

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Extract filters from URL query parameters
  const currentFilters = useMemo(() => {
    return {
      search: searchParams.get("q") || searchParams.get("search") || "",
      listingType: searchParams.get("listingType") || "all",
      propertyType: searchParams.get("type") || searchParams.get("propertyType") || "all",
      city: searchParams.get("city") || "all",
      bedrooms: searchParams.get("bedrooms") || "all",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : Infinity,
      sortBy: searchParams.get("sortBy") || "featured",
    };
  }, [searchParams]);

  // Execute filtering using dynamic data from MongoDB
  const filteredList = useMemo(() => {
    return filterProperties(currentFilters, properties);
  }, [currentFilters, properties]);

  // Handler to update a specific filter and synchronize with URL search params
  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (key === "search") {
      if (value && value.trim()) {
        nextParams.set("q", value.trim());
      } else {
        nextParams.delete("q");
        nextParams.delete("search");
      }
    } else if (key === "listingType") {
      if (value && value !== "all" && value !== "All Statuses") {
        nextParams.set("listingType", value);
      } else {
        nextParams.delete("listingType");
      }
    } else if (key === "propertyType") {
      if (value && value !== "all" && value !== "All Types") {
        nextParams.set("type", value);
      } else {
        nextParams.delete("type");
        nextParams.delete("propertyType");
      }
    } else if (key === "city") {
      if (value && value !== "all" && value !== "All Locations") {
        nextParams.set("city", value);
      } else {
        nextParams.delete("city");
      }
    } else if (key === "bedrooms") {
      if (value && value !== "all") {
        nextParams.set("bedrooms", value);
      } else {
        nextParams.delete("bedrooms");
      }
    } else if (key === "sortBy") {
      if (value && value !== "featured") {
        nextParams.set("sortBy", value);
      } else {
        nextParams.delete("sortBy");
      }
    } else if (key === "priceRange") {
      if (value && typeof value === "object") {
        if (value.min > 0) nextParams.set("minPrice", value.min.toString());
        else nextParams.delete("minPrice");

        if (value.max && value.max !== Infinity) nextParams.set("maxPrice", value.max.toString());
        else nextParams.delete("maxPrice");
      } else {
        nextParams.delete("minPrice");
        nextParams.delete("maxPrice");
      }
    } else if (key === "minPrice") {
      if (Number(value) > 0) {
        nextParams.set("minPrice", value.toString());
      } else {
        nextParams.delete("minPrice");
      }
    } else if (key === "maxPrice") {
      if (Number(value) > 0 && Number(value) !== Infinity) {
        nextParams.set("maxPrice", value.toString());
      } else {
        nextParams.delete("maxPrice");
      }
    }

    setSearchParams(nextParams, { replace: true });
  };

  // Reset all filters to show entire collection
  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#303B3A] relative overflow-hidden">
      {/* Editorial Luxury Page Header */}
      <section className="relative pt-14 pb-12 sm:pt-20 sm:pb-16 border-b border-[#E4E1D9] bg-gradient-to-b from-[#FCFAF5] to-[#F7F5EF] overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 text-center sm:text-left">
          <div ref={headerRef} className="max-w-3xl">
            {/* Eyebrow */}
            <div className="header-reveal flex items-center justify-center sm:justify-start gap-2.5 mb-3.5">
              <span className="w-8 h-[1.5px] bg-[#B87556]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#B87556]">
                THE HAVENSTONE COLLECTION
              </span>
            </div>

            {/* Heading */}
            <h1 className="header-reveal font-serif italic text-3xl sm:text-5xl lg:text-[56px] text-[#173D3B] font-normal tracking-tight leading-[1.12]">
              Exceptional Estates &amp; Residences
            </h1>

            {/* Description */}
            <p className="header-reveal mt-4 text-sm sm:text-base text-[#555B57] font-light leading-relaxed max-w-2xl">
              Browse our curated collection of architectural homes, waterfront compounds, and skyline penthouses available for acquisition and luxury lease.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area (Full page width) */}
      <div className="py-10 sm:py-14 px-4 sm:px-8 lg:px-14 xl:px-20 max-w-[1720px] mx-auto w-full relative z-10">
        {/* Backend Offline Warning Banner if API fails */}
        {fetchError && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200 text-[#173D3B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#B87556] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-[#173D3B]">Cannot reach Backend Server on Port 3000</p>
                <p className="text-xs text-amber-800/80 mt-1">
                  Make sure your Node server is running in a terminal: <code className="bg-amber-100/80 text-[#173D3B] px-1.5 py-0.5 rounded font-mono text-[11px]">cd real-estate-server && node index.js</code>
                </p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#173D3B] text-white text-xs font-semibold hover:bg-[#B87556] transition-colors self-start sm:self-center cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Interactive Filters Panel */}
        <PropertyFilters
          filters={currentFilters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          totalResults={filteredList.length}
          totalCount={properties.length}
        />

        {/* Results Grid - Property Showcase */}
        <PropertyGrid
          properties={filteredList}
          onReset={handleResetFilters}
          emptyMessage="No properties in our portfolio match the selected combination of criteria. Try adjusting your filters, location, or budget parameters."
        />
      </div>
    </div>
  );
};

export default Properties;
