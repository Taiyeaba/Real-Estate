import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router";
import SectionHeading from "../components/SectionHeading";
import PropertyFilters from "../components/PropertyFilters";
import PropertyGrid from "../components/PropertyGrid";
import Loader from "../shared/Loader";
import { filterProperties } from "../data/properties";
import useAxios from "../hooks/useAxios";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const axiosInstance = useAxios();

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <SectionHeading
          align="left"
          overline="Complete Portfolio"
          title="Exceptional Estates & Residences"
          description="Browse our curated collection of architectural homes, waterfront compounds, and skyline penthouses available for acquisition and luxury lease."
        />
      </div>

      {/* Backend Offline Warning Banner if API fails */}
      {fetchError && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="font-semibold text-sm">Cannot reach Backend Server on Port 3000</p>
            <p className="text-xs text-amber-700 mt-1">
              Make sure your Node server is running in a terminal: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-[11px]">cd real-estate-server && node index.js</code>
            </p>
          </div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 rounded-lg bg-[#173D3B] text-white text-xs font-semibold hover:bg-[#B87556] transition-colors self-start sm:self-center cursor-pointer shadow-sm"
          >
            Retry Connection
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

      {/* Results Grid */}
      <PropertyGrid
        properties={filteredList}
        onReset={handleResetFilters}
        emptyMessage="No properties in our portfolio match the selected combination of criteria. Try adjusting your filters, location, or budget parameters."
      />
    </div>
  );
};

export default Properties;
