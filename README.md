# HAVENSTONE REALTY — Curators of Architectural Living

An ultra-premium, cinematic real-estate platform designed and engineered for world-class luxury property representation, private estate acquisitions, and confidential client advisory.

---

## 🏛️ Project Overview

Havenstone Realty represents an uncompromising global portfolio of architecturally distinguished residences, cantilevered glass estates, skyline penthouses, and private coastal promontories.

The platform merges high-end architectural editorial aesthetics with modern web technologies, fluid GSAP-driven motion, responsive design, and a full-stack REST API connected to MongoDB.

---

## 🎨 Design System & Palette

- **Primary Background:** Warm Ivory (`#F7F5EF`)
- **Primary Contrast / Brand Core:** Deep Forest Teal (`#173D3B`)
- **Luxury Accent:** Muted Copper (`#B87556`)
- **Secondary Accent:** Champagne Bronze & Gold (`#C5A46D` / `#E5D2B8`)
- **Body & Editorial Copy:** Charcoal Green & Muted Slate (`#303B3A` / `#555B57`)
- **Subtle Surface Separator:** Architectural Border (`#E4E1D9`)
- **Dark Editorial Canvas:** Obsidian Emerald (`#071312` / `#0B1A19`)

---

## 🛠️ Technologies & Libraries Used

### **Frontend (`real-state-client`)**
| Technology / Package | Purpose |
| :--- | :--- |
| **React 19** | Modern component-driven UI architecture with hooks and state management |
| **Vite 8** | Lightning-fast development server, HMR, and optimized production bundler |
| **Tailwind CSS v4** | Utility-first CSS styling engine with custom bespoke palettes |
| **DaisyUI 5** | Accessible luxury UI controls and input components |
| **GSAP (GreenSock)** | High-performance animation timelines for entrance reveals and hero interactions |
| **ScrollTrigger** | Scroll-driven parallax effects, scrubbed visuals, and element entrance reveals |
| **Lenis Smooth Scroll** | Synchronized inertial smooth scrolling with GPU acceleration |
| **React Router v7** | Client-side routing with URL query state persistence for search and filtering |
| **Axios** | HTTP client configured with reusable instance (`useAxios`) and base URL |
| **Lucide React** | Lightweight, clean vector iconography for architectural metrics |

### **Backend (`real-estate-server`)**
| Technology / Package | Purpose |
| :--- | :--- |
| **Node.js** | Server-side JavaScript runtime environment |
| **Express.js** | Minimalist web framework powering the REST API endpoints |
| **MongoDB Native Driver** | Official MongoDB client for high-performance database transactions |
| **MongoDB Atlas** | Cloud database hosting properties, inquiries, and client submissions |
| **dotenv** | Secure environment variable configuration |
| **CORS** | Cross-Origin Resource Sharing middleware for client-server integration |

---

## 🍃 MongoDB Connection & Database Architecture

The backend connects directly to **MongoDB Atlas** via the official `mongodb` client driver.

### **1. Connection Setup (`real-estate-server/index.js`)**
```javascript
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Database & Collections
const database = client.db('real-estate');
const propertiesCollection = database.collection('properties');
const inquiriesCollection = database.collection('inquiries');
const contactsCollection = database.collection('contacts');
```

### **2. Collections & Data Models**
1. **`properties` Collection:**
   - `id`: Human-readable identifier (e.g. `hr-101`, `hr-102`)
   - `slug`: URL-friendly slug for SEO and routing
   - `title`: Architectural residence title (e.g. *"The Bel-Air Horizon Glass Pavilion"*)
   - `price` & `priceDisplay`: Numeric and formatted valuation (e.g. `$28,500,000`)
   - `listingType`: `"Buy"` or `"Rent"`
   - `propertyType`: `"Villa"`, `"Penthouse"`, `"Estate"`, or `"Apartment"`
   - `location` & `address`: City, state, zip code, and street address
   - `bedrooms`, `bathrooms`, `areaSqFt`, `lotSize`, `yearBuilt`, `parking`
   - `architect`: Provenance architect or design studio (e.g. *Kappe Architects*, *Olson Kundig*)
   - `images`: Array of high-resolution exterior and interior photography
   - `description`: Multi-paragraph architectural monograph narrative
   - `amenities`: Array of luxury specifications and estate features
   - `featured`: Boolean flag for homepage curated showcase

2. **`inquiries` Collection:**
   - `propertyId`, `propertyTitle`, `clientName`, `clientEmail`, `clientPhone`, `date`, `message`, `status` (`"pending"`), `createdAt`

3. **`contacts` Collection:**
   - `name`, `email`, `phone`, `subject`, `message`, `status` (`"unread"`), `createdAt`

### **3. REST API Endpoints**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/properties` | Fetch all properties from MongoDB |
| `GET` | `/properties/:id` | Retrieve single property by custom ID, slug, or MongoDB `_id` |
| `POST` | `/inquiries` | Submit private acquisition or tour inquiry to MongoDB |
| `GET` | `/inquiries` | Retrieve all inquiries sorted by creation date |
| `POST` | `/contact` | Submit general advisory or confidential client message |
| `GET` | `/contact` | Retrieve all contact submissions |

---

## 🌟 Key Platform Features

1. **Cinematic Dusk Architectural Hero (`Home.jsx`):**
   - Immersive modern glass mansion at twilight with glowing warm interior lighting and infinity pool reflections.
   - Asymmetrical editorial layout with oversized high-contrast serif typography.
   - Delicate champagne-gold curved architectural line and floating monograph preview capsule.
   - Transparent floating overlay navbar transitioning to an elevated navigation bar upon scrolling.

2. **Slim Dark Translucent Search Console (`PropertySearch.jsx`):**
   - Buy / Rent / All Portfolio tab switching with champagne-bronze active indicators.
   - Live URL query synchronization (`q`, `city`, `type`, `minPrice`, `maxPrice`, `listingType`).

3. **Our Ongoing Projects (`Home.jsx` - `#ongoing-projects`):**
   - Staggered GSAP entrance animation for cards and smooth animated progress bar reveals (`65%`, `48%`, `77%`).
   - Showcases the 3 transparent 3D villa models (`house_orange_modern.png`, `house_white_final.png`, `house_blue_villa.png`) on clean studio backdrops.
   - Comprehensive status badges (`• IN PROGRESS`), delivery quarters (`Q4 2025`, `Q2 2026`, `Q1 2025`), category/location, and 2x2 architectural specs grid (Type, Baths, Area, Floors/Park).

4. **Recently Completed Masterpieces (`Home.jsx` - `#recent-completed`):**
   - Directly connected to **MongoDB Atlas**, dynamically fetching and presenting the **last 2 properties** added to the database.
   - High-end editorial split card matching luxury monograph design:
     - **Left Column:** Rich burnt terracotta panel (`#9E5235`) with line-by-line animated serif typography (`.completed-anim-item`), property valuation, room metrics, built-up area, and direct link to property details (`/property/:id`).
     - **Right Column:** Full-bleed architectural photograph with handover status badge and location tag.
     - **Center Overlapping Circular Button:** Bespoke "Explore next" circular button centered on the seam line to smoothly toggle between the 2 MongoDB properties with smooth GSAP text and image transitions.

5. **Enhanced Navigation Dropdown (`Navbar.jsx`):**
   - Elegant dropdown under the `Properties` menu item with a down chevron icon.
   - Instant smooth-scrolling shortcuts to `#ongoing-projects` and `#recent-completed`, alongside direct link to `All Properties`.
   - Full support for cross-page navigation (`/#ongoing-projects`, `/#recent-completed`) and integrated inside the mobile sliding drawer.

6. **Bespoke Wave-Cutout Leadership Section (`About.jsx`):**
   - Executive leadership cards with unique concave-top and convex-bottom wavy arch containers.
   - Individual harmonious pastel backdrops matching Havenstone's project palette (champagne ivory, soft terracotta, teal mist, warm sand).
   - Centered executive photography, titles, and regional advisory desks.

7. **Properties Listing & Filtering (`Properties.jsx`):**
   - Editorial alternating horizontal card layout with generous whitespace.
   - Instant search, property type filtering, buy/rent filtering, price range sorting, and pagination.

8. **Property Details & Private Inquiries (`PropertyDetails.jsx`):**
   - Full photography gallery, comprehensive architectural specs matrix, amenities grid, provenance narrative, and similar property recommendations.
   - Direct MongoDB-connected inquiry booking form.

9. **Advisory & Contact Suite (`Contact.jsx`):**
   - Private consultation booking form with validation and live submission to the `/contact` endpoint.
   - Interactive FAQ accordion and global flagship embassy locations.

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher recommended)
- MongoDB Atlas account or local MongoDB instance

### **1. Server Setup**
```bash
cd real-estate-server
npm install
```

Create a `.env` file in `real-estate-server/`:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string_here
```

Start the server:
```bash
npm start
# Server runs on http://localhost:3000
```

### **2. Client Setup**
```bash
cd real-state-client
npm install
```

Create a `.env` file in `real-state-client/`:
```env
VITE_API_URL=http://localhost:3000
```

Start the development server:
```bash
npm run dev
# Client runs on http://localhost:5173
```

To build for production:
```bash
npm run build
npm run lint
```

---

## 📱 Responsive & Cross-Device Compatibility

- **Mobile (< 640px):** Single-column stacked layouts, touch-swipe carousel navigation, and collapsable mobile drawer navigation.
- **Tablet (640px - 1024px):** Balanced two-column grids, optimized search console, and touch-friendly controls.
- **Desktop (1024px+):** Full-bleed asymmetrical editorial compositions, GSAP parallax scrub, floating monograph cards, and wide gallery spreads.

---

© Havenstone Realty. All rights reserved. Curated Architectural Advisory.
