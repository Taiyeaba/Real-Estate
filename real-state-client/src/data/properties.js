/**
 * Havenstone Realty - Master Demo Property Dataset
 * Centralized repository of all sample properties, metadata, and query helpers.
 * In a future phase, this can be seamlessly substituted by an API or database service.
 */

export const properties = [
  {
    id: "hr-101",
    slug: "the-bel-air-promontory",
    title: "The Bel-Air Promontory Estate",
    tagline: "A modernist architectural triumph perched above the Los Angeles basin",
    price: 24500000,
    priceDisplay: "$24,500,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Villa",
    location: "Beverly Hills, CA",
    address: "10948 Bellagio Road",
    city: "Beverly Hills, CA",
    state: "CA",
    zipCode: "90077",
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 12400,
    lotSize: "1.65 Acres",
    yearBuilt: 2023,
    parking: "6-Car Temperature-Controlled Gallery",
    featured: true,
    architect: "Marmol Radziner",
    images: [
      "https://i.ibb.co.com/4w71S8kV/lycs-architecture-k-Udb-EEMc-Rw-E-unsplash.jpg",
      "https://i.ibb.co.com/0p3dF6rf/pexels-artbovich-8135492.jpg",
      "https://i.ibb.co.com/GQv4sY95/pexels-shaza-jocarlos-841367558-39829574.jpg",
      "https://i.ibb.co.com/CKjZVnRy/pexels-shaza-jocarlos-841367558-39017614.jpg",
    ],
    description:
      "Commanding an unrivaled promontory behind private gates in prestigious Bel-Air, this architectural masterpiece marries organic materiality with precision engineering. Designed to blur boundaries between interior gallery spaces and the Southern California horizon, floor-to-ceiling motorized Fleetwood glass reveals 270-degree canyon-to-ocean vistas.\n\nThe primary suite occupies its own private wing with dual spa baths, bookmatched Calacatta marble, and custom Poliform dressing rooms. Outside, a 75-foot zero-edge infinity pool appears suspended above the hills, complemented by an outdoor culinary pavilion, sunken fire pit lounge, and subterranean 1,500-bottle wine tasting vault.",
    amenities: [
      "75ft Infinity-Edge Swimming Pool",
      "1,500-Bottle Subterranean Wine Cellar",
      "Dolby Atmos Private Screening Room",
      "Wellness Wing with Cedar Sauna & Cold Plunge",
      "Smart Home Automation (Crestron & Lutron)",
      "Motorized Fleetwood Glass Wall Systems",
      "Separate Guest Pavilion & Staff Quarters",
      "Gated Motor Court with 24/7 Security Integration",
    ],
  },
  {
    id: "hr-102",
    slug: "park-avenue-triplex-penthouse",
    title: "Park Avenue Triplex Penthouse",
    tagline: "Unprecedented crown triplex hovering over Central Park and the Manhattan skyline",
    price: 36000000,
    priceDisplay: "$36,000,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Penthouse",
    location: "New York, NY",
    address: "720 Park Avenue, Penthouse A",
    city: "New York, NY",
    state: "NY",
    zipCode: "10021",
    bedrooms: 5,
    bathrooms: 6.5,
    areaSqFt: 8850,
    lotSize: "2,200 sqft Wrap Terrace",
    yearBuilt: 2021,
    parking: "Deeded Underground Valet Space",
    featured: true,
    architect: "Robert A.M. Stern Architects",
    images: [
      "https://i.ibb.co.com/xRMpVCW/frames-for-your-heart-2d4l-AQAlb-DA-unsplash.jpg",
      "https://i.ibb.co.com/JjFwS867/zac-gudakov-95-UK5a-Vgx54-unsplash.jpg",
      "https://i.ibb.co.com/tpSzZ5cv/pexels-ansar-muhammad-380085065-27562206.jpg",
      "https://i.ibb.co.com/B2BRZtSp/pexels-shaza-jocarlos-841367558-39733020.jpg",
    ],
    description:
      "Occupying the top three floors of one of the Upper East Side's most celebrated limestone towers, Penthouse A represents the apex of Manhattan vertical living. Direct elevator access opens into a double-height grand gallery anchored by a sculptural bronze-and-travertine staircase.\n\nFormal entertaining spaces feature 14-foot ceiling heights, herringbone French white oak parquet, and three wood-burning fireplaces with hand-carved stone mantels. A continuous wrap-around loggia delivers panoramic vistas of Central Park, the Reservoir, and the dramatic skyline architecture of Billionaires' Row.",
    amenities: [
      "2,200 sqft Landscaped Wrap Terrace",
      "Direct Keyed Elevator Access",
      "Three Wood-Burning St. Clair Limestone Fireplaces",
      "Custom Boffi Chef's Kitchen & Butler's Pantry",
      "Private Internal Glass Elevator",
      "White-Glove Doorman & Concierge Services",
      "Private Fitness Studio & Heated Pool Access",
      "Integrated Humidification & Art Lighting",
    ],
  },
  {
    id: "hr-103",
    slug: "historic-upper-east-townhouse",
    title: "The Stanford White Townhouse",
    tagline: "Meticulously restored Gilded Age limestone mansion with private carriage garden",
    price: 19800000,
    priceDisplay: "$19,800,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Townhouse",
    location: "New York, NY",
    address: "64 East 73rd Street",
    city: "New York, NY",
    state: "NY",
    zipCode: "10021",
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 9400,
    lotSize: "25ft x 102ft Lot",
    yearBuilt: 1912,
    parking: "Curb-Cut Garage Permit Included",
    featured: true,
    architect: "McKim, Mead & White (Restoration: Peter Marino)",
    images: [
      "https://i.ibb.co.com/G3ThbWYK/pexels-ron-greenberg-1098633379-20708166.jpg",
      "https://i.ibb.co.com/DHYwPXTV/pexels-artbovich-7174386.jpg",
      "https://i.ibb.co.com/HJp4Vc6/lotus-design-n-print-7v5r-Os-M6-Fbc-unsplash.jpg",
      "https://i.ibb.co.com/CpHZvsqc/lotus-design-n-print-Rn-Ao-ha4bp-M-unsplash.jpg",
    ],
    description:
      "A rare 25-foot-wide neoclassical limestone mansion on one of the Upper East Side's most coveted park blocks. Conceived during the Gilded Age and recently brought to modern mechanical perfection over a four-year restoration, the residence spans six lavishly appointed levels.\n\nHighlights include original mahogany wood paneling, an English basement with private wine cave, a full-floor primary suite with dual marble dressing boudoirs, and a rooftop observatory garden overlooking iconic pre-war townscapes.",
    amenities: [
      "Private South-Facing English Boxwood Garden",
      "Six Levels Served by Commercial-Grade Elevator",
      "Hand-Carved Mahogany Library",
      "Rooftop Terrace with Gas Fireplace",
      "Sub-Basement Spa & Infrared Sauna",
      "Geothermal Climate Control & Energy Efficiency",
      "Full Security Perimeter with Biometric Access",
      "Separate Ground-Floor Staff Apartment",
    ],
  },
  {
    id: "hr-104",
    slug: "star-island-modern-waterfront",
    title: "The Star Island Coastal Sanctuary",
    tagline: "Tropical modernist waterfront sanctuary with 100 feet of deepwater dockage",
    price: 32000000,
    priceDisplay: "$32,000,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Estate",
    location: "Miami Beach, FL",
    address: "32 Star Island Drive",
    city: "Miami Beach, FL",
    state: "FL",
    zipCode: "33139",
    bedrooms: 7,
    bathrooms: 9,
    areaSqFt: 14200,
    lotSize: "0.95 Acres",
    yearBuilt: 2022,
    parking: "8-Vehicle Air-Conditioned Showroom",
    featured: true,
    architect: "SAOTA Architecture",
    images: [
      "https://i.ibb.co.com/PzWjCSFp/pexels-wiki15-canton-598594475-28681443.jpg",
      "https://i.ibb.co.com/v4T12wCV/pexels-s3t-koncepts-1636465088-28853352.jpg",
      "https://i.ibb.co.com/kVjLPQQZ/pexels-curtis-adams-1694007-4682110.jpg",
      "https://i.ibb.co.com/gMwW6gpM/pexels-the-r-e-editor-849420489-28272353.jpg",
    ],
    description:
      "Situated in Miami Beach's premier guard-gated island sanctuary, this SAOTA-designed waterfront retreat represents the vanguard of subtropical luxury. Sweeping cantilevered rooflines float above expansive living galleries clad in Brazilian ipe wood and Italian travertine.\n\nOutside, lush tropical gardens framed by mature royal palms lead to a 100-foot private deepwater yacht dock accommodating vessels up to 130 feet. Features include an infinity-edge perimeter pool, outdoor Teppanyaki kitchen, private dockside cabana, and unobstructed sunset views over the Biscayne Bay skyline.",
    amenities: [
      "100ft Deepwater Dock for Superyachts",
      "Infinity-Edge Saline Pool & Reflecting Ponds",
      "Outdoor Kitchen with Wood-Fired Pizza Oven",
      "Full Spa with Steam Room & Ice Bath",
      "Automated Solar Shading & Impact Louvers",
      "Rooftop Stargazing Deck & Sunset Bar",
      "24/7 Island Guard Patrol & Secure Perimeter",
      "Generator with 10-Day Uninterrupted Power Backup",
    ],
  },
  {
    id: "hr-105",
    slug: "aspen-red-mountain-retreat",
    title: "Red Mountain Alpine Sanctuary",
    tagline: "Panoramic ski-in contemporary retreat perched above Aspen Valley",
    price: 28500000,
    priceDisplay: "$28,500,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Villa",
    location: "Aspen, CO",
    address: "410 Willoughby Way",
    city: "Aspen, CO",
    state: "CO",
    zipCode: "81611",
    bedrooms: 5,
    bathrooms: 7,
    areaSqFt: 10600,
    lotSize: "2.1 Acres",
    yearBuilt: 2022,
    parking: "Heated 3-Car Snowmelt Garage",
    featured: false,
    architect: "Charles Cunniffe Architects",
    images: [
      "https://i.ibb.co.com/gLRx8hvx/pexels-sn-che-3918651-9643118.jpg",
      "https://i.ibb.co.com/YF5QbbR8/pexels-fhstudio-13201481.jpg",
      "https://i.ibb.co.com/GfSX7ZgZ/pexels-michaelgaultphotos-10258633.jpg",
      "https://i.ibb.co.com/YTBRXcvv/pexels-artbovich-7061677.jpg",
    ],
    description:
      "Perched in Aspen's most revered neighborhood, Red Mountain, this architectural masterpiece captures sweeping vistas extending from Independence Pass across Aspen Mountain to Mt. Sopris. Constructed from native Colorado sandstone, structural steel, and reclaimed timber, it marries mountain majesty with museum-level finishing.\n\nHeated stone terraces allow year-round outdoor entertaining, complete with a sunken hot tub overlooking snowy peaks. A dedicated ski-tuning locker room, oxygen-enriched primary bedroom suite, and two-story stone fireplace make this the definitive Colorado winter residence.",
    amenities: [
      "Heated Snowmelt Terraces & Driveway",
      "Oxygen-Enriched Primary Suite for Altitude Comfort",
      "Dedicated Ski & Snowboard Equipment Lounge",
      "Sunken 12-Person Mountain Vista Hot Tub",
      "Two-Story Floor-to-Ceiling Sandstone Hearth",
      "Subterranean Tasting Room & Cigar Lounge",
      "Direct Trail Access to Hunter Creek",
      "Integrated Whole-Home Sound & AV Distribution",
    ],
  },
  {
    id: "hr-106",
    slug: "tribeca-cast-iron-loft",
    title: "Tribeca Cobblestone Loft",
    tagline: "Authentic corner loft with Corinthian columns and 13-foot ceilings",
    price: 38000,
    priceDisplay: "$38,000/mo",
    currency: "USD",
    period: "month",
    listingType: "Rent",
    propertyType: "Apartment",
    location: "New York, NY",
    address: "77 Franklin Street, Floor 4",
    city: "New York, NY",
    state: "NY",
    zipCode: "10013",
    bedrooms: 3,
    bathrooms: 3.5,
    areaSqFt: 4600,
    lotSize: "Full Floor Plate",
    yearBuilt: 2020,
    parking: "Nearby Deeded Garage Garage Available",
    featured: true,
    architect: "Annabelle Selldorf",
    images: [
      "https://i.ibb.co.com/YFVtm4VT/point3d-commercial-imaging-ltd-45-1t-ND3k-unsplash.jpg",
      "https://i.ibb.co.com/hJTC2w2c/pexels-gerdiephotography-g-2148876750-34909557.jpg",
      "https://i.ibb.co.com/60vrcSLs/pexels-curtis-adams-1694007-36777567.jpg",
      "https://i.ibb.co.com/mpY9H50/aalo-lens-Xph-EJ-22v-E-unsplash-1.jpg",
    ],
    description:
      "Available for bespoke long-term leasing, this full-floor corner residence in the historic Tribeca West landmark district blends authentic 19th-century cast-iron architectural bones with Selldorf Architects' restrained modern refinement.\n\nTwenty-four oversized double-hung windows flood the gallery living room with natural light throughout the day. Custom Danish oak millwork, Bulthaup kitchen fixtures, Gaggenau 400-series appliances, and a serene spa bathroom wrapped in honed Pietra d'Avola stone create an unforgettable downtown haven.",
    amenities: [
      "Key-Locked Elevator Opening Direct to Residence",
      "Original Restored Cast-Iron Architectural Columns",
      "Custom Bulthaup Kitchen with Gaggenau Appliances",
      "Primary Suite with Dual Walk-In Wardrobes",
      "Honed Pietra d'Avola Marble Wet Rooms",
      "Acoustic Soundproofing Glass Installation",
      "Dedicated Full-Time Building Superintendent",
      "Furnished or Unfurnished Flexibility",
    ],
  },
  {
    id: "hr-107",
    slug: "mayfair-mansion-residence",
    title: "The Grosvenor Mayfair Residence",
    tagline: "Regal Grade-II listed residence moments from Berkeley Square and Hyde Park",
    price: 48000,
    priceDisplay: "£48,000/mo ($62,000)",
    currency: "USD",
    period: "month",
    listingType: "Rent",
    propertyType: "Townhouse",
    location: "London, UK",
    address: "18 Upper Grosvenor Street",
    city: "London, UK",
    state: "London",
    zipCode: "W1K 7PE",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 7200,
    lotSize: "Private Mews Access",
    yearBuilt: 1895,
    parking: "Private Gated Mews Garage",
    featured: false,
    architect: "Sir Aston Webb (Refurbished 2023)",
    images: [
      "https://i.ibb.co.com/RGDhnVYj/pexels-wiki15-canton-598594475-28681441.jpg",
      "https://i.ibb.co.com/bScgf7C/frames-for-your-heart-z-SG-kd-L6vw-unsplash.jpg",
      "https://i.ibb.co.com/RpDWMKDM/pexels-ranamatloob567-27923189.jpg",
      "https://i.ibb.co.com/Hf7RQMTq/pexels-jonathanborba-10153048.jpg",
    ],
    description:
      "A peerless Grade-II listed Mayfair townhouse offering the highest standards of international turnkey luxury. Meticulously brought into the modern era while preserving grand Portland stone balustrades, classical ceiling mouldings, and towering sash apertures.\n\nFeatures include a private passenger lift servicing every level, state-of-the-art cinema, private temperature-controlled subterranean wine room, dedicated security command desk, and private rear access leading to an integral two-car mews garage.",
    amenities: [
      "Grade-II Listed Historic English Heritage Facade",
      "Internal Passenger Lift Serving All Floors",
      "Private Heated Courtyard Garden",
      "Private Mews Garage with Direct Internal Entry",
      "Subterranean Cinema & Cocktail Bar",
      "24-Hour Concierge & Security Monitoring",
      "Air Conditioning Throughout (Rare for Mayfair)",
      "Proximity to Claridge's & Mount Street Boutiques",
    ],
  },
  {
    id: "hr-108",
    slug: "biscayne-bay-modernist-rental",
    title: "Venetian Islands Sunset Villa",
    tagline: "Turnkey waterfront villa with infinity pool and private boat slip",
    price: 45000,
    priceDisplay: "$45,000/mo",
    currency: "USD",
    period: "month",
    listingType: "Rent",
    propertyType: "Villa",
    location: "Miami Beach, FL",
    address: "214 San Marino Drive",
    city: "Miami Beach, FL",
    state: "FL",
    zipCode: "33139",
    bedrooms: 5,
    bathrooms: 5.5,
    areaSqFt: 6800,
    lotSize: "0.45 Acres",
    yearBuilt: 2021,
    parking: "2-Car Covered Porte-Cochere",
    featured: true,
    architect: "Max Strang Architecture",
    images: [
      "https://i.ibb.co.com/xKCRV2tG/salman-saqib-Wa-C-JFf-F21-M-unsplash.jpg",
      "https://i.ibb.co.com/RkXMJRnH/pexels-reyd-valencia-2159301653-36829724.jpg",
      "https://i.ibb.co.com/rKhP2tdz/aalo-lens-Ez7fz5mavj0-unsplash.jpg",
      "https://i.ibb.co.com/mrqnZjjP/pexels-gerson-lozano-1316808-15468160.jpg",
    ],
    description:
      "A breathtaking modern waterfront lease opportunity on the exclusive Venetian Islands. Offering open bay views framed by lush native landscaping, this residence was designed specifically for indoor-outdoor Florida living.\n\nFully appointed with bespoke Italian furnishings by Minotti and B&B Italia, the home features an open-concept great room, private office overlooking the water, infinity pool with integrated spa, and an expansive rooftop terrace enjoying uninterrupted sunset panoramas of the Downtown Miami skyline.",
    amenities: [
      "Private Boat Lift Supporting Vessels to 45ft",
      "Infinity-Edge Saltwater Pool & Spa",
      "Turnkey Italian Furnishings Included",
      "Rooftop Deck with Downtown Skyline Views",
      "Summer Kitchen with Built-In Infrared Grill",
      "Electric Car Charging Station (Dual Tesla)",
      "Smart Surveillance & High-Speed Mesh Wi-Fi",
      "Bicycle / Paddleboard Storage Room",
    ],
  },
  {
    id: "hr-109",
    slug: "scottsdale-desert-mountain-estate",
    title: "Desert Mountain Stone Estate",
    tagline: "Rammed-earth and glass architectural landmark integrated into desert bedrock",
    price: 14750000,
    priceDisplay: "$14,750,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Estate",
    location: "Scottsdale, AZ",
    address: "9720 East Horizon Way",
    city: "Scottsdale, AZ",
    state: "AZ",
    zipCode: "85262",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 9800,
    lotSize: "4.8 Acres",
    yearBuilt: 2023,
    parking: "5-Car Air-Conditioned Collector Garage",
    featured: false,
    architect: "Kendle Design Collaborative",
    images: [
      "https://i.ibb.co.com/3yZY6gj9/andre-francois-mckenzie-08u-IUe2a9-XY-unsplash.jpg",
      "https://i.ibb.co.com/ksR5ngL0/pexels-joel-de-la-cruz-3529563-31234945.jpg",
      "https://i.ibb.co.com/N27nQ723/pexels-joel-de-la-cruz-3529563-31234942.jpg",
      "https://i.ibb.co.com/c9f5Zpv/pexels-curtis-adams-1694007-3288103.jpg",
    ],
    description:
      "Harmonizing completely with the Sonoran Desert landscape, this rammed-earth and zinc architectural residence is positioned on nearly five private elevated acres. Natural boulder outcroppings puncture indoor living galleries, evoking an organic union between shelter and environment.\n\nThe residence features expansive cantilevered overhangs providing natural cooling, a multi-tier negative edge pool that mirrors desert sunsets, an indoor putting studio, and an independent detached two-bedroom guest casita.",
    amenities: [
      "4.8 Acres of Native Sonoran Desert Privacy",
      "Rammed-Earth and Weathered Zinc Construction",
      "Negative-Edge Pool Reflecting Desert Sunsets",
      "Detached 2-Bedroom Guest Casita",
      "Indoor TrackMan Golf Simulator Lounge",
      "Solar Power Battery Storage System",
      "Private Gated Drive with Heli-Landing Clearance",
      "Desert Mountain Golf Club Membership Eligible",
    ],
  },
  {
    id: "hr-110",
    slug: "austin-lake-austin-modernist",
    title: "Lake Austin Waterfront Pavilions",
    tagline: "Limestone and steel contemporary compound with private boat dock",
    price: 16500000,
    priceDisplay: "$16,500,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Villa",
    location: "Austin, TX",
    address: "3801 Westlake Drive",
    city: "Austin, TX",
    state: "TX",
    zipCode: "78746",
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 11100,
    lotSize: "2.3 Acres",
    yearBuilt: 2022,
    parking: "4-Car Garage with Workshop",
    featured: false,
    architect: "Lake|Flato Architects",
    images: [
      "https://i.ibb.co.com/S4hTpdw9/pexels-frans-van-heerden-201846-1438832.jpg",
      "https://i.ibb.co.com/VpJjNhnL/pexels-the-r-e-editor-849420489-28272351.jpg",
      "https://i.ibb.co.com/zhm2VnWf/pexels-shaza-jocarlos-841367558-39017620.jpg",
      "https://i.ibb.co.com/wFZvBNpq/pexels-luizavenanci-29302986.jpg",
    ],
    description:
      "Designed by the celebrated firm Lake|Flato, this private Lake Austin compound celebrates Texas limestone, blackened steel, and cypress wood. The layout is separated into interconnected pavilions linked by glass-walled breezeways and tranquil reflecting pools.\n\nA gently sloping lawn flanked by centuries-old live oaks leads down to a private two-slip hydraulic boat dock with upper party sundeck. Inside, massive steel pivot doors open the living hall to the lake breeze, framed by a 60-foot lap pool.",
    amenities: [
      "Two-Slip Hydraulic Covered Boat Dock",
      "60ft Lap Pool & Separate Spa",
      "Texas White Limestone & Blackened Steel Craft",
      "Glass-Enclosed Breezeways Connecting Living Pavilions",
      "Professional Chef's Kitchen with Dual Islands",
      "Screened Outdoor Living Porch with Stone Fireplace",
      "Eanes School District Location",
      "Fully Integrated Rainwater Harvesting System",
    ],
  },
  {
    id: "hr-111",
    slug: "central-park-south-duplex-lease",
    title: "Central Park South Grand Duplex",
    tagline: "Panoramic direct park vistas from a landmark pre-war architectural tower",
    price: 32500,
    priceDisplay: "$32,500/mo",
    currency: "USD",
    period: "month",
    listingType: "Rent",
    propertyType: "Apartment",
    location: "New York, NY",
    address: "200 Central Park South, #19B",
    city: "New York, NY",
    state: "NY",
    zipCode: "10019",
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqFt: 5200,
    lotSize: "Duplex Residence",
    yearBuilt: 2019,
    parking: "On-Site Valet Parking Included",
    featured: false,
    architect: "Emery Roth & Sons (Interiors by Yabu Pushelberg)",
    images: [
      "https://i.ibb.co.com/1fc2jQSZ/pexels-curtis-adams-1694007-7601264.jpg",
      "https://i.ibb.co.com/zhyMsgBq/pexels-curtis-adams-1694007-8186516.jpg",
      "https://i.ibb.co.com/HLX81RD7/pexels-dropshado-31737836.jpg",
      "https://i.ibb.co.com/wr2KVwLm/pexels-ranamatloob567-26886914.jpg",
    ],
    description:
      "Perched directly across from Central Park, this grand duplex residence offers an unrivaled vantage point overlooking the full sweep of the park canopy from south to north. Featuring bespoke interiors by Yabu Pushelberg, every corner is executed with tailored luxury.\n\nThe lower level features a grand corner living salon, library with custom millwork, and open formal dining room. Upstairs, the master sanctuary features direct park vistas, motorized privacy drapes, and an en-suite bathroom clad in honed Fior di Bosco marble.",
    amenities: [
      "Unobstructed Central Park Panorama",
      "Duplex Layout with Sweeping Architectural Staircase",
      "Turnkey Fully Furnished by Yabu Pushelberg",
      "24/7 Full-Service White Glove Staff & Concierge",
      "Primary Bath with Soaking Tub Facing Central Park",
      "Sonos Sound System in Every Room",
      "Daily Housekeeping Services Available",
      "Private On-Site Valet Garage",
    ],
  },
  {
    id: "hr-112",
    slug: "hollywood-hills-modernist-glasshouse",
    title: "Bird Streets Modernist Pavilion",
    tagline: "Cantilevered glass showcase with breathtaking Los Angeles basin views",
    price: 21500000,
    priceDisplay: "$21,500,000",
    currency: "USD",
    period: "one-time",
    listingType: "Buy",
    propertyType: "Villa",
    location: "Beverly Hills, CA",
    address: "1420 Blue Jay Way",
    city: "Beverly Hills, CA",
    state: "CA",
    zipCode: "90069",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 8400,
    lotSize: "0.68 Acres",
    yearBuilt: 2023,
    parking: "Subterranean 3-Car Turntable Garage",
    featured: true,
    architect: "Kappe Architects",
    images: [
      "https://i.ibb.co.com/rKw5K042/pexels-cmoon-12558958.jpg",
      "https://i.ibb.co.com/CCB38jw/pexels-real-estate-4k-719913841-36023384.jpg",
      "https://i.ibb.co.com/xSSFR4Jp/pexels-wiki15-canton-598594475-28681145.jpg",
      "https://i.ibb.co.com/zhm2VnWf/pexels-shaza-jocarlos-841367558-39017620.jpg",
    ],
    description:
      "Perched on a quiet cul-de-sac in the coveted Bird Streets above the Sunset Strip, this modern glass pavilion represents quintessential California architecture. Cantilevered terraces stretch outward toward the Pacific Ocean and Downtown skyline.\n\nInside, an open floor plan centers around a dramatic two-story glass atrium with a mature Japanese bonsai garden. A glass-walled subterranean wine cellar, wellness sanctuary, and infinity pool with underwater viewing portholes create a world-class lifestyle sanctuary.",
    amenities: [
      "Cantilevered Infinity Edge Pool with Downtown Views",
      "Two-Story Internal Glass Atrium with Living Bonsai",
      "Subterranean 3-Car Turntable Display Garage",
      "Primary Suite with Private Sunrise Yoga Terrace",
      "Custom Italian Molteni&C Kitchen & Closets",
      "Private Wellness Suite with Finnish Dry Sauna",
      "Comprehensive Biometric Security & Surveillance",
      "Smart Solar Integration with Tesla Powerwalls",
    ],
  },
];

/**
 * Helper query functions for the frontend components.
 * These encapsulate dataset access so future backend APIs (e.g. fetch /api/properties)
 * can easily replace these functions with zero UI restructuring.
 */

export const getAllProperties = () => {
  return [...properties];
};

export const getFeaturedProperties = () => {
  return properties.filter((p) => p.featured);
};

export const getPropertyById = (idOrSlug) => {
  if (!idOrSlug) return null;
  const normalized = String(idOrSlug).toLowerCase().trim();
  return (
    properties.find(
      (p) =>
        p.id.toLowerCase() === normalized ||
        p.slug.toLowerCase() === normalized
    ) || null
  );
};

export const filterProperties = ({
  search = "",
  listingType = "all",
  propertyType = "all",
  city = "all",
  minPrice = 0,
  maxPrice = Infinity,
  bedrooms = "all",
  sortBy = "featured",
} = {}) => {
  let results = [...properties];

  // 1. Text Search (title, location, address, architect, tagline)
  if (search && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.architect && p.architect.toLowerCase().includes(q))
    );
  }

  // 2. Listing Type (Buy / Rent)
  if (listingType && listingType.toLowerCase() !== "all" && listingType.toLowerCase() !== "all statuses") {
    results = results.filter(
      (p) => p.listingType.toLowerCase() === listingType.toLowerCase()
    );
  }

  // 3. Property Type (Villa, Penthouse, etc.)
  if (propertyType && propertyType.toLowerCase() !== "all" && propertyType.toLowerCase() !== "all types") {
    results = results.filter(
      (p) => p.propertyType.toLowerCase() === propertyType.toLowerCase()
    );
  }

  // 4. City / Location
  if (city && city.toLowerCase() !== "all" && city.toLowerCase() !== "all locations") {
    results = results.filter(
      (p) =>
        p.city.toLowerCase().includes(city.toLowerCase()) ||
        p.location.toLowerCase().includes(city.toLowerCase())
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
