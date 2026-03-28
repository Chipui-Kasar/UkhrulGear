# Summit Rentals — Hiking Gear Rental Website

A full-stack Next.js 14 application for renting hiking and outdoor gear, powered by Supabase for the backend, auth, and database.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security)
- **Auth:** Google OAuth + Phone OTP via Supabase Auth
- **SEO:** Dynamic metadata, JSON-LD structured data, sitemap, robots.txt

## Features

- Server-rendered homepage with animated hero, stats, gear grid, reviews, contact form
- Individual product detail pages with SEO (`/gear/[slug]`)
- Rental booking system with date selection and price calculation
- User reviews with star ratings
- Google Sign-In and Phone Number OTP authentication
- Contact form with Supabase storage
- Fully responsive design with mobile navigation
- Scroll-reveal animations with Framer Motion
- Auto-generated sitemap for all gear pages

---

## Getting Started

### 1. Clone & Install

```bash
cd summit-rentals
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **anon/public key** from Settings → API
3. Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Paste the contents of `supabase-schema.sql` and run it
3. This creates all tables (gear, reviews, rentals, profiles, contact_messages) and seeds sample gear data

### 4. Enable Google Auth

1. In Supabase Dashboard → Authentication → Providers → Google
2. Enable Google provider
3. Add your Google OAuth Client ID and Secret
   - Get these from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Set authorized redirect URI to: `https://your-project-id.supabase.co/auth/v1/callback`

### 5. Enable Phone Auth

1. In Supabase Dashboard → Authentication → Providers → Phone
2. Enable Phone provider
3. Configure an SMS provider (Twilio, MessageBird, or Vonage)
   - For testing, Supabase provides a test OTP mode

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
summit-rentals/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx            # Homepage (hero, gear, reviews, contact)
│   │   ├── globals.css         # Tailwind + custom styles
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # SEO robots.txt
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── gear/
│   │   │   ├── page.tsx        # Gear listing page
│   │   │   └── [slug]/
│   │   │       ├── page.tsx    # Product detail (SSR + SEO)
│   │   │       ├── RentalBooking.tsx
│   │   │       └── ReviewSection.tsx
│   │   └── auth/
│   │       ├── page.tsx        # Login (Google + Phone)
│   │       └── callback/
│   │           └── route.ts    # OAuth callback handler
│   ├── components/
│   │   ├── Navbar.tsx          # Nav with auth state
│   │   ├── Footer.tsx
│   │   ├── GearCard.tsx        # Product card component
│   │   ├── ContactForm.tsx     # Contact form with Supabase
│   │   └── RevealOnScroll.tsx  # Scroll animation wrapper
│   └── lib/
│       ├── supabase-client.ts  # Browser Supabase client
│       ├── supabase-server.ts  # Server Supabase client
│       └── types.ts            # TypeScript interfaces
├── middleware.ts               # Session refresh middleware
├── supabase-schema.sql         # Database schema + seed data
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## Database Tables

| Table | Description |
|-------|-------------|
| `gear` | Product catalog with specs, features, pricing |
| `profiles` | User profiles (auto-created on signup) |
| `rentals` | Booking records with date ranges and status |
| `reviews` | User reviews with ratings and trail names |
| `contact_messages` | Contact form submissions |

## Deployment

Deploy to Vercel:

```bash
npm run build
# Or connect your Git repo to Vercel for auto-deploy
```

Set environment variables in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Update your sitemap base URL in `src/app/sitemap.ts` to your production domain.
# UkhrulGear
