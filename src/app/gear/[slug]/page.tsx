import { createServerComponentClient } from "@/lib/supabase-server";
import { GearItem } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RentalBooking from "./RentalBooking";
import ReviewSection from "./ReviewSection";
import { ChevronLeftIcon, HomeIcon } from "@heroicons/react/24/outline";

// Fallback data for when Supabase isn't configured
const fallbackGear: Record<string, GearItem> = {
  "trekking-backpacks": {
    id: "1",
    name: "Trekking Backpacks",
    slug: "trekking-backpacks",
    category: "Packs",
    description:
      "50L-75L expedition packs from Osprey, Deuter and Gregory. Fitted to your frame.",
    long_description:
      "Our premium trekking backpacks are selected from the top outdoor brands. Each pack is professionally fitted to your frame before rental. Featuring adjustable torso lengths, hip belt sizing, and rain covers included.",
    price_per_day: 12,
    image_url:
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&q=80",
    gallery_images: [],
    badge: "Popular",
    features: [
      "Adjustable torso fit",
      "Rain cover included",
      "Hydration compatible",
      "Multiple access points",
      "Hip belt pockets",
    ],
    specs: {
      Volume: "50L-75L",
      Weight: "1.4-2.2 kg",
      Material: "Ripstop Nylon",
      Frame: "Aluminum",
      Brands: "Osprey, Deuter, Gregory",
    },
    available_count: 15,
    rating: 4.8,
    review_count: 124,
    created_at: "",
  },
  "camping-tents": {
    id: "2",
    name: "Camping Tents",
    slug: "camping-tents",
    category: "Shelter",
    description:
      "2-4 person ultralight and 4-season tents. Waterproof and wind-tested.",
    long_description:
      "Sleep under the stars with confidence. Our tent collection ranges from ultralight 2-person shelters to bomber 4-season tents built for alpine conditions.",
    price_per_day: 18,
    image_url:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    gallery_images: [],
    badge: null,
    features: [
      "Freestanding design",
      "Seam-sealed waterproof",
      "Footprint included",
      "Color-coded setup",
      "Vestibule storage",
    ],
    specs: {
      Capacity: "2-4 person",
      Weight: "1.2-3.5 kg",
      Waterproof: "3000mm+",
      Seasons: "3 and 4 season",
      Brands: "MSR, Big Agnes, Nemo",
    },
    available_count: 10,
    rating: 4.7,
    review_count: 89,
    created_at: "",
  },
  "hiking-boots": {
    id: "3",
    name: "Hiking Boots",
    slug: "hiking-boots",
    category: "Footwear",
    description:
      "Trail runners to mountaineering boots. All sizes, professionally fitted.",
    long_description:
      "The right footwear makes or breaks a hike. Our boot wall covers everything from lightweight trail runners to burly mountaineering boots. Each pair is professionally fitted and UV sanitized between rentals.",
    price_per_day: 8,
    image_url:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    gallery_images: [],
    badge: null,
    features: [
      "Professional fitting",
      "UV sanitized",
      "All sizes available",
      "Ankle support options",
      "Vibram soles",
    ],
    specs: {
      Sizes: "US 5-15",
      Types: "Trail runner, Mid-cut, Mountaineering",
      Sole: "Vibram",
      Waterproof: "Gore-Tex options",
      Brands: "Salomon, La Sportiva, Scarpa",
    },
    available_count: 25,
    rating: 4.6,
    review_count: 156,
    created_at: "",
  },
  "navigation-kit": {
    id: "4",
    name: "Navigation Kit",
    slug: "navigation-kit",
    category: "Electronics",
    description:
      "GPS devices, compasses, topo maps and satellite communicators.",
    long_description:
      "Never lose your way in the backcountry. Our navigation kits include handheld GPS units, baseplate compasses, regional topographic maps, and satellite communicators for emergency SOS.",
    price_per_day: 10,
    image_url:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    gallery_images: [],
    badge: "New",
    features: [
      "Garmin inReach GPS",
      "SOS emergency beacon",
      "Topo maps included",
      "Waterproof case",
      "Pre-loaded waypoints",
    ],
    specs: {
      GPS: "Garmin inReach Mini 2",
      Battery: "Up to 14 days",
      SOS: "Global coverage",
      Maps: "USGS 1:24000",
      Compass: "Silva baseplate",
    },
    available_count: 8,
    rating: 4.9,
    review_count: 67,
    created_at: "",
  },
  "lighting-safety": {
    id: "5",
    name: "Lighting & Safety",
    slug: "lighting-safety",
    category: "Safety",
    description: "Headlamps, lanterns, first-aid kits and emergency shelters.",
    long_description:
      "Be prepared for anything with our curated safety bundles. Each kit includes a high-lumen rechargeable headlamp, a compact camp lantern, a comprehensive wilderness first-aid kit, and an emergency bivy.",
    price_per_day: 5,
    image_url:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80",
    gallery_images: [],
    badge: null,
    features: [
      "400+ lumen headlamp",
      "Rechargeable batteries",
      "Wilderness first-aid",
      "Emergency bivy included",
      "Firestarter kit",
    ],
    specs: {
      Headlamp: "Black Diamond Spot 400",
      Lumens: "400",
      Battery: "Rechargeable USB-C",
      "First Aid": "Wilderness-rated",
      Weight: "0.8 kg total",
    },
    available_count: 20,
    rating: 4.5,
    review_count: 93,
    created_at: "",
  },
  "trekking-poles": {
    id: "6",
    name: "Trekking Poles",
    slug: "trekking-poles",
    category: "Accessories",
    description:
      "Carbon and aluminum poles with ergonomic grips. Foldable and adjustable.",
    long_description:
      "Take the pressure off your knees and power up those ascents. Our trekking poles come in both carbon fiber and aluminum options. All poles feature ergonomic cork or foam grips and adjustable wrist straps.",
    price_per_day: 6,
    image_url:
      "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
    gallery_images: [],
    badge: null,
    features: [
      "Carbon and aluminum options",
      "Cork/foam grips",
      "Foldable to 38cm",
      "Adjustable length",
      "Snow baskets included",
    ],
    specs: {
      Material: "Carbon fiber / 7075 Aluminum",
      Weight: "180g-280g per pole",
      Collapsed: "38 cm",
      Extended: "100-135 cm",
      Grip: "Cork and EVA foam",
    },
    available_count: 18,
    rating: 4.7,
    review_count: 71,
    created_at: "",
  },
};

async function getGear(slug: string): Promise<GearItem | null> {
  try {
    const supabase = await createServerComponentClient();
    const { data } = await supabase
      .from("gear")
      .select("*")
      .eq("slug", slug)
      .single();
    if (data) return data;
  } catch (e) {
    // fallback
  }
  return fallbackGear[slug] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gear = await getGear(slug);
  if (!gear) return { title: "Gear Not Found" };

  return {
    title: `Rent ${gear.name} — ₹${gear.price_per_day}/day`,
    description: gear.description,
    openGraph: {
      title: `Rent ${gear.name} | Summit Rentals`,
      description: gear.description,
      images: gear.image_url
        ? [{ url: gear.image_url, width: 800, height: 600 }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const supabase = await createServerComponentClient();
    const { data } = await supabase.from("gear").select("slug");
    if (data) return data.map((g) => ({ slug: g.slug }));
  } catch (e) {
    // fallback
  }
  return Object.keys(fallbackGear).map((slug) => ({ slug }));
}

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gear = await getGear(slug);
  if (!gear) notFound();

  const gradientMap: Record<string, string> = {
    Packs: "from-[#2d5016] to-[#1a2a1a]",
    Shelter: "from-[#4a2810] to-[#2a1a0d]",
    Footwear: "from-[#1a3040] to-[#0d1a2e]",
    Electronics: "from-[#3a1a2e] to-[#1a0d1a]",
    Safety: "from-[#2a2a10] to-[#1a1a0d]",
    Accessories: "from-[#103030] to-[#0d1a1a]",
  };
  const gradient = gradientMap[gear.category] || "from-slate to-obsidian";

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: gear.name,
    description: gear.description,
    image: gear.image_url,
    offers: {
      "@type": "Offer",
      price: gear.price_per_day,
      priceCurrency: "USD",
      availability:
        gear.available_count > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: gear.rating,
      reviewCount: gear.review_count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="pt-24 pb-6 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm text-cloud">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-sunrise transition-colors"
                aria-label="Go to homepage"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
            </li>
            <span className="text-granite">/</span>
            <li>
              <Link
                href="/gear"
                className="hover:text-sunrise transition-colors"
              >
                Gear
              </Link>
            </li>
            <span className="text-granite">/</span>
            <li className="text-snow font-medium" aria-current="page">
              {gear.name}
            </li>
          </ol>

          {/* Back to Gear Button */}
          <Link
            href="/gear"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-slate hover:bg-granite border border-white/10 hover:border-sunrise rounded-xl text-cloud hover:text-sunrise transition-all group"
            aria-label="Back to gear collection"
          >
            <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Gear
          </Link>
        </div>
      </nav>

      {/* Hero Image Section */}
      <section className={`relative pb-0 bg-gradient-to-br ${gradient}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          {/* Image */}
          <div className="relative h-[350px] md:h-[500px] rounded-t-2xl overflow-hidden">
            {gear.image_url ? (
              <Image
                src={gear.image_url}
                alt={gear.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🎒
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            {gear.badge && (
              <span className="absolute top-6 right-6 bg-sunrise text-obsidian px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {gear.badge}
              </span>
            )}
          </div>

          {/* Quick Info Overlay */}
          <div className="pb-10 lg:pb-16">
            <span className="text-xs font-bold tracking-[3px] uppercase text-sunrise/80">
              {gear.category}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-[3px] leading-[0.95] mt-2">
              {gear.name}
            </h1>
            <p className="text-cloud text-lg leading-relaxed mt-4 max-w-lg">
              {gear.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-6">
              <div className="font-display text-4xl sm:text-5xl text-sunrise">
                ₹{gear.price_per_day}
                <span className="text-cloud text-sm font-body font-normal ml-1">
                  /day
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-peak text-lg">★</span>
                <span className="text-snow font-semibold">{gear.rating}</span>
                <span className="text-cloud text-sm">
                  ({gear.review_count} reviews)
                </span>
              </div>
            </div>
            <div className="mt-4">
              {gear.available_count > 0 ? (
                <span className="inline-flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400">
                    {gear.available_count} available now
                  </span>
                </span>
              ) : (
                <span className="text-red-400 text-sm">
                  Currently unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details Content */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Description + Features + Specs */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <h2 className="font-display text-2xl tracking-[2px] mb-4">
                ABOUT THIS GEAR
              </h2>
              <p className="text-cloud leading-relaxed text-[15px]">
                {gear.long_description || gear.description}
              </p>
            </div>

            {/* Features */}
            {gear.features && gear.features.length > 0 && (
              <div>
                <h2 className="font-display text-2xl tracking-[2px] mb-5">
                  KEY FEATURES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gear.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-slate/50 rounded-xl px-5 py-4 border border-white/5"
                    >
                      <span className="text-sunrise mt-0.5 text-lg">✓</span>
                      <span className="text-sm text-mist">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table */}
            {gear.specs && Object.keys(gear.specs).length > 0 && (
              <div>
                <h2 className="font-display text-2xl tracking-[2px] mb-5">
                  SPECIFICATIONS
                </h2>
                <div className="bg-slate/40 rounded-2xl overflow-hidden border border-white/5">
                  {Object.entries(gear.specs).map(([key, value], i) => (
                    <div
                      key={key}
                      className={`flex justify-between px-6 py-4 ${
                        i % 2 === 0 ? "bg-white/[0.02]" : ""
                      } ${i < Object.keys(gear.specs).length - 1 ? "border-b border-white/5" : ""}`}
                    >
                      <span className="text-cloud text-sm font-medium">
                        {key}
                      </span>
                      <span className="text-snow text-sm text-right">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <ReviewSection gearId={gear.id} />
          </div>

          {/* Right: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <RentalBooking gear={gear} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Gear Section */}
      <RelatedGear currentGear={gear} />
    </>
  );
}

// Related Gear Component
async function RelatedGear({ currentGear }: { currentGear: GearItem }) {
  let relatedItems: GearItem[] = [];

  try {
    const supabase = await createServerComponentClient();
    const { data } = await supabase
      .from("gear")
      .select("*")
      .neq("id", currentGear.id) // Exclude current item
      .eq("category", currentGear.category) // Same category first
      .limit(3);

    if (data && data.length > 0) {
      relatedItems = data;
    } else {
      // If no items in same category, get random other items
      const { data: otherData } = await supabase
        .from("gear")
        .select("*")
        .neq("id", currentGear.id)
        .limit(3);
      if (otherData) relatedItems = otherData;
    }
  } catch (e) {
    // Fallback to some related items from fallbackGear
    const fallbackGear: GearItem[] = [
      {
        id: "1",
        name: "Trekking Backpacks",
        slug: "trekking-backpacks",
        category: "Packs",
        description: "50L-75L expedition packs from top brands.",
        long_description: "",
        price_per_day: 12,
        image_url:
          "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&q=80",
        gallery_images: [],
        badge: "Popular",
        features: [],
        specs: {},
        available_count: 15,
        rating: 4.8,
        review_count: 124,
        created_at: "",
      },
      {
        id: "2",
        name: "Camping Tents",
        slug: "camping-tents",
        category: "Shelter",
        description: "2-4 person ultralight and 4-season tents.",
        long_description: "",
        price_per_day: 18,
        image_url:
          "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80",
        gallery_images: [],
        badge: null,
        features: [],
        specs: {},
        available_count: 10,
        rating: 4.7,
        review_count: 89,
        created_at: "",
      },
      {
        id: "3",
        name: "Hiking Boots",
        slug: "hiking-boots",
        category: "Footwear",
        description: "Professional fitted trail boots.",
        long_description: "",
        price_per_day: 8,
        image_url:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
        gallery_images: [],
        badge: null,
        features: [],
        specs: {},
        available_count: 25,
        rating: 4.6,
        review_count: 156,
        created_at: "",
      },
    ];
    relatedItems = fallbackGear
      .filter((item) => item.id !== currentGear.id)
      .slice(0, 3);
  }

  if (relatedItems.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-10 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl tracking-[2px] mb-4">
            YOU MIGHT ALSO LIKE
          </h2>
          <p className="text-cloud text-lg">
            More great gear from our {currentGear.category.toLowerCase()}{" "}
            collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/gear/${item.slug}`}
              className="group block"
            >
              <div className="bg-slate rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="relative h-48 bg-gradient-to-br from-granite to-slate">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🎒
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute top-3 right-3 bg-sunrise text-obsidian px-2 py-1 rounded-full text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl tracking-wider mb-2 group-hover:text-sunrise transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-cloud text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="font-display text-xl text-sunrise">
                      ₹{item.price_per_day}
                      <span className="text-cloud text-xs font-normal ml-1">
                        /day
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-peak">★</span>
                      <span className="text-snow">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gear"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-sunrise hover:bg-sunrise hover:text-obsidian text-sunrise rounded-full font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
          >
            Browse All Gear
          </Link>
        </div>
      </div>
    </section>
  );
}
