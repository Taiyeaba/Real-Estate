import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Car,
  Layers,
  Sparkles,
  Check,
  Building,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import PropertyGallery from "../components/PropertyGallery";
import PropertyInquiryForm from "../components/PropertyInquiryForm";
import PropertyCard from "../components/PropertyCard";
import SectionHeading from "../components/SectionHeading";
import Loader from "../shared/Loader";
import { siteConfig } from "../data/siteConfig";
import useAxios from "../hooks/useAxios";
import useSmoothScroll from "../hooks/useSmoothScroll";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // Synchronize smooth scrolling
  useSmoothScroll();

  // Fetch property and related properties from MongoDB
  useEffect(() => {
    let isMounted = true;

    // Fetch individual property
    axiosInstance
      .get(`/properties/${id}`)
      .then((res) => {
        if (isMounted) {
          setProperty(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Backend error fetching property:", err.message);
        if (isMounted) {
          setProperty(null);
          setLoading(false);
        }
      });

    // Fetch collection for recommendations
    axiosInstance
      .get("/properties")
      .then((res) => {
        if (isMounted && Array.isArray(res.data)) {
          setAllProperties(res.data);
        }
      })
      .catch(() => {
        if (isMounted) setAllProperties([]);
      });

    return () => {
      isMounted = false;
    };
  }, [id, axiosInstance]);

  // Similar properties recommendation from dynamic MongoDB dataset
  const similarProperties = useMemo(() => {
    if (!property) return [];
    return allProperties
      .filter(
        (p) =>
          p.id !== property.id &&
          p._id !== property._id &&
          (p.propertyType === property.propertyType || p.listingType === property.listingType)
      )
      .slice(0, 3);
  }, [property, allProperties]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F5EF]">
        <Loader />
      </div>
    );
  }

  // Invalid ID graceful fallback
  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-white border border-[#E4E1D9] text-[#B87556] flex items-center justify-center mb-4 shadow-sm">
          <Building className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase tracking-widest font-semibold text-[#B87556] mb-1">
          Reference Unrecognized
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#173D3B] mb-3">
          Residence Not Found
        </h1>
        <p className="text-sm text-[#555B57] mb-8 leading-relaxed font-light">
          We could not locate any active residence with reference ID &ldquo;{id}&rdquo;. This estate may have been privately transacted off-market or archived from our public portfolio.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#173D3B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B87556] transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Properties Portfolio</span>
        </Link>
      </div>
    );
  }

  const isRent = property.listingType === "Rent";

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#303B3A] relative overflow-hidden">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#173D3B]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-[#B87556]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Balanced Luxury Canvas Container (Full-width responsive layout) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 py-8 sm:py-12 relative z-10">
        {/* Back to listings navigation */}
        <div className="mb-6 flex items-center justify-between pb-4 border-b border-[#E4E1D9]">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B87556] hover:text-[#173D3B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </Link>

          <span className="text-xs font-mono text-[#6B7280] uppercase">
            MLS / REF: <span className="font-semibold text-[#173D3B]">{property.id || property._id?.slice(-4)}</span>
          </span>
        </div>

        {/* Main Property Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E4E1D9] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className={`px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full ${
                  isRent
                    ? "bg-[#173D3B] text-white"
                    : "bg-[#173D3B] text-white"
                }`}
              >
                {isRent ? "For Rent" : "For Sale"}
              </span>

              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white text-[#303B3A] border border-[#E4E1D9]">
                {property.propertyType}
              </span>

              {property.featured && (
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-[#B87556] text-white">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Havenstone Curated</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#173D3B] tracking-tight leading-tight mb-2">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#555B57]">
              <MapPin className="w-4 h-4 text-[#B87556] shrink-0" />
              <span>
                {property.address}, {property.location}
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="flex flex-col lg:items-end shrink-0 pt-4 lg:pt-0">
            <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
              {isRent ? "Offered Lease Rate" : "Acquisition Price"}
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#173D3B] tracking-tight">
              {property.priceDisplay}
            </div>
            <span className="text-xs text-[#6B7280] mt-0.5">
              {isRent ? "Long-term private lease agreement" : "Offered fully vetted with private representation"}
            </span>
          </div>
        </div>

        {/* Two Column Layout: Gallery & Details (Left) + Inquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column (8 cols): Gallery, Specs, Description, Amenities */}
          <div className="lg:col-span-8 flex flex-col space-y-8 sm:space-y-10">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-5 rounded-2xl bg-white border border-[#E4E1D9] shadow-sm">
              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-[#E4E1D9] last:border-r-0">
                <Bed className="w-5 h-5 text-[#B87556] mb-1.5" />
                <span className="font-serif text-lg font-bold text-[#173D3B]">
                  {property.bedrooms}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Bedrooms
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-[#E4E1D9] last:border-r-0">
                <Bath className="w-5 h-5 text-[#B87556] mb-1.5" />
                <span className="font-serif text-lg font-bold text-[#173D3B]">
                  {property.bathrooms}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Bathrooms
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center sm:border-r border-[#E4E1D9] last:border-r-0">
                <Maximize2 className="w-5 h-5 text-[#B87556] mb-1.5" />
                <span className="font-serif text-lg font-bold text-[#173D3B]">
                  {property.areaSqFt ? property.areaSqFt.toLocaleString() : "—"}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Interior Sq Ft
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-[#E4E1D9] last:border-r-0">
                <Layers className="w-5 h-5 text-[#B87556] mb-1.5" />
                <span className="font-serif text-sm font-bold text-[#173D3B] truncate max-w-full">
                  {property.lotSize || "Custom"}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Lot / Floor
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center border-r border-[#E4E1D9] last:border-r-0">
                <Calendar className="w-5 h-5 text-[#B87556] mb-1.5" />
                <span className="font-serif text-lg font-bold text-[#173D3B]">
                  {property.yearBuilt || "Recent"}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Year Built
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 text-center">
                <Car className="w-5 h-5 text-[#B87556] mb-1.5" />
                <span className="font-serif text-xs font-bold text-[#173D3B] text-center leading-tight">
                  Included
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Private Parking
                </span>
              </div>
            </div>

            {/* Architectural Provenance Card */}
            {property.architect && (
              <div className="flex items-center gap-4 p-5 rounded-xl bg-white border border-[#E4E1D9] shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#173D3B] text-[#B87556] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#6B7280]">
                    Architectural Provenance
                  </span>
                  <p className="font-serif text-base font-semibold text-[#173D3B]">
                    Designed by {property.architect}
                  </p>
                </div>
              </div>
            )}

            {/* Narrative Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E1D9] shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D3B] mb-4">
                Property Overview &amp; Architectural Narrative
              </h2>
              <div className="text-sm sm:text-base leading-relaxed text-[#555B57] space-y-4 whitespace-pre-line font-light">
                {property.description}
              </div>
            </div>

            {/* Key Amenities & Features */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E1D9] shadow-sm">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#173D3B] mb-6">
                  Residence Features &amp; Amenities
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F7F5EF] border border-[#E4E1D9]"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#173D3B] text-[#B87556] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#173D3B]">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Property Inquiry Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Deep Teal Contrast Inquiry Panel */}
              <PropertyInquiryForm property={property} dark={true} />

              {/* Advisory Office Attribution Card */}
              <div className="bg-white text-[#303B3A] rounded-2xl p-6 shadow-sm border border-[#E4E1D9]">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B87556] block mb-1">
                  Direct Advisory Desk
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#173D3B] mb-2">
                  Havenstone Private Brokerage
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  Private viewings must be scheduled at least 24 hours in advance with proof of funds or verification of representative credentials.
                </p>
                <div className="space-y-2 pt-3 border-t border-[#E4E1D9] text-xs text-[#555B57]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B87556]" />
                    <span>{siteConfig.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#B87556]" />
                    <span>{siteConfig.contact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E4E1D9]">
            <div className="flex items-center justify-between mb-8">
              <SectionHeading
                align="left"
                overline="Portfolio Discovery"
                title="Similar Distinctive Residences"
                description="Explore adjacent properties matching comparable architectural scale or market positioning."
              />
              <Link
                to="/properties"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#173D3B] hover:text-[#B87556] transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
