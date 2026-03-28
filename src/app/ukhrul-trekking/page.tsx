import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Ukhrul Trekking Equipment Rental | Shirui Lily Festival Gear | Summit Rentals",
  description:
    "Premium trekking equipment rentals for Ukhrul hills, Shirui Lily festival photography, Wuyawon camping, and Khangkhui cave exploration. Best rates for Manipur adventure tourism.",
  keywords: [
    "ukhrul trekking",
    "shirui lily festival",
    "ukhrul camping equipment",
    "manipur trekking gear",
    "khangkhui cave exploration",
    "wuyawon kachui camping",
    "harva khangai trekking",
    "ukhrul shirock adventure",
    "manipur hill trekking",
    "northeast india adventure",
  ],
};

export default function UkhrulTrekkingPage() {
  const trekkingSpots = [
    {
      name: "Shirui Hills",
      description:
        "Home to the rare Shirui Lily, a sacred flower of Manipur. Best visited during April-May.",
      difficulty: "Moderate",
      duration: "2-3 days",
      equipment: "Camera, camping gear, trekking boots",
    },
    {
      name: "Khangkhui Cave",
      description:
        "Ancient limestone caves with stalactites and stalagmites. Archaeological significance.",
      difficulty: "Easy to Moderate",
      duration: "1 day",
      equipment: "Headlamps, exploring kit, photography gear",
    },
    {
      name: "Wuyawon Kachui",
      description:
        "Pristine camping location with panoramic views of Ukhrul valley.",
      difficulty: "Moderate",
      duration: "2-3 days",
      equipment: "Camping gear, cooking equipment, weather protection",
    },
    {
      name: "Harva Khangai",
      description:
        "Sacred grove and trekking destination with cultural significance.",
      difficulty: "Easy",
      duration: "1-2 days",
      equipment: "Day pack, camera, comfortable shoes",
    },
  ];

  const rentalPackages = [
    {
      name: "Shirui Lily Photography Package",
      price: "₹2,500/day",
      includes: [
        "Professional DSLR Camera",
        "Macro Lens",
        "Tripod",
        "Extra Batteries",
        "Memory Cards",
      ],
      ideal: "Shirui Lily Festival Documentation",
    },
    {
      name: "Ukhrul Trekking Complete Kit",
      price: "₹3,500/day",
      includes: [
        "Tent",
        "Sleeping Bag",
        "Trekking Poles",
        "Headlamp",
        "First Aid Kit",
      ],
      ideal: "Multi-day Ukhrul Hill Exploration",
    },
    {
      name: "Cave Exploration Pro Set",
      price: "₹2,000/day",
      includes: [
        "Helmet with Light",
        "Gloves",
        "Safety Rope",
        "Emergency Kit",
        "Cave Mapping Tools",
      ],
      ideal: "Khangkhui Cave Adventure",
    },
    {
      name: "Cultural Event Documentation",
      price: "₹1,800/day",
      includes: [
        "Video Camera",
        "Audio Recorder",
        "Lighting Kit",
        "Traditional Costume Props",
      ],
      ideal: "Manipur Cultural Festival Coverage",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-obsidian to-[#1a2a1a]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_20%_80%,rgba(76,175,80,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_80%_20%,rgba(255,111,32,0.1),transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <RevealOnScroll delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-[rgba(255,111,32,0.15)] border border-[rgba(255,111,32,0.3)] px-5 py-2 rounded-full text-xs font-medium tracking-[2px] uppercase text-peak mb-6">
              🌸 Ukhrul Trekking Specialists
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <h1 className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-[0.95] tracking-[4px]">
              EXPLORE <span className="text-sunrise">UKHRUL HILLS</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.35}>
            <p className="text-cloud text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Professional trekking equipment for Shirui Lily festival,
              Khangkhui cave exploration, Wuyawon camping, and all your Ukhrul
              adventure needs. Experience Manipur's hidden gems.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-9 px-4">
              <Link
                href="/gear"
                className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Browse Trekking Gear →
              </Link>
              <Link
                href="#packages"
                className="inline-flex items-center gap-2 bg-transparent text-snow border-2 border-white/20 hover:border-white/60 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                View Packages
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Trekking Destinations */}
      <section className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
            Popular Destinations
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            UKHRUL TREKKING SPOTS
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {trekkingSpots.map((spot, i) => (
            <RevealOnScroll key={spot.name} delay={i * 0.15}>
              <div className="bg-granite rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="font-display text-xl tracking-[2px] text-sunrise mb-4">
                  {spot.name}
                </h3>
                <p className="text-cloud mb-6 leading-relaxed">
                  {spot.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-sunrise font-semibold">
                      Difficulty:
                    </span>
                    <div className="text-mist">{spot.difficulty}</div>
                  </div>
                  <div>
                    <span className="text-sunrise font-semibold">
                      Duration:
                    </span>
                    <div className="text-mist">{spot.duration}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sunrise font-semibold">
                    Required Equipment:
                  </span>
                  <div className="text-mist text-sm mt-1">{spot.equipment}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Rental Packages */}
      <section id="packages" className="py-24 px-6 md:px-10 bg-slate">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
            Equipment Packages
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            UKHRUL ADVENTURE PACKAGES
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {rentalPackages.map((pkg, i) => (
            <RevealOnScroll key={pkg.name} delay={i * 0.15}>
              <div className="bg-granite rounded-2xl p-8 relative border-2 border-transparent hover:border-sunrise/30 transition-all">
                <div className="absolute top-4 right-4 bg-sunrise text-obsidian px-3 py-1 rounded-full text-sm font-bold">
                  {pkg.price}
                </div>
                <h3 className="font-display text-xl tracking-[2px] mb-4 pr-20">
                  {pkg.name}
                </h3>
                <div className="text-cloud text-sm mb-6">
                  Perfect for: <span className="text-sunrise">{pkg.ideal}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sunrise font-semibold text-sm">
                    Package Includes:
                  </div>
                  {pkg.includes.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm text-mist"
                    >
                      <div className="w-1.5 h-1.5 bg-moss rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/gear"
                  className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 mt-6"
                >
                  Book Package
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] tracking-[3px] mb-6">
            READY FOR YOUR UKHRUL ADVENTURE?
          </h2>
          <p className="text-cloud text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Book your trekking equipment today and experience the breathtaking
            beauty of Ukhrul hills, witness the rare Shirui Lily, and explore
            ancient Khangkhui caves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 bg-sunrise hover:bg-peak text-obsidian px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all hover:-translate-y-1"
            >
              Browse All Equipment →
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-transparent text-snow border-2 border-white/20 hover:border-white/60 px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
