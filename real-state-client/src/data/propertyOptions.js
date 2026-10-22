/**
 * Havenstone Realty - Property Filter & Sorting Options
 * Shared options used across Search, Filters, and Navigation components.
 */

export const PROPERTY_TYPES = [
  "All Types",
  "Villa",
  "Penthouse",
  "Apartment",
  "Townhouse",
  "Estate",
];

export const LISTING_TYPES = [
  "All Statuses",
  "Buy",
  "Rent",
];

export const CITIES = [
  "All Locations",
  "New York, NY",
  "Beverly Hills, CA",
  "Miami Beach, FL",
  "Aspen, CO",
  "Austin, TX",
  "Scottsdale, AZ",
  "London, UK",
];

export const BEDROOM_OPTIONS = [
  { label: "Any Bedrooms", value: "all" },
  { label: "1+ Beds", value: "1" },
  { label: "2+ Beds", value: "2" },
  { label: "3+ Beds", value: "3" },
  { label: "4+ Beds", value: "4" },
  { label: "5+ Beds", value: "5" },
];

export const SORT_OPTIONS = [
  { label: "Featured First", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Area: Largest First", value: "area-desc" },
  { label: "Newest Addition", value: "newest" },
];

export const ALL_PRICE_RANGES = [
  { label: "Any Budget", min: 0, max: Infinity },
  { label: "Rentals (< $50k/mo)", min: 0, max: 100000 },
  { label: "Under $20M", min: 100000, max: 20000000 },
  { label: "$20M - $30M", min: 20000000, max: 30000000 },
  { label: "$30M+", min: 30000000, max: Infinity },
];

export const BUY_PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $20M", min: 0, max: 20000000 },
  { label: "$20M - $30M", min: 20000000, max: 30000000 },
  { label: "$30M+", min: 30000000, max: Infinity },
];

export const RENT_PRICE_RANGES = [
  { label: "Any Rent", min: 0, max: Infinity },
  { label: "Under $40,000/mo", min: 0, max: 40000 },
  { label: "$40,000+/mo", min: 40000, max: Infinity },
];
