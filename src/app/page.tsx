import { createServerComponentClient } from "@/lib/supabase-server";
import { GearItem } from "@/lib/types";
import GearCard from "@/components/GearCard";
import ContactForm from "@/components/ContactForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Ukhrul Trekking Equipment Rental | Shirui Lily Festival | Manipur Tourism",
  description:
    "Premium equipment rentals for Ukhrul trekking, Shirui Lily festival, Loktak Lake camping, and Manipur tourism adventures. Cars, cameras, camping gear delivered across Manipur.",
};

// Fallback data when Supabase is not configured
const fallbackGear: GearItem[] = [
  {
    id: "1",
    name: "Ukhrul Trekking Vehicles",
    slug: "ukhrul-trekking-vehicles",
    category: "Vehicles",
    description:
      "4WD vehicles perfect for Ukhrul trekking, Shirui Lily festival visits, and Manipur mountain exploration.",
    long_description: "",
    price_per_day: 2500,
    image_url: "",
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
    name: "Shirui Lily Photography Cameras",
    slug: "shirui-lily-cameras",
    category: "Electronics",
    description:
      "Professional cameras for capturing Shirui Lily festival, Ukhrul landscapes, and Manipur tourism memories.",
    long_description: "",
    price_per_day: 1200,
    image_url: "",
    gallery_images: [],
    badge: "Festival Special",
    features: [],
    specs: {},
    available_count: 10,
    rating: 4.7,
    review_count: 89,
    created_at: "",
  },
  {
    id: "3",
    name: "Manipur Mountain Bikes",
    slug: "manipur-mountain-bikes",
    category: "Sports",
    description:
      "Sturdy mountain bikes for Ukhrul trails, Khangkhui cave exploration, and Manipur hill adventures.",
    long_description: "",
    price_per_day: 600,
    image_url: "",
    gallery_images: [],
    badge: "Adventure Ready",
    features: [],
    specs: {},
    available_count: 25,
    rating: 4.6,
    review_count: 156,
    created_at: "",
  },
  {
    id: "4",
    name: "Loktak Lake Camping Gear",
    slug: "loktak-camping-gear",
    category: "Camping",
    description:
      "Complete camping equipment for Loktak Lake, Ukhrul camping, and Manipur outdoor adventures.",
    long_description: "",
    price_per_day: 800,
    image_url: "",
    gallery_images: [],
    badge: "Camping Special",
    features: [],
    specs: {},
    available_count: 18,
    rating: 4.9,
    review_count: 67,
    created_at: "",
  },
  {
    id: "5",
    name: "Khangkhui Cave Exploration Kit",
    slug: "khangkhui-cave-kit",
    category: "Adventure",
    description:
      "Professional spelunking equipment for Khangkhui cave exploration and Ukhrul adventure tours.",
    long_description: "",
    price_per_day: 1000,
    image_url: "",
    gallery_images: [],
    badge: "Cave Special",
    features: [],
    specs: {},
    available_count: 20,
    rating: 4.8,
    review_count: 45,
    created_at: "",
  },
  {
    id: "6",
    name: "Manipur Cultural Event Equipment",
    slug: "manipur-cultural-equipment",
    category: "Cultural",
    description:
      "Traditional dance costumes, music equipment, and festival gear for Manipur cultural events and Shirui Lily festival.",
    long_description: "",
    price_per_day: 500,
    image_url: "",
    gallery_images: [],
    badge: "Cultural Special",
    features: [],
    specs: {},
    available_count: 18,
    rating: 4.7,
    review_count: 71,
    created_at: "",
  },
];

export default async function HomePage() {
  let gear: GearItem[] = fallbackGear;

  try {
    const supabase = await createServerComponentClient();
    const { data } = await supabase
      .from("gear")
      .select("*")
      .order("created_at");
    if (data && data.length > 0) gear = data;
  } catch (e) {
    // Use fallback data
  }

  const stats = [
    { number: "500+", label: "Tourism Equipment" },
    { number: "2K+", label: "Ukhrul Trekkers" },
    { number: "98%", label: "Happy Adventurers" },
    { number: "24h", label: "Fast Delivery" },
  ];

  const steps = [
    {
      icon: "🏔️",
      title: "CHOOSE YOUR ADVENTURE",
      desc: "Browse our curated collection of tourism equipment perfect for Ukhrul trekking, Shirui Lily festival, and Manipur exploration.",
    },
    {
      icon: "🚗",
      title: "WE DELIVER TO MANIPUR",
      desc: "Select your dates and we deliver sanitized, adventure-ready equipment to your location in Manipur within 24 hours.",
    },
    {
      icon: "🌸",
      title: "EXPLORE & RETURN",
      desc: "Experience Ukhrul's beauty, take stunning Shirui Lily photos! When finished, schedule a free pickup or drop off at any partner location.",
    },
  ];

  const reviews = [
    {
      initials: "PT",
      name: "Priya Thokchom",
      trail: "Ukhrul Trekking",
      text: "Summit Rentals made our Shirui Lily festival trip unforgettable! The trekking gear was perfect for Ukhrul hills, and the photography equipment captured amazing shots of the rare Shirui lilies.",
    },
    {
      initials: "RK",
      name: "Rajkumar Singh",
      trail: "Loktak Lake Camping",
      text: "Excellent camping equipment for our weekend at Loktak Lake. Everything from tents to cooking gear was top quality. Our family thoroughly enjoyed the Manipur adventure experience!",
    },
    {
      initials: "MS",
      name: "Maya Shimray",
      trail: "Khangkhui Cave Exploration",
      text: "Third time using Summit's adventure equipment for exploring Khangkhui caves. Their spelunking kit is professional-grade and made our cave exploration safe and exciting.",
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* BG layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-obsidian to-[#1a2a1a]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_20%_80%,rgba(76,175,80,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_80%_20%,rgba(255,111,32,0.1),transparent_70%)]" />
        </div>
        {/* Mountain SVG */}
        <div className="absolute bottom-0 w-full">
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            className="w-full h-auto"
          >
            <polygon
              points="0,400 200,180 400,320 600,120 800,280 1000,100 1200,260 1440,160 1440,400"
              fill="rgba(44,44,58,0.4)"
            />
            <polygon
              points="0,400 100,280 300,200 500,300 700,180 900,320 1100,200 1300,300 1440,220 1440,400"
              fill="rgba(26,26,46,0.6)"
            />
            <polygon
              points="0,400 150,320 350,260 550,340 750,240 950,350 1150,280 1350,360 1440,300 1440,400"
              fill="#0D0D0D"
            />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <RevealOnScroll delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-[rgba(255,111,32,0.15)] border border-[rgba(255,111,32,0.3)] px-5 py-2 rounded-full text-xs font-medium tracking-[2px] uppercase text-peak mb-6">
              🌸 Ukhrul Trekking & Manipur Tourism Rentals
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] tracking-[4px]">
              EXPLORE <span className="text-sunrise">MANIPUR</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.35}>
            <p className="text-cloud text-lg max-w-xl mx-auto mt-5 leading-relaxed">
              Essential equipment for Ukhrul trekking, Shirui Lily festival,
              Loktak Lake camping, and Manipur adventure tourism. From vehicles
              to camping gear — everything for your Northeast India expedition.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-9 px-4">
              <Link
                href="/gear"
                className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-8 sm:px-9 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-[0_4px_30px_rgba(116,192,252,0.4)] w-full sm:w-auto text-center justify-center"
              >
                Browse Equipment →
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center gap-2 bg-transparent text-snow border-2 border-white/20 hover:border-white/60 px-8 sm:px-9 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 w-full sm:w-auto text-center justify-center"
              >
                How It Works
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[3px] text-cloud">
            Scroll
          </span>
          <div className="w-px h-10 bg-white/20 relative overflow-hidden">
            <div className="absolute w-full h-full bg-sunrise animate-[scrollDown_2s_ease_infinite]" />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-slate border-t-[3px] border-moss grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <RevealOnScroll key={s.label} delay={i * 0.1}>
            <div className="py-8 sm:py-12 px-4 sm:px-6 text-center border-r border-white/5 last:border-r-0">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl text-moss tracking-wider">
                {s.number}
              </div>
              <div className="text-cloud text-xs uppercase tracking-[2px] mt-1">
                {s.label}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </section>

      {/* ===== GEAR ===== */}
      <section
        id="gear"
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10"
      >
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
            Our Collection
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            EQUIPMENT FOR EVERY ADVENTURE
          </h2>
          <p className="text-cloud text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            Tourism-grade equipment, meticulously maintained and ready for the
            trail.
          </p>
        </RevealOnScroll>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {gear.map((item, i) => (
            <GearCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Browse All Gear CTA */}
        <RevealOnScroll className="text-center mt-16">
          <Link
            href="/gear"
            className="inline-flex items-center gap-3 bg-sunrise hover:bg-peak text-obsidian px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all hover:-translate-y-1 shadow-[0_8px_40px_rgba(255,111,32,0.4)] group"
          >
            Explore Full Collection
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <p className="text-cloud text-sm mt-4">
            Browse {gear.length}+ premium gear items • Filter by category • Book
            instantly
          </p>
        </RevealOnScroll>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section
        id="how"
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 bg-slate"
      >
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
            Simple Process
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            HOW IT WORKS
          </h2>
        </RevealOnScroll>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, i) => (
            <RevealOnScroll
              key={step.title}
              delay={i * 0.15}
              className="text-center relative py-10 px-6"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-display text-7xl text-sunrise/10">
                0{i + 1}
              </div>
              <div className="w-16 h-16 rounded-full bg-sunrise/10 border-2 border-sunrise flex items-center justify-center mx-auto mb-5 text-2xl relative z-10">
                {step.icon}
              </div>
              <h3 className="font-display text-xl tracking-[2px] mb-2">
                {step.title}
              </h3>
              <p className="text-cloud text-sm leading-relaxed">{step.desc}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-24 md:py-32 px-6 md:px-10">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
            Testimonials
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            WHAT ADVENTURERS SAY
          </h2>
        </RevealOnScroll>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <RevealOnScroll key={r.name} delay={i * 0.12}>
              <div className="bg-granite rounded-2xl p-8 relative">
                <div className="absolute top-3 left-6 font-display text-6xl text-sunrise/15 leading-none">
                  &ldquo;
                </div>
                <div className="text-peak text-sm mb-3">★★★★★</div>
                <p className="text-mist text-sm leading-relaxed italic relative z-10">
                  {r.text}
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="w-10 h-10 rounded-full bg-sunrise flex items-center justify-center text-obsidian text-sm font-bold">
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-cloud text-xs">{r.trail}</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-10 bg-slate">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
            Get In Touch
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            PLAN YOUR ADVENTURE
          </h2>
        </RevealOnScroll>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealOnScroll direction="left">
            <h3 className="font-display text-2xl tracking-[2px] mb-4">
              LET&apos;S DISCUSS YOUR NEEDS
            </h3>
            <p className="text-cloud leading-relaxed mb-8">
              Our equipment experts are here to help you find the perfect setup
              for any project, any duration.
            </p>
            <div className="space-y-5">
              {[
                {
                  icon: "📍",
                  title: "Imphal, Manipur, Northeast India",
                  sub: "Open Mon–Sat, 8am–6pm",
                },
                {
                  icon: "📞",
                  title: "+91 98765 43210",
                  sub: "Call or WhatsApp",
                },
                {
                  icon: "✉️",
                  title: "hello@summitrentals.com",
                  sub: "Quick Response Guaranteed",
                },
              ].map((d) => (
                <div key={d.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sunrise/10 border border-sunrise/20 flex items-center justify-center text-xl shrink-0">
                    {d.icon}
                  </div>
                  <div>
                    <div className="text-sm">{d.title}</div>
                    <div className="text-cloud text-xs">{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right">
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
