/**
 * Havenstone Realty - Site Configuration
 * Centralized site-wide branding, contact information, navigation, and company values.
 * All customer-facing content is easily editable here.
 */

export const siteConfig = {
  brand: {
    name: "Havenstone Realty",
    shortName: "Havenstone",
    tagline: "Fine Estates & Architectural Residences",
    establishedYear: 2008,
    licenseNumber: "DRE #01928472 | NY DOS #10401293847",
    description:
      "Havenstone Realty represents the world's most distinguished properties, pairing discerning clients with architecturally significant residences and private estates across premier global markets.",
  },

  contact: {
    primaryAddress: "740 Park Avenue, 18th Floor",
    cityStateZip: "New York, NY 10021",
    country: "United States",
    fullAddress: "740 Park Avenue, 18th Floor, New York, NY 10021",
    phone: "+1 (212) 897-4200",
    phoneDisplay: "+1 (212) 897-4200",
    email: "advisory@havenstonerealty.com",
    inquiriesEmail: "inquiries@havenstonerealty.com",
    pressEmail: "press@havenstonerealty.com",
    officeHours: "Monday – Friday: 9:00 AM – 6:00 PM EST",
    weekendNote: "Private weekend showings available by appointment",
  },

  offices: [
    {
      city: "New York",
      area: "Manhattan Flagship",
      address: "740 Park Avenue, 18th Floor",
      phone: "+1 (212) 897-4200",
      email: "ny@havenstonerealty.com",
    },
    {
      city: "Beverly Hills",
      area: "West Coast Advisory",
      address: "9560 Wilshire Blvd, Suite 400",
      phone: "+1 (310) 742-9100",
      email: "la@havenstonerealty.com",
    },
    {
      city: "Miami Beach",
      area: "South Florida & Caribbean",
      address: "1111 Lincoln Road, Penthouse",
      phone: "+1 (305) 612-8800",
      email: "miami@havenstonerealty.com",
    },
    {
      city: "London",
      area: "European Desk",
      address: "24 Berkeley Square, Mayfair",
      phone: "+44 (0)20 7946 0850",
      email: "london@havenstonerealty.com",
    },
  ],

  stats: [
    {
      value: "$2.8B+",
      label: "Portfolio Volume",
      description: "Represented across premier urban and coastal enclaves",
    },
    {
      value: "16+",
      label: "Years of Advisory",
      description: "Uninterrupted stewardship of private real estate holdings",
    },
    {
      value: "99.2%",
      label: "Client Retention",
      description: "Generational relationships with private collectors and families",
    },
    {
      value: "42",
      label: "Global Markets",
      description: "Direct partner network across the US, Europe, and UAE",
    },
  ],

  whyChooseUs: [
    {
      id: "curated-portfolio",
      title: "Vetted Architectural Pedigree",
      description:
        "Every property in our collection is rigorously assessed for architectural integrity, site orientation, and enduring asset value. We intentionally reject generic builds in favor of residences with enduring character.",
      iconName: "Compass",
    },
    {
      id: "discreet-transactions",
      title: "Confidential Advisory",
      description:
        "High-value transactions demand absolute discretion. We specialize in off-market representation, private non-disclosure agreements, and tailored advisory for individuals, family offices, and trusts.",
      iconName: "ShieldCheck",
    },
    {
      id: "market-intelligence",
      title: "Proprietary Market Analytics",
      description:
        "Beyond conventional MLS statistics, our advisory team provides bespoke neighborhood price-per-square-foot trendlines, historical trade velocity, and private liquidity metrics.",
      iconName: "TrendingUp",
    },
    {
      id: "end-to-end",
      title: "Comprehensive Concierge",
      description:
        "From preliminary private walkthroughs and structural due diligence to bespoke closing coordination and post-acquisition transition services, our team stays dedicated throughout.",
      iconName: "KeyRound",
    },
  ],

  propertyCategories: [
    {
      id: "villas",
      name: "Architectural Villas",
      type: "Villa",
      tagline: "Private sanctuaries with seamless indoor-outdoor living",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      countText: "Exclusive Estates",
    },
    {
      id: "penthouses",
      name: "Skyline Penthouses",
      type: "Penthouse",
      tagline: "Elevated living with panoramic urban and coastal horizons",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      countText: "Crown Residences",
    },
    {
      id: "apartments",
      name: "Luxury Residences",
      type: "Apartment",
      tagline: "Refined city apartments in premier cultural districts",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      countText: "Prime City Living",
    },
    {
      id: "townhouses",
      name: "Historic Townhomes",
      type: "Townhouse",
      tagline: "Classic facades harboring modern bespoke interiors",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      countText: "Heritage Properties",
    },
  ],

  navLinks: [
    { label: "Home", path: "/" },
    { label: "Properties", path: "/properties" },
    { label: "Buy", path: "/properties?listingType=Buy" },
    { label: "Rent", path: "/properties?listingType=Rent" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],

  footerLinks: {
    portfolio: [
      { label: "Featured Listings", path: "/properties?featured=true" },
      { label: "Properties for Sale", path: "/properties?listingType=Buy" },
      { label: "Luxury Rentals", path: "/properties?listingType=Rent" },
      { label: "Architectural Villas", path: "/properties?type=Villa" },
      { label: "Skyline Penthouses", path: "/properties?type=Penthouse" },
    ],
    company: [
      { label: "About Havenstone", path: "/about" },
      { label: "Our Advisory Approach", path: "/about#approach" },
      { label: "Global Presence", path: "/about#offices" },
      { label: "Private Inquiries", path: "/contact" },
    ],
    locations: [
      { label: "New York Properties", path: "/properties?city=New+York" },
      { label: "Beverly Hills Properties", path: "/properties?city=Beverly+Hills" },
      { label: "Miami Beach Properties", path: "/properties?city=Miami+Beach" },
      { label: "Aspen Properties", path: "/properties?city=Aspen" },
      { label: "London Properties", path: "/properties?city=London" },
    ],
  },
};
