import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Loktak Lake Camping Equipment Rental | Manipur's Largest Lake | Summit Rentals",
  description:
    "Premium camping equipment rentals for Loktak Lake, Manipur. Complete camping gear for phumdi floating islands, Keibul Lamjao National Park, and Manipur's largest freshwater lake adventure.",
  keywords: [
    "loktak lake camping",
    "loktak lake",
    "manipur camping",
    "phumdi floating islands",
    "keibul lamjao national park",
    "manipur largest lake",
    "sendra island",
    "manipur freshwater lake",
    "loktak floating huts",
    "manipur eco tourism",
    "northeast india camping",
    "manipur lake adventure",
  ],
};

export default function LoktakLakeCampingPage() {
  const lakeFeatures = [
    {
      title: "Phumdi Floating Islands",
      description:
        "Unique floating biomass islands that are home to diverse wildlife and the endangered Sangai deer.",
      activities: ["Wildlife watching", "Photography", "Boat tours"],
    },
    {
      title: "Keibul Lamjao National Park",
      description:
        "World's only floating national park, sanctuary for the rare Sangai (Manipur's state animal).",
      activities: ["Sangai spotting", "Bird watching", "Nature photography"],
    },
    {
      title: "Sendra Island",
      description:
        "Tourist resort with stunning lake views and recreational facilities for camping and relaxation.",
      activities: ["Camping", "Recreational fishing", "Lake sports"],
    },
    {
      title: "Traditional Fishing",
      description:
        "Experience authentic Manipuri fishing techniques with local fishermen using traditional methods.",
      activities: ["Traditional fishing", "Cultural exchange", "Local cuisine"],
    },
  ];

  const campingSpots = [
    {
      name: "Sendra Island Resort Area",
      difficulty: "Easy",
      facilities: "Toilets, Restaurant nearby",
      views: "360° lake views",
      bestFor: "First-time campers, Families",
    },
    {
      name: "Thanga Island",
      difficulty: "Moderate",
      facilities: "Basic facilities",
      views: "Sunrise over phumdis",
      bestFor: "Photography enthusiasts",
    },
    {
      name: "Karang Island",
      difficulty: "Moderate",
      facilities: "Fishing village nearby",
      views: "Traditional fishing boat views",
      bestFor: "Cultural immersion",
    },
    {
      name: "Floating Camping Experience",
      difficulty: "Advanced",
      facilities: "Self-sufficient setup required",
      views: "Unique floating experience",
      bestFor: "Adventure seekers",
    },
  ];

  const equipmentPackages = [
    {
      name: "Loktak Lake Family Camping",
      price: "₹4,500/day",
      capacity: "4-6 people",
      badge: "Family Friendly",
      includes: [
        "Large Family Tent (6-person)",
        "Comfortable Sleeping Bags",
        "Portable Camping Table & Chairs",
        "Gas Stove & Cooking Utensils",
        "Cooler Box & Water Bottles",
        "Rechargeable Lanterns",
        "First Aid & Safety Kit",
        "Waterproof Tarps",
      ],
    },
    {
      name: "Wildlife Photography Camp",
      price: "₹5,200/day",
      capacity: "2-3 people",
      badge: "Photography Special",
      includes: [
        "Weather-Resistant Tent",
        "Professional Camera Gear",
        "Telephoto & Wide Angle Lenses",
        "Sturdy Tripod System",
        "Camouflage Blind Setup",
        "Binoculars & Spotting Scope",
        "Solar Power Bank",
        "Memory Cards & Batteries",
      ],
    },
    {
      name: "Eco Adventure Explorer",
      price: "₹3,800/day",
      capacity: "2-4 people",
      badge: "Eco Friendly",
      includes: [
        "Eco-Friendly Camping Gear",
        "Biodegradable Toiletries",
        "Solar Powered Equipment",
        "Water Purification System",
        "Compact Cooking Setup",
        "Nature Guide Books",
        "Bird Watching Equipment",
        "Leave-No-Trace Kit",
      ],
    },
  ];

  const activities = [
    {
      activity: "Sunrise Boat Tour",
      time: "5:30 AM - 7:00 AM",
      description:
        "Experience magical sunrise over floating phumdis with mist rising from the lake.",
      equipment: "Camera, Warm clothes, Waterproof bag",
    },
    {
      activity: "Sangai Wildlife Spotting",
      time: "6:00 AM - 9:00 AM",
      description:
        "Best chance to spot the endangered Sangai deer in Keibul Lamjao National Park.",
      equipment: "Binoculars, Telephoto lens, Silent movement gear",
    },
    {
      activity: "Traditional Fishing Experience",
      time: "10:00 AM - 2:00 PM",
      description:
        "Learn traditional Manipuri fishing techniques from local fishermen.",
      equipment: "Fishing gear (provided), Sun protection, Cooler box",
    },
    {
      activity: "Cultural Village Visit",
      time: "3:00 PM - 6:00 PM",
      description:
        "Visit local fishing villages and experience authentic Manipuri lake culture.",
      equipment: "Walking shoes, Camera, Gift items for locals",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-obsidian to-teal-900/20" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_20%_80%,rgba(20,184,166,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_80%_20%,rgba(59,130,246,0.08),transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <RevealOnScroll delay={0.1}>
            <span className="inline-flex items-center gap-2 bg-[rgba(20,184,166,0.15)] border border-[rgba(20,184,166,0.3)] px-5 py-2 rounded-full text-xs font-medium tracking-[2px] uppercase text-teal-300 mb-6">
              🏕️ Loktak Lake Adventure
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <h1 className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-[0.95] tracking-[4px]">
              LOKTAK LAKE <span className="text-teal-400">CAMPING</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.35}>
            <p className="text-cloud text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
              Experience Manipur's largest freshwater lake. Premium camping
              equipment for phumdi floating islands, Sangai wildlife viewing,
              and authentic fishing village experiences.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-9 px-4">
              <Link
                href="#packages"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                View Camping Gear →
              </Link>
              <Link
                href="#spots"
                className="inline-flex items-center gap-2 bg-transparent text-snow border-2 border-white/20 hover:border-white/60 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Camping Spots
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Lake Features */}
      <section className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-teal-400 mb-4">
            Unique Ecosystem
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            LOKTAK LAKE WONDERS
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {lakeFeatures.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 0.15}>
              <div className="bg-gradient-to-br from-granite to-slate/50 rounded-2xl p-8 border border-teal-400/20">
                <h3 className="font-display text-xl tracking-[2px] text-teal-400 mb-4">
                  {feature.title}
                </h3>
                <p className="text-cloud leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div>
                  <div className="text-sunrise text-sm font-semibold mb-2">
                    Popular Activities:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {feature.activities.map((activity, j) => (
                      <span
                        key={j}
                        className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Camping Spots */}
      <section id="spots" className="py-24 px-6 md:px-10 bg-slate">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-teal-400 mb-4">
            Prime Locations
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            CAMPING DESTINATIONS
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {campingSpots.map((spot, i) => (
            <RevealOnScroll key={spot.name} delay={i * 0.15}>
              <div className="bg-granite rounded-2xl p-8">
                <h3 className="font-display text-lg tracking-[2px] text-sunrise mb-4">
                  {spot.name}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-teal-400 font-semibold">
                      Difficulty:
                    </span>
                    <div className="text-mist">{spot.difficulty}</div>
                  </div>
                  <div>
                    <span className="text-teal-400 font-semibold">
                      Best For:
                    </span>
                    <div className="text-mist">{spot.bestFor}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-teal-400 font-semibold text-sm">
                      Facilities:
                    </span>
                    <div className="text-mist text-sm">{spot.facilities}</div>
                  </div>
                  <div>
                    <span className="text-teal-400 font-semibold text-sm">
                      Views:
                    </span>
                    <div className="text-mist text-sm">{spot.views}</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Equipment Packages */}
      <section id="packages" className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-teal-400 mb-4">
            Camping Equipment
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            LOKTAK CAMPING PACKAGES
          </h2>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {equipmentPackages.map((pkg, i) => (
            <RevealOnScroll key={pkg.name} delay={i * 0.15}>
              <div className="bg-granite rounded-2xl p-8 relative border-2 border-transparent hover:border-teal-400/30 transition-all">
                {pkg.badge && (
                  <div className="absolute -top-3 left-6 bg-teal-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                    {pkg.badge}
                  </div>
                )}
                <div className="text-right mb-4">
                  <div className="text-2xl font-bold text-sunrise">
                    {pkg.price}
                  </div>
                  <div className="text-sm text-cloud">{pkg.capacity}</div>
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
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/gear"
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 w-full justify-center"
                >
                  Book Package
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Activities Schedule */}
      <section className="py-24 px-6 md:px-10 bg-slate">
        <RevealOnScroll className="text-center mb-16">
          <div className="text-xs font-bold tracking-[4px] uppercase text-teal-400 mb-4">
            Daily Activities
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] tracking-[3px]">
            LAKESIDE ADVENTURES
          </h2>
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto space-y-6">
          {activities.map((activity, i) => (
            <RevealOnScroll key={activity.activity} delay={i * 0.1}>
              <div className="bg-granite rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <h4 className="font-semibold text-sunrise text-lg mb-2">
                    {activity.activity}
                  </h4>
                  <div className="text-teal-400 text-sm font-medium">
                    {activity.time}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-cloud leading-relaxed">
                    {activity.description}
                  </p>
                </div>
                <div className="md:w-1/4">
                  <div className="text-teal-400 text-sm font-semibold mb-2">
                    Required Gear:
                  </div>
                  <div className="text-mist text-sm">{activity.equipment}</div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-10">
        <RevealOnScroll className="text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] tracking-[3px] mb-6">
            READY FOR LOKTAK ADVENTURE?
          </h2>
          <p className="text-cloud text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Book your camping equipment today and experience the unique floating
            islands, spot the rare Sangai deer, and immerse yourself in
            authentic Manipuri lake culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 bg-sunrise hover:bg-peak text-obsidian px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all hover:-translate-y-1"
            >
              Browse Camping Gear →
            </Link>
            <Link
              href="/partner-locations"
              className="inline-flex items-center gap-2 bg-transparent text-snow border-2 border-white/20 hover:border-white/60 px-12 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all hover:-translate-y-1"
            >
              Find Pickup Locations
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
