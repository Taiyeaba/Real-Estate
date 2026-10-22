/**
 * Havenstone Realty - Property Utilities & Filtering Helper
 * Note: All 12 primary property records are now dynamically served directly
 * from the MongoDB database via Express REST API (`GET /properties`).
 *
 * Hardcoded data has been removed from this file.
 */

// Empty array placeholder for backwards compatibility
export const properties = [];

export const getAllProperties = () => [];

export const getFeaturedProperties = () => [];

export const getPropertyById = () => null;

/**
 * Pure filter and sort function
 * Accepts current filter state and the dynamic property array from MongoDB.
 */
export const filterProperties = (
  {
    search = "",
    listingType = "all",
    propertyType = "all",
    city = "all",
    minPrice = 0,
    maxPrice = Infinity,
    bedrooms = "all",
    sortBy = "featured",
  } = {},
  sourceList = []
) => {
  let results = Array.isArray(sourceList) ? [...sourceList] : [];

  // 1. Text Search (title, location, address, architect, tagline)
  if (search && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.address && p.address.toLowerCase().includes(q)) ||
        (p.propertyType && p.propertyType.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.architect && p.architect.toLowerCase().includes(q))
    );
  }

  // 2. Listing Type (Buy / Rent)
  if (listingType && listingType.toLowerCase() !== "all" && listingType.toLowerCase() !== "all statuses") {
    results = results.filter(
      (p) => p.listingType && p.listingType.toLowerCase() === listingType.toLowerCase()
    );
  }

  // 3. Property Type (Villa, Penthouse, etc.)
  if (propertyType && propertyType.toLowerCase() !== "all" && propertyType.toLowerCase() !== "all types") {
    results = results.filter(
      (p) => p.propertyType && p.propertyType.toLowerCase() === propertyType.toLowerCase()
    );
  }

  // 4. City / Location
  if (city && city.toLowerCase() !== "all" && city.toLowerCase() !== "all locations") {
    results = results.filter(
      (p) =>
        (p.city && p.city.toLowerCase().includes(city.toLowerCase())) ||
        (p.location && p.location.toLowerCase().includes(city.toLowerCase()))
    );
  }

  // 5. Price Range
  const min = Number(minPrice) || 0;
  const max = Number(maxPrice) > 0 ? Number(maxPrice) : Infinity;
  results = results.filter((p) => p.price >= min && p.price <= max);

  // 6. Bedrooms
  if (bedrooms && bedrooms !== "all" && bedrooms !== "Any Bedrooms") {
    const minBeds = parseInt(bedrooms, 10);
    if (!isNaN(minBeds)) {
      results = results.filter((p) => p.bedrooms >= minBeds);
    }
  }

  // 7. Sorting
  if (sortBy === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  } else if (sortBy === "area-desc") {
    results.sort((a, b) => b.areaSqFt - a.areaSqFt);
  } else if (sortBy === "newest") {
    results.sort((a, b) => b.yearBuilt - a.yearBuilt);
  } else {
    // Default: Featured first, then highest price
    results.sort((a, b) => {
      if (a.featured === b.featured) {
        return b.price - a.price;
      }
      return a.featured ? -1 : 1;
    });
  }

  return results;
};
