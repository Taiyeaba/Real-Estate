# HAVENSTONE REALTY — Curators of Architectural Living

An ultra-premium, cinematic luxury real-estate platform inspired by high-end architectural editorial aesthetics (ELORIA design direction). Engineered with React 19, Vite 8, Tailwind CSS v4, GSAP ScrollTrigger motion design, and a full-stack REST API connected to MongoDB Atlas.

---

## 🏛️ 1. Project Title & Overview

**Havenstone Realty** represents an uncompromising global portfolio of architecturally distinguished residences, cantilevered glass estates, skyline penthouses, and private coastal promontories.

The platform marries editorial elegance with modern web engineering:
- **Warm Ivory Editorial Canvas:** Replacing generic dark templates and full-screen hero backgrounds with an asymmetrical, spacious two-column composition on `#F7F5EF`.
- **Orchestrated GSAP Motion:** Smooth entrance reveals, clip-path image masking, staggered typography, and scroll-triggered progress bars across every homepage section.
- **Full-Stack REST Architecture:** Connected directly to MongoDB Atlas for dynamic property listings, live inquiry handling, and interactive completed project showcases.

---

## 🎨 Design System & Palette

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Warm Ivory** | `#F7F5EF` | Primary editorial background, light cards, spacious negative space |
| **Deep Forest Teal** | `#173D3B` | Brand identity, primary buttons, high-contrast badges, dark accents |
| **Muted Copper** | `#B87556` | Editorial emphasis, active indicators, luxury button highlights |
| **Charcoal Green** | `#303B3A` | Primary serif headings, high-contrast body typography |
| **Muted Slate / Gray** | `#6B7280` / `#555B57` | Subtitles, architectural meta captions, secondary descriptions |
| **Subtle Border** | `#E4E1D9` | Hairline editorial dividing lines, input frames, subtle card borders |
| **Obsidian Emerald** | `#071312` / `#0B1A19` | Dark luxury sections (Footer, dark contrast accents) |

---

## 🌟 2. Main Features

1. **ELORIA-Inspired Editorial Hero (`Home.jsx`):**
   - **Strictly No Video / Full-Screen Background Image:** Built on an expansive warm ivory (`#F7F5EF`) canvas with generous whitespace and editorial margins.
   - **Left Column:** Refined eyebrow badge (`EXCEPTIONAL HOMES · THOUGHTFULLY SELECTED`), oversized editorial serif headline (*"A More Considered Way to Live."* with *"Way to Live."* in italic copper `#B87556`), descriptive architectural monograph paragraph, primary copper CTA (`EXPLORE PROPERTIES`), secondary private consultation link, and 3-part advisory metrics (`45+ Private Estates`, `$2.4B+ Advisory Volume`, `100% Strict Discretion`).
   - **Right Column:** Architectural photography showcase with smooth clip-path mask entrance (`clipPath: inset(0% 100% 0% 0%) → inset(0% 0% 0% 0%)`), provenance badge (`№ 01 • CURATED ARCHITECTURE`), and monograph caption pill (`The Bel-Air Horizon Glass Pavilion`).
   - **Integrated Editorial Search:** Slim, refined search console positioned cleanly below the hero with hairline borders and light luxury styling.

2. **Scroll-Triggered Entrance Reveals Across Entire Homepage:**
   - Every single homepage section features dedicated GSAP ScrollTrigger animations that reveal content smoothly as it enters the viewport.
   - Staggered headings, upward fading subtitles, clip-path image reveals, and sequential card stagger.
   - Full accessibility support for `prefers-reduced-motion`.

3. **Our Ongoing Developments (`#ongoing-projects`):**
   - Dedicated showcase featuring 3 transparent 3D villa renderings (`house_orange_modern.png`, `house_white_final.png`, `house_blue_villa.png`).
   - Real-time animated progress bars that smoothly animate from `0%` to their target completion percentage (`65%`, `48%`, `77%`).
   - Status indicators (`• IN PROGRESS`), handover target quarters, and 2x2 architectural specs grid.

4. **Recently Completed Masterpieces (`#recent-completed`):**
   - Directly integrated with **MongoDB Atlas**, dynamically fetching and presenting the **last 2 properties** from the database (with resilient fallback).
   - Bespoke split-panel monograph card:
     - **Left Column:** Rich burnt terracotta panel (`#9E5235`) with line-by-line animated serif typography (`.completed-anim-item`), valuation, room count, built-up square footage, and direct routing to `/property/:id`.
     - **Right Column:** Full-bleed architectural photograph with handover badge and location tag.
     - **Center Overlapping Circular Button:** Interactive "Explore next" button that toggles seamlessly between the 2 properties with synchronized GSAP text and image transition animations.

5. **Integrated Sticky Navbar (`Navbar.jsx`):**
   - Unified warm ivory and deep teal navigation bar across all pages.
   - Properties dropdown menu with quick smooth-scroll anchors to `#ongoing-projects` and `#recent-completed`, as well as a direct route to `All Properties`.
   - Full mobile responsiveness with sliding drawer menu and dropdown support.

6. **Bespoke Wave-Cutout Leadership Section (`About.jsx`):**
   - Executive leadership cards with unique concave-top and convex-bottom wavy arch containers.
   - Individual harmonious pastel backdrops matching Havenstone's project palette.

7. **Property Directory & Multifaceted Filtering (`Properties.jsx`):**
   - Search by keyword, city, listing type (Buy/Rent), property type, and price range with live URL query synchronization.

8. **Property Details & Private Inquiries (`PropertyDetails.jsx`):**
   - High-resolution gallery spreads, architectural specifications matrix, provenance narrative, and live inquiry submission connected to MongoDB.

9. **Confidential Advisory Suite (`Contact.jsx`):**
   - Direct booking form sending submissions to the `/contact` endpoint in MongoDB, alongside interactive FAQ accordions and global embassy desks.

---

## 🛠️ 3. Technologies & Libraries Used

### **Frontend (`real-state-client`)**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.0.0` | Declarative UI components, state management, and custom hooks |
| **Vite** | `^8.3.5` | High-speed frontend development server and production bundler |
| **Tailwind CSS** | `^4.0.0` | Modern utility CSS framework for design system execution |
| **DaisyUI** | `^5.0.0` | Accessible UI input components and tab interfaces |
| **GSAP (GreenSock)** | `^3.12.7` | High-performance animation timelines and tween orchestration |
| **ScrollTrigger** | `^3.12.7` | Viewport-driven triggers, scrubbed animations, and staggered reveals |
| **Lenis** | `^1.1.20` | Smooth inertial scrolling for an elevated editorial reading experience |
| **React Router** | `^7.0.0` | Client-side routing, query parameter persistence, and SPA navigation |
| **Axios** | `^1.7.9` | Promise-based HTTP client with centralized instance (`useAxios`) |
| **Lucide React** | `^0.475.0` | Clean, minimalist SVG vector icons |

### **Backend (`real-estate-server`)**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `>=18.0.0` | Server-side JavaScript runtime |
| **Express.js** | `^4.21.2` | Fast, lightweight REST API framework |
| **MongoDB Driver** | `^6.12.0` | Official native MongoDB driver for database queries and aggregation |
| **dotenv** | `^16.4.7` | Secure environment variable configuration |
| **cors** | `^2.8.5` | Cross-Origin Resource Sharing middleware for client communication |

---

## 📋 4. Prerequisites

Before installing and running the project, ensure you have:
- **Node.js:** v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm:** v9.0.0 or higher (comes bundled with Node.js)
- **MongoDB:** A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string or a local MongoDB database instance (`mongodb://localhost:27017/real-estate`).

---

## 📦 5. Installation Instructions

Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/Real-state.git
cd Real-state
```

### **Step 1: Install Backend Dependencies**
```bash
cd real-estate-server
npm install
cd ..
```

### **Step 2: Install Frontend Dependencies**
```bash
cd real-state-client
npm install
cd ..
```

---

## ⚙️ 6. Environment Variables & `.env.example` Guidance

Both `real-state-client` and `real-estate-server` include `.env.example` templates in their respective root folders.

### **Backend Environment Setup (`real-estate-server/.env`)**
Create a `.env` file in the `real-estate-server` directory:
```bash
cp real-estate-server/.env.example real-estate-server/.env
```
Populate the variables:
```env
# Port on which the Express server will listen
PORT=3000

# Your MongoDB Atlas or local connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority&appName=real-estate
```

### **Frontend Environment Setup (`real-state-client/.env`)**
Create a `.env` file in the `real-state-client` directory:
```bash
cp real-state-client/.env.example real-state-client/.env
```
Populate the variables:
```env
# Base URL pointing to your backend Express server
VITE_API_URL=http://localhost:3000
```
> [!NOTE]
> If `VITE_API_URL` is omitted, the client automatically defaults to `http://localhost:3000` via [useAxios.jsx](file:///c:/Users/UAE%20LAPTOP%20BAZAR/Desktop/Real-state/real-state-client/src/hooks/useAxios.jsx).

---

## 💻 7. Development Server Commands

To run the entire full-stack application concurrently:

### **Terminal 1: Start the Backend Server**
```bash
cd real-estate-server
npm start
# Server will run at http://localhost:3000
```

### **Terminal 2: Start the Frontend Client**
```bash
cd real-state-client
npm run dev
# Client will run at http://localhost:5173
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🏗️ 8. Production Build Commands

To build the client application for production:
```bash
cd real-state-client
npm run build
```
Vite will compile and optimize assets into `real-state-client/dist/`.

To preview the production build locally:
```bash
cd real-state-client
npm run preview
```

---

## 🔍 9. Lint Commands

To run ESLint across all JavaScript and JSX source files:
```bash
cd real-state-client
npm run lint
```
The codebase is verified with **0 errors and 0 warnings**.

---

## 📂 10. Project Structure Overview

```
Real-state/
├── README.md                          # Root full-stack documentation
├── real-estate-server/                # Express & MongoDB backend
│   ├── .env.example                   # Server environment variables template
│   ├── .env                           # Server environment secrets (gitignored)
│   ├── package.json                   # Backend dependencies & start scripts
│   └── index.js                       # Express app, MongoDB connection, & REST endpoints
│
└── real-state-client/                 # React 19 & Vite frontend
    ├── .env.example                   # Client environment variables template
    ├── .env                           # Client environment secrets (gitignored)
    ├── package.json                   # Frontend dependencies & scripts
    ├── vite.config.js                 # Vite bundler configuration
    ├── eslint.config.js               # ESLint configuration
    ├── index.html                     # HTML entry point with luxury serif fonts
    ├── public/                        # Static public files & favicons
    └── src/
        ├── main.jsx                   # React root entry with Lenis & Router provider
        ├── index.css                  # Tailwind CSS v4 imports & custom styles
        ├── assets/                    # Static architectural graphics & 3D villa PNGs
        │   ├── house_orange_modern.png
        │   ├── house_white_final.png
        │   └── house_blue_villa.png
        ├── components/                # Reusable UI components
        │   ├── PropertyCard.jsx       # Curated property showcase card
        │   ├── PropertySearch.jsx     # Light editorial search console
        │   └── ErrorPage.jsx          # 404 & error boundary display
        ├── hooks/                     # Custom React hooks
        │   ├── useAxios.jsx           # Configured Axios instance with baseURL
        │   └── useScrollToTop.jsx     # Route change scroll-reset handler
        ├── layouts/                   # Application layouts
        │   └── MainLayout.jsx         # Global shell with Navbar, Outlet, & Footer
        ├── pages/                     # Application routes
        │   ├── Home.jsx               # Editorial homepage with all 7 GSAP sections
        │   ├── Properties.jsx         # Full property catalog & filtering
        │   ├── PropertyDetails.jsx    # Individual property monograph & inquiry form
        │   ├── About.jsx              # Brand philosophy & wave-cutout leadership
        │   └── Contact.jsx            # Advisory booking & global embassy contacts
        ├── routes/                    # Router configuration
        │   └── Routes.jsx             # React Router v7 route definitions
        └── shared/                    # Layout components
            ├── Navbar.jsx             # Sticky header with luxury dropdown navigation
            └── Footer.jsx             # Obsidian emerald footer with newsletter & links
```

---

## 🏛️ 11. Homepage Sections & Responsibilities

The homepage ([`Home.jsx`](file:///c:/Users/UAE%20LAPTOP%20BAZAR/Desktop/Real-state/real-state-client/src/pages/Home.jsx)) is organized into 7 purposeful editorial sections:

| # | Section Name | DOM ID / Anchor | Primary Responsibility |
| :-: | :--- | :--- | :--- |
| **1** | **Editorial Hero & Search** | Top | Asymmetrical 2-column warm ivory hero (`#F7F5EF`) introducing the brand narrative, architectural photo mask reveal, trust metrics, and the slim `PropertySearch` console. |
| **2** | **Curated Residences** | `#featured-residences` | High-impact 3-column grid showcasing featured properties with price badges, location metadata, and staggered GSAP entrance. |
| **3** | **Ongoing Developments** | `#ongoing-projects` | Highlights 3 upcoming villas with transparent 3D renderings, quarterly handover timelines, and animated construction progress bars (`65%`, `48%`, `77%`). |
| **4** | **Recently Completed** | `#recent-completed` | Fetches the last 2 properties from MongoDB. Renders a luxury terracotta split monograph card with interactive "Explore next" circular switcher and line-by-line animated text. |
| **5** | **Architectural Typologies** | `#categories` | Interactive visual grid highlighting luxury categories (Modern Glass Villas, Heritage Estates, Penthouses, Coastal Pavilions) with mask reveals. |
| **6** | **The Havenstone Standard** | `#why-us` | Editorial dossier cards explaining Private Provenance, Global Syndication, and Strict Confidentiality, backed by advisory statistics. |
| **7** | **Private Advisory CTA** | `#consultation` | Champagne-accented consultation invitation directing clients to book confidential private acquisitions with senior partners. |

---

## 🎬 12. Animation Architecture

All animations on the homepage are powered by **GSAP (GreenSock)** and the **ScrollTrigger** plugin, wrapped cleanly inside React's `useLayoutEffect` and scoped using `gsap.context()` for bulletproof memory management and cleanup.

### **1. Scoped Lifecycle & Teardown Pattern**
```javascript
useLayoutEffect(() => {
  // Check for prefers-reduced-motion accessibility
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = gsap.context(() => {
    // All ScrollTriggers and timelines created here are automatically cleaned up!
    gsap.from(heroTitleRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
    });
  }, homeContainerRef);

  // Clean teardown on component unmount
  return () => ctx.revert();
}, []);
```

### **2. Architectural Mask Reveals (`clipPath`)**
Hero and category images utilize CSS `clipPath` reveals for an architectural drawing appearance:
```javascript
gsap.fromTo(
  heroImageRef.current,
  { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08 },
  { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'power3.inOut' }
);
```

### **3. Staggered Card Entrance Pattern**
Used across Featured Residences, Ongoing Projects, and Category cards:
```javascript
gsap.from(cardsRef.current.children, {
  scrollTrigger: {
    trigger: cardsRef.current,
    start: 'top 82%',
    toggleActions: 'play none none none',
  },
  y: 45,
  opacity: 0,
  duration: 0.85,
  stagger: 0.15,
  ease: 'power3.out',
});
```

### **4. Dynamic Progress Bar Animation**
Used in the Ongoing Developments section to visualize build progress:
```javascript
gsap.utils.toArray('.ongoing-progress-bar').forEach((bar) => {
  const targetWidth = bar.getAttribute('data-target-width') || '0%';
  gsap.fromTo(
    bar,
    { width: '0%' },
    {
      width: targetWidth,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  );
});
```

### **5. Lenis Inertial Smooth Scrolling**
Initialized in [`main.jsx`](file:///c:/Users/UAE%20LAPTOP%20BAZAR/Desktop/Real-state/real-state-client/src/main.jsx) to sync browser scroll events with GSAP ScrollTrigger updates:
```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 🖼️ 13. Instructions for Replacing Architectural Images & Updating Content

### **1. Replacing Static Architectural Assets**
- Ongoing project 3D house models are located in `real-state-client/src/assets/`:
  - `house_orange_modern.png`
  - `house_white_final.png`
  - `house_blue_villa.png`
- To replace these with new architectural renderings:
  1. Save your transparent PNG rendering in `real-state-client/src/assets/`.
  2. Maintain transparent backgrounds for optimal presentation on the ivory card canvas.
  3. Update the imports at the top of [`Home.jsx`](file:///c:/Users/UAE%20LAPTOP%20BAZAR/Desktop/Real-state/real-state-client/src/pages/Home.jsx).

### **2. Replacing the Hero Architectural Photograph**
- The hero photography URL is declared directly in `Home.jsx` (`HERO_IMAGE_URL`).
- To change it, replace the URL with any high-resolution architectural photograph (recommended minimum 1800x1200px, dusk or natural light).

### **3. Updating Property Content in MongoDB**
To add new properties or update existing ones, insert documents into the `properties` collection in your MongoDB `real-estate` database matching the schema:
```json
{
  "id": "hr-110",
  "slug": "solstice-promontory-villa",
  "title": "The Solstice Promontory Villa",
  "price": 34000000,
  "priceDisplay": "$34,000,000",
  "listingType": "Buy",
  "propertyType": "Villa",
  "location": "Carmel Highlands, California",
  "address": "100 Highway 1, Carmel, CA 93923",
  "bedrooms": 6,
  "bathrooms": 8,
  "areaSqFt": 11400,
  "lotSize": "3.8 Acres",
  "yearBuilt": 2024,
  "parking": 6,
  "architect": "Olson Kundig",
  "images": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
  ],
  "description": "Cantilevered over rugged granite coastal bluffs...",
  "amenities": ["Infinity Bluff Pool", "Helipad Access", "Subterranean Cellar"],
  "featured": true
}
```

---

## 🔌 14. Existing API & Backend Integration Notes

The Express server in `real-estate-server/index.js` provides clean REST endpoints:

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/properties` | Fetch all properties in the portfolio | None |
| `GET` | `/properties/:id` | Fetch single property by slug, custom `id`, or MongoDB `_id` | None |
| `POST` | `/inquiries` | Submit client private tour/acquisition booking | `{ propertyId, propertyTitle, clientName, clientEmail, clientPhone, date, message }` |
| `GET` | `/inquiries` | Retrieve all inquiries (sorted descending by `createdAt`) | None |
| `POST` | `/contact` | Submit general advisory or confidential client consultation | `{ name, email, phone, subject, message }` |
| `GET` | `/contact` | Retrieve all contact form submissions | None |

> [!NOTE]
> All sensitive MongoDB connection credentials are read exclusively through `process.env.MONGODB_URI` via `dotenv` and are never hardcoded or sent to the client.

---

## 🚀 15. Deployment Instructions

### **1. Deploying the Client (`real-state-client`)**
The client can be deployed to **Vercel**, **Netlify**, or **Cloudflare Pages**.

#### **Vercel Deployment:**
1. Connect your GitHub repository to Vercel.
2. Set **Root Directory** to `real-state-client`.
3. Set **Framework Preset** to `Vite`.
4. Add the Environment Variable:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com`
5. Ensure client-side SPA routing rewrites are supported by adding `vercel.json` if needed:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

#### **Netlify Deployment:**
1. Set **Base directory** to `real-state-client`.
2. Set **Build command** to `npm run build`.
3. Set **Publish directory** to `real-state-client/dist`.
4. Add `public/_redirects` with `/* /index.html 200`.

---

### **2. Deploying the Backend (`real-estate-server`)**
The server can be deployed to **Render**, **Railway**, or **Heroku**.

#### **Render Deployment:**
1. Create a new **Web Service** on Render and select your repository.
2. Set **Root Directory** to `real-estate-server`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `node index.js`.
5. Under **Environment Variables**, add:
   - `PORT`: `3000` (or leave default assigned by Render)
   - `MONGODB_URI`: `your_mongodb_atlas_connection_string`
6. Copy your public Render service URL and update `VITE_API_URL` on your frontend deployment.

---

## 🛠️ 16. Troubleshooting Guide

### **1. MongoDB Connection Refused / Timeout**
- **Symptom:** Server console logs `MongoServerSelectionError: connection timed out`.
- **Solution:** In your MongoDB Atlas dashboard, navigate to **Network Access** and verify that IP `0.0.0.0/0` (Allow access from anywhere) or your current deployment IP is added to the IP Access List.

### **2. Client CORS Errors**
- **Symptom:** Browser console shows `Access-Control-Allow-Origin` error when submitting inquiries.
- **Solution:** Verify `real-estate-server/index.js` includes `app.use(cors())`. If targeting a custom origin in production, configure CORS with your specific frontend domain:
  ```javascript
  app.use(cors({ origin: ['https://your-havenstone-site.vercel.app'] }));
  ```

### **3. GSAP Animations Not Firing or Misaligned Triggers**
- **Symptom:** Cards stay invisible or triggers fire at incorrect scroll positions.
- **Solution:**
  1. Ensure images have loaded before ScrollTrigger recalculates page dimensions by invoking `ScrollTrigger.refresh()`.
  2. Confirm `prefers-reduced-motion` is not enabled in your operating system or browser settings.
  3. Ensure all animations are scoped inside `gsap.context()` to prevent duplicate listeners when React re-renders.

### **4. Lenis Smooth Scroll Jumping or Stuttering**
- **Symptom:** Page jump when clicking hash anchors (`#ongoing-projects`, `#recent-completed`).
- **Solution:** Both `Navbar.jsx` and `Home.jsx` implement native window scrolling combined with Lenis awareness:
  ```javascript
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  ```

### **5. Port 3000 Already in Use**
- **Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`.
- **Solution:** Update `PORT` in `real-estate-server/.env` to `3001` or run:
  ```powershell
  # Windows
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
  ```

---

## 📄 License & Attribution

Designed and engineered for **Havenstone Realty**. All photography and architectural renderings are curated for demonstration purposes.

© 2026 Havenstone Realty. Curated Architectural Advisory. All rights reserved.
