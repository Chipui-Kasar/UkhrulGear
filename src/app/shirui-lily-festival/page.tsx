import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Shirui Lily Festival Equipment Rental | Photography & Camping Gear | Summit Rentals",
  description:
    "Premium equipment rentals for Shirui Lily Festival in Ukhrul, Manipur. Professional photography gear, camping equipment, and trekking essentials for the sacred flower festival experience.",
  keywords: [
    "shirui lily festival",
    "shirui lily",
    "shirui hills",
    "manipur state flower",
    "ukhrul festival",
    "shirui lily photography",
    "manipur cultural festival",
    "northeast india festivals",
    "sacred lily festival",
    "ukhrul camping",
    "manipur tourism",
    "shirui lily trekking",
  ],
};

export default function ShiruiLilyFestivalPage() {
  const festivalInfo = [
    {
      title: "Festival Season",
      content: "April - May annually",
      description:
        "The Shirui Lily blooms only during these months, making it a rare and special event.",
    },
    {
      title: "Cultural Significance",
      content: "State Flower of Manipur",
      description:
        "Protected by law, the Shirui Lily represents the cultural heritage of the Tangkhul community.",
    },
    {
      title: "Location",
      content: "Shirui Hills, Ukhrul District",
      description:
        "Found only in this specific region of Manipur, making it a globally unique destination.",
    },
    {
      title: "Festival Duration",
      content: "3-7 days celebration",
      description:
        "Includes traditional dances, local cuisine, cultural programs, and guided lily viewing tours.",
    },
  ];

  const photographyTips = [
    {
      tip: "Golden Hour Photography",
      gear: "DSLR Camera, Tripod",
      description:
        "Capture the delicate pink petals during sunrise and sunset for magical lighting.",
    },
    {
      tip: "Macro Flower Shots",
      gear: "Macro Lens, Ring Flash",
      description:
        "Get intimate close-ups of the unique flower structure and dewdrops.",
    },
    {
      tip: "Landscape Compositions",
      gear: "Wide Angle Lens, Filters",
      description:
        "Showcase the lily fields against the backdrop of Ukhrul&apos;s rolling hills.",
    },
    {
      tip: "Cultural Documentation",
      gear: "Portrait Lens, External Flash",
      description:
        "Document the Tangkhul traditions and festival celebrations.",
    },
  ];

  const equipmentPackages = [
    {
      name: "Shirui Lily Photography Pro",
      price: "₹3,500/day",
      badge: "Most Popular",
      includes: [
        "Canon/Nikon DSLR Camera",
        "100mm Macro Lens",
        "24-70mm Zoom Lens",
        "Sturdy Carbon Tripod",
        "Circular Polarizer Filter",
        "Extra Batteries & Memory Cards",
        "Weather Protection Kit",
      ],
    },
    {
      name: "Festival Camping Experience",
      price: "₹4,200/day",
      badge: "Complete Package",
      includes: [
        "4-Season Camping Tent",
        "Cold Weather Sleeping Bag",
        "Portable Camping Stove",
        "Cooking Utensils Set",
        "Headlamp & Lantern",
        "Folding Chairs & Table",
        "First Aid Kit",
      ],
    },
    {
      name: "Cultural Documentation Kit",
      price: "₹2,800/day",
      badge: "Heritage Special",
      includes: [
        "Video Camera with Stabilizer",
        "Wireless Microphone System",
        "LED Light Panel",
        "Backup Power Banks",
        "Traditional Costume Props",
        "Audio Recorder",
        "Extra Storage Cards",
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-obsidian to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_30%_70%,rgba(236,72,153,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_70%_30%,rgba(168,85,247,0.08),transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <RevealOnScroll delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-[rgba(236,72,153,0.15)] border border-[rgba(236,72,153,0.3)] px-5 py-2 rounded-full text-xs font-medium tracking-[2px] uppercase text-pink-300 mb-6">
              🌸 Sacred Flower Festival
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <h1 className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-[0.95] tracking-[4px]">
              SHIRUI LILY <span className="text-pink-400">FESTIVAL</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.35}>
            <p className="text-cloud text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Experience Manipur&apos;s most sacred flower festival.
              Professional photography equipment and camping gear for the rare
              Shirui Lily blooming season in Ukhrul hills.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-9 px-4">
              <Link
                href="#packages"
                className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                View Equipment →
              </Link>
              <Link
                href="#festival-info"
                className="inline-flex items-center gap-2 bg-transparent text-snow border-2 border-white/20 hover:border-white/60 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Festival Info
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Festival Information */}
      <section id="festival-info" className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-pink-400 mb-4">
            About the Festival
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            SHIRUI LILY HERITAGE
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {festivalInfo.map((info, i) => (
            <RevealOnScroll key={info.title} delay={i * 0.15}>
              <div className="bg-gradient-to-br from-granite to-slate/50 rounded-2xl p-8 border border-pink-400/20">
                <h3 className="font-display text-xl tracking-[2px] text-pink-400 mb-3">
                  {info.title}
                </h3>
                <div className="text-sunrise font-semibold text-lg mb-3">
                  {info.content}
                </div>
                <p className="text-cloud leading-relaxed">{info.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Photography Tips */}
      <section className="py-24 px-6 md:px-10 bg-slate">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-pink-400 mb-4">
            Photography Guide
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            CAPTURE THE SACRED LILY
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {photographyTips.map((tip, i) => (
            <RevealOnScroll key={tip.tip} delay={i * 0.15}>
              <div className="bg-granite rounded-2xl p-8">
                <h3 className="font-display text-lg tracking-[2px] text-sunrise mb-3">
                  {tip.tip}
                </h3>
                <div className="text-pink-400 font-semibold text-sm mb-4">
                  Recommended Gear: {tip.gear}
                </div>
                <p className="text-cloud leading-relaxed">{tip.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Equipment Packages */}
      <section id="packages" className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-pink-400 mb-4">
            Festival Equipment
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            SHIRUI LILY PACKAGES
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {equipmentPackages.map((pkg, i) => (
            <RevealOnScroll key={pkg.name} delay={i * 0.15}>
              <div className="bg-granite rounded-2xl p-8 relative border-2 border-transparent hover:border-pink-400/30 transition-all">
                {pkg.badge && (
                  <div className="absolute -top-3 left-6 bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    {pkg.badge}
                  </div>
                )}
                <div className="text-right mb-4">
                  <div className="text-2xl font-bold text-sunrise">
                    {pkg.price}
                  </div>
                </div>
                <h3 className="font-display text-xl tracking-[2px] mb-6">
                  {pkg.name}
                </h3>
                <div className="space-y-3 mb-8">
                  {pkg.includes.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-3 text-sm text-mist"
                    >
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/gear"
                  className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 w-full justify-center"
                >
                  Book Package
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Festival Schedule */}
      <section className="py-24 px-6 md:px-10 bg-slate">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-pink-400 mb-4">
            Plan Your Visit
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            FESTIVAL SCHEDULE
          </h2>
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-granite rounded-2xl p-8 space-y-6">
              <div className="text-center">
                <div className="text-sunrise text-2xl font-bold mb-2">
                  April - May 2024
                </div>
                <div className="text-cloud">Peak Blooming Season</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-pink-400">
                    Festival Activities:
                  </h4>
                  <ul className="space-y-2 text-sm text-cloud">
                    <li>• Traditional Tangkhul dances</li>
                    <li>• Local cuisine tastings</li>
                    <li>• Guided lily viewing tours</li>
                    <li>• Cultural exhibitions</li>
                    <li>• Photography competitions</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-pink-400">Best Times:</h4>
                  <ul className="space-y-2 text-sm text-cloud">
                    <li>• Early morning (5:30-8:00 AM)</li>
                    <li>• Late afternoon (4:00-6:30 PM)</li>
                    <li>• Avoid midday heat</li>
                    <li>• Check weather conditions</li>
                    <li>• Book accommodation early</li>
                  </ul>
                </div>
              </div>
              <div className="text-center pt-6">
                <Link
                  href="/gear"
                  className="inline-flex items-center gap-2 bg-sunrise hover:bg-peak text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
                >
                  Reserve Equipment Now →
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
