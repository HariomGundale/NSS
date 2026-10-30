# NSS DYPCOE Akurdi - NSS Unit A-106 Website

A production-ready full-stack website for **National Service Scheme (NSS) Unit A-106** at **Dr. D. Y. Patil College of Engineering, Akurdi, Pune**.

Built closely following the provided reference design mockups with pixel-level alignment, responsive desktop/tablet/mobile layouts, and a complete admin management system.

---

## 🌟 Key Features

### 1. Public Pages (Matching Reference Design)
- **Home (`/`)**:
  - Sticky Navy Header with authentic NSS Konark wheel emblem, college branding, and active orange navigation highlights.
  - Photographic Hero section with dark overlay, motto *"Not Me But You"*, headline, *"Unit A-106"* badge, and *"Explore Our Activities"*.
  - *"Our Unit at a Glance"* section with introduction and 4 focus area cards:
    1. Community Service (*For a Better Society*)
    2. Awareness & Education (*Education Programs*)
    3. Environment Conservation (*Green Initiatives*)
    4. Personality Development (*& Leadership*)
  - *"Highlights"* section displaying recent flagship activities (*Tree Plantation Drive, Blood Donation Camp, Swachh Bharat Abhiyan, Social Awareness Rally*) dynamically populated from MongoDB.
  - Navy footer with NSS motto *"Service to mankind is service to God."*, social media links, and college contact information.
- **About Us (`/about`)**:
  - Hero banner with breadcrumb `Home > About Us`.
  - Explanations of Central Sector NSS Scheme (1969) and Unit A-106.
  - NSS Konark Wheel Emblem symbolic breakdown card.
  - Vision, Mission & 4 Core Objectives.
  - DYPCOE College introduction card.
  - Full-width Programme Officer's Message featured card with photo, designation, and quote callout.
- **Events & Activities (`/events`)**:
  - Dynamic filter pills: `[ All ]`, `[ Completed ]`, `[ Upcoming ]`.
  - Search by keyword and venue.
  - 3-column event card grid with pinned orange date badges (*Day, Month, Year*).
  - *"View Gallery →"* linking to dedicated event details.
- **Event Detail (`/events/[slug]`)**:
  - Full event article with date, time, venue, participants, organizer, coordinator, and status pill.
  - Responsive image grid gallery.
  - Full-screen interactive **Lightbox Modal** with previous, next, keyboard arrow navigation, and ESC close.
- **Our Team (`/team`)**:
  - Programme Officer wide spotlight card with portrait, contacts, and quote box.
  - NSS Coordinators & Committee Members card grid with avatars and roles.
  - Team Leads & Co-Leads card grid.
- **Achievements & Impact (`/achievements`)**:
  - Top 3 statistic cards (*Total Activities, Volunteer Participation, People Benefited*).
  - 2-column layout: *Social & Environmental Contributions* and *Major Achievements & Recognitions* with award trophies.
  - *"Our Impact in Numbers"* circular visual counters (*50+ Activities, 500+ Volunteers, 10,000+ Benefited, 5+ Awards*).
- **Contact Us (`/contact`)**:
  - Campus address, official email, and social media handles.
  - Interactive Contact message form with React Hook Form and Zod validation.

---

### 2. Admin Portal & Management System
- **Secure Authentication (`/admin/login`)**:
  - Password hashing with `bcryptjs`.
  - Signed JWT tokens with `jose` stored in secure HTTP-only cookies (`nss_admin_token`).
  - Next.js edge-compatible middleware route protection for `/admin/:path*`.
  - Passwords and secrets are never exposed to the client.
- **Admin Dashboard (`/admin/dashboard`)**:
  - 6 Overview Metric cards: Total Events, Upcoming Events, Completed Events, Total Gallery Photos, Team Members, and Achievements.
  - Recent events table with direct preview and edit links.
- **Event Management (`/admin/events`)**:
  - Table of all events with cover thumbnail, date, venue, category, status, and creation timestamp.
  - Search, filter by status, view, edit, and delete.
  - Delete confirmation modal.
- **Add / Edit Event (`/admin/events/new`, `/admin/events/[id]/edit`)**:
  - File upload with Cloudinary integration & local fallback.
  - Multiple gallery image uploads with individual deletion and previews.
  - Automated slug generation and validation.
- **Team Management (`/admin/team`)**:
  - Add, edit, delete team members across categories (*PO, Coordinator, Lead*).
  - Profile photo upload and display order management.
- **Achievements & Stats Management (`/admin/achievements`)**:
  - Direct live editing of site statistics (*Total Activities, Volunteers, Beneficiaries, Awards*).
  - Edit Programme Officer's message, designation, and portrait.
  - Add, edit, and delete award records.
- **Messages & Leads Inbox (`/admin/messages`)**:
  - View contact queries and student volunteer registration forms submitted through the website.

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: bcryptjs, jose (JWT), HTTP-only cookies
- **Form Handling & Validation**: React Hook Form, Zod
- **Image Uploads**: Cloudinary API with local filesystem fallback
- **Icons**: Lucide React
- **SEO**: Dynamic sitemap (`sitemap.ts`), `robots.ts`, OpenGraph metadata

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v22.19.0)
- MongoDB running locally or a MongoDB Atlas URI

### 2. Environment Setup
Create a `.env.local` file in the project root (sample provided in `.env.example`):

```bash
# MongoDB Database URL
MONGODB_URI=mongodb://127.0.0.1:27017/nss_dypcoe_db

# JWT Secret for Session Cookies
JWT_SECRET=super_secure_nss_dypcoe_jwt_secret_unit_a106_2025_prod

# Default Seed Admin Credentials
ADMIN_EMAIL=admin@nss.dypcoe.ac.in
ADMIN_PASSWORD=Admin@NSS106#2025
ADMIN_NAME="NSS Admin Coordinator"

# Cloudinary (Optional - Automatic fallback to local uploads if omitted)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Public App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Credentials
To log in to the Admin Portal (`/admin/login`):
- **Email**: `admin@nss.dypcoe.ac.in`
- **Password**: `Admin@NSS106#2025`

The database auto-seeds on first launch with sample events, team members, awards, and site metrics matching the reference design.

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # Home page
│   ├── about/page.tsx              # About Us page
│   ├── events/
│   │   ├── page.tsx                # Events list with filters
│   │   └── [slug]/page.tsx         # Event details & gallery lightbox
│   ├── team/page.tsx               # Our Team page
│   ├── achievements/page.tsx       # Achievements & Impact page
│   ├── contact/page.tsx            # Contact Us & Volunteer registration
│   ├── sitemap.ts                  # Dynamic SEO sitemap
│   ├── robots.ts                   # Robots configuration
│   ├── admin/
│   │   ├── login/page.tsx          # Secure admin login
│   │   ├── dashboard/page.tsx      # Admin dashboard overview
│   │   ├── events/
│   │   │   ├── page.tsx            # Event management table
│   │   │   ├── new/page.tsx        # Add new event
│   │   │   └── [id]/edit/page.tsx  # Edit event & gallery
│   │   ├── team/page.tsx           # Team management
│   │   ├── achievements/page.tsx   # Achievements & stats editor
│   │   └── messages/page.tsx       # Contact inquiries & volunteer leads
│   └── api/                        # Route Handlers
│       ├── auth/                   # login, logout, me
│       ├── events/                 # CRUD events
│       ├── team/                   # CRUD team members
│       ├── achievements/           # CRUD achievements
│       ├── stats/                  # Site statistics & PO message
│       ├── contact/                # Contact form submissions
│       ├── upload/                 # Image uploads
│       └── seed/                   # Database auto-seed
├── components/
│   ├── navbar/Navbar.tsx           # Navy header with mobile drawer
│   ├── footer/Footer.tsx           # Dark navy footer with quotes
│   ├── hero/
│   │   ├── HomeHero.tsx            # Main hero with emblem & buttons
│   │   └── PageHeader.tsx          # Inner pages hero with breadcrumbs
│   ├── home/                       # Unit at a glance, Highlights
│   ├── events/                     # EventsView, EventDetailGallery
│   ├── forms/                      # ContactForm
│   ├── gallery/                    # Lightbox modal
│   └── admin/                      # AdminLayout, EventForm, TeamManager, etc.
├── lib/
│   ├── mongodb.ts                  # Cached Mongoose connection
│   ├── auth.ts                     # Password hashing, JWT signing & cookies
│   ├── cloudinary.ts               # Cloudinary upload & local fallback
│   ├── utils.ts                    # slugify, formatDateParts, cn
│   └── seedData.ts                 # Initial dataset matching reference
├── models/                         # Mongoose Models (User, Event, TeamMember, etc.)
├── schemas/                        # Zod validation schemas
├── public/
│   ├── logo/nss-logo.png           # Authentic NSS emblem (transparent PNG & SVG)
│   └── images/                     # Reference designs & asset placeholders
└── middleware.ts                   # Next.js admin session guard
```
