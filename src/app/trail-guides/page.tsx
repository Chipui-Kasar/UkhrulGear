import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trail Guides - Summit Rentals",
  description:
    "Discover Colorado's best hiking trails with our comprehensive guides. Trail maps, difficulty ratings, gear recommendations, and insider tips.",
};

export default function TrailGuidesPage() {
  const trailCategories = [
    { name: "All Trails", count: "24", filter: "all" },
    { name: "Easy", count: "8", filter: "easy" },
    { name: "Moderate", count: "10", filter: "moderate" },
    { name: "Difficult", count: "6", filter: "difficult" },
    { name: "Day Hikes", count: "18", filter: "day" },
    { name: "Backpacking", count: "6", filter: "backpacking" },
  ];

  const featuredTrail = {
    name: "Hanging Lake Trail",
    location: "Glenwood Canyon",
    difficulty: "Moderate",
    distance: "3.1 miles round trip",
    elevation: "+1,200 ft",
    duration: "2-4 hours",
    season: "May - October",
    description:
      "One of Colorado's most photographed natural wonders. This steep trail leads to a stunning turquoise lake hanging on the edge of Glenwood Canyon's cliffs.",
    highlights: [
      "Hanging Lake",
      "Spouting Rock",
      "Turquoise Waters",
      "Limestone Cliffs",
    ],
    gearNeeded: [
      "Hiking Boots",
      "Water",
      "Snacks",
      "Camera",
      "Reservation Required",
    ],
    image: "🏔️",
  };

  const trails = [
    {
      name: "Bear Lake to Emerald Lake",
      location: "Rocky Mountain National Park",
      difficulty: "Easy to Moderate",
      distance: "3.2 miles round trip",
      elevation: "+605 ft",
      duration: "2-3 hours",
      season: "June - October",
      description:
        "A spectacular trail that passes three alpine lakes, each more beautiful than the last. Perfect for families and photography enthusiasts.",
      highlights: [
        "Bear Lake",
        "Nymph Lake",
        "Dream Lake",
        "Emerald Lake",
        "Continental Divide Views",
      ],
      gearNeeded: [
        "Day Pack",
        "Water",
        "Layers",
        "Traction Devices (winter)",
        "Camera",
      ],
      image: "💎",
    },
    {
      name: "Mount Elbert",
      location: "Sawatch Range",
      difficulty: "Moderate to Difficult",
      distance: "9.5 miles round trip",
      elevation: "+4,700 ft",
      duration: "6-8 hours",
      season: "July - September",
      description:
        "Colorado's highest peak at 14,440 feet. A challenging but non-technical climb with panoramic views of the entire state.",
      highlights: [
        "Highest Peak in Colorado",
        "360° Views",
        "Alpine Lakes",
        "Wildflower Meadows",
        "14er Achievement",
      ],
      gearNeeded: [
        "Mountaineering Pack",
        "Layers",
        "Plenty of Water",
        "High-Energy Food",
        "Headlamp",
        "First Aid",
      ],
      image: "🏔️",
    },
    {
      name: "Blue Lake Trail",
      location: "Indian Peaks Wilderness",
      difficulty: "Moderate",
      distance: "5.4 miles round trip",
      elevation: "+2,400 ft",
      duration: "4-5 hours",
      season: "July - September",
      description:
        "A hidden gem leading to a pristine alpine lake surrounded by dramatic peaks. Less crowded than many Front Range trails.",
      highlights: [
        "Alpine Lake",
        "Wildflower Displays",
        "Mountain Goats",
        "Solitude",
        "Photography Opportunities",
      ],
      gearNeeded: [
        "Day Pack",
        "Water Filtration",
        "Warm Layers",
        "Sturdy Boots",
        "Snacks",
      ],
      image: "💙",
    },
    {
      name: "Maroon Bells Four Pass Loop",
      location: "Aspen/Snowmass Wilderness",
      difficulty: "Difficult",
      distance: "26.4 miles",
      elevation: "+7,800 ft",
      duration: "3-5 days",
      season: "July - September",
      description:
        "One of Colorado&apos;s most spectacular backpacking loops, crossing four high mountain passes with iconic Maroon Bells views.",
      highlights: [
        "Maroon Bells",
        "Four Alpine Passes",
        "Crater Lake",
        "Snowmass Mountain",
        "Backpacking Classic",
      ],
      gearNeeded: [
        "Backpacking Tent",
        "Sleeping System",
        "Cooking Gear",
        "Multi-day Food",
        "Navigation",
        "Bear Canister",
      ],
      image: "🎒",
    },
    {
      name: "St. Mary's Glacier",
      location: "Arapaho National Forest",
      difficulty: "Moderate",
      distance: "1.5 miles round trip",
      elevation: "+1,200 ft",
      duration: "2-3 hours",
      season: "All Year",
      description:
        "A short hike to one of Colorado's few remaining glaciers. Popular for sledding and unique year-round snow activities.",
      highlights: [
        "Year-round Snow",
        "Glacier Views",
        "Sledding Opportunities",
        "Short Distance",
        "Family Friendly",
      ],
      gearNeeded: [
        "Warm Layers",
        "Waterproof Boots",
        "Gloves",
        "Sled (optional)",
        "Sun Protection",
      ],
      image: "❄️",
    },
    {
      name: "Great Sand Dunes",
      location: "Great Sand Dunes National Park",
      difficulty: "Easy",
      distance: "Variable",
      elevation: "+750 ft (to ridge)",
      duration: "1-4 hours",
      season: "All Year",
      description:
        "Climb North America's tallest sand dunes. A unique Colorado experience with sledding, sandboarding, and stargazing.",
      highlights: [
        "Tallest Sand Dunes",
        "Sandboarding",
        "Medano Creek",
        "Stargazing",
        "Unique Landscape",
      ],
      gearNeeded: [
        "Sand Gear",
        "Plenty of Water",
        "Sun Protection",
        "Sandboard (rental available)",
        "Closed-toe Shoes",
      ],
      image: "🏜️",
    },
  ];

  const gearGuides = [
    {
      title: "Day Hiking Package",
      price: "₹150/day",
      items: [
        "Day Pack 30L",
        "Trekking Poles",
        "Water Bottles",
        "First Aid Kit",
        "Emergency Shelter",
      ],
    },
    {
      title: "Photography Hiking Package",
      price: "₹250/day",
      items: [
        "Camera Backpack",
        "Tripod",
        "Lens Filters",
        "Extra Batteries",
        "Weather Protection",
      ],
    },
    {
      title: "Backpacking Package",
      price: "₹450/day",
      items: [
        "Backpacking Pack 65L",
        "Tent",
        "Sleeping Bag",
        "Sleeping Pad",
        "Cooking System",
        "Food Storage",
      ],
    },
  ];

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              TRAIL <span className="text-moss">GUIDES</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Discover Colorado&apos;s most spectacular trails. Expert guides,
              detailed maps, and gear recommendations for unforgettable
              adventures.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Trail Categories */}
      <section className="py-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {trailCategories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full border transition-all ${
                  category.filter === "all"
                    ? "bg-moss text-obsidian border-moss"
                    : "border-white/20 text-cloud hover:border-moss hover:text-moss"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trail */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="bg-slate rounded-2xl p-8 lg:p-12 border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-moss/20 text-moss rounded-full text-xs font-bold uppercase">
                    Featured Trail
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      featuredTrail.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : featuredTrail.difficulty === "Moderate"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {featuredTrail.difficulty}
                  </span>
                </div>

                <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-2 leading-tight">
                  {featuredTrail.name}
                </h2>
                <p className="text-trail text-lg mb-4">
                  {featuredTrail.location}
                </p>
                <p className="text-mist leading-relaxed mb-6">
                  {featuredTrail.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="space-y-2">
                    <div className="text-cloud">
                      Distance:{" "}
                      <span className="text-snow">
                        {featuredTrail.distance}
                      </span>
                    </div>
                    <div className="text-cloud">
                      Elevation:{" "}
                      <span className="text-snow">
                        {featuredTrail.elevation}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-cloud">
                      Duration:{" "}
                      <span className="text-snow">
                        {featuredTrail.duration}
                      </span>
                    </div>
                    <div className="text-cloud">
                      Season:{" "}
                      <span className="text-snow">{featuredTrail.season}</span>
                    </div>
                  </div>
                </div>

                <button className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all">
                  View Full Guide
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-[8rem] opacity-80">
                  {featuredTrail.image}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Trail Grid */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                COLORADO <span className="text-moss">TRAILS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                From easy nature walks to challenging 14ers, explore
                Colorado&apos;s diverse landscapes with our detailed trail
                guides.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trails.map((trail, i) => (
              <RevealOnScroll key={trail.name} delay={i * 0.1}>
                <div className="bg-obsidian rounded-2xl border border-white/5 overflow-hidden group hover:border-moss/30 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-center h-20 mb-4 text-4xl">
                      {trail.image}
                    </div>

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-display text-xl tracking-wider group-hover:text-moss transition-colors leading-tight mb-1">
                          {trail.name}
                        </h3>
                        <p className="text-trail text-sm">{trail.location}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        trail.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : trail.difficulty === "Moderate"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : trail.difficulty === "Easy to Moderate"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : trail.difficulty === "Moderate to Difficult"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {trail.difficulty}
                    </span>

                    <p className="text-mist text-sm leading-relaxed mb-4 mt-4">
                      {trail.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-cloud">
                          Distance:{" "}
                          <span className="text-snow">{trail.distance}</span>
                        </div>
                        <div className="text-cloud">
                          Elevation:{" "}
                          <span className="text-snow">{trail.elevation}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-cloud">
                          Duration:{" "}
                          <span className="text-snow">{trail.duration}</span>
                        </div>
                        <div className="text-cloud">
                          Season:{" "}
                          <span className="text-snow">{trail.season}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-display text-sm tracking-wider mb-2">
                        HIGHLIGHTS
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trail.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-moss/10 text-moss px-2 py-1 rounded-lg text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display text-sm tracking-wider mb-2">
                        RECOMMENDED GEAR
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trail.gearNeeded.map((gear, idx) => (
                          <span
                            key={idx}
                            className="bg-white/5 text-cloud px-2 py-1 rounded-lg text-xs"
                          >
                            {gear}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Gear Packages */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                GEAR <span className="text-moss">PACKAGES</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Complete gear bundles curated for different adventure types.
                Everything you need in one convenient package.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gearGuides.map((guide, i) => (
              <RevealOnScroll key={guide.title} delay={i * 0.1}>
                <div className="bg-obsidian rounded-2xl p-6 border border-white/5 text-center group hover:border-moss/30 transition-all duration-300">
                  <h3 className="font-display text-xl tracking-wider mb-4 group-hover:text-moss transition-colors">
                    {guide.title}
                  </h3>
                  <div className="text-moss text-2xl font-display mb-4">
                    {guide.price}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {guide.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-cloud text-sm flex items-center justify-center gap-2"
                      >
                        <span className="text-trail text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/gear"
                    className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all inline-block"
                  >
                    View Gear
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                SAFETY <span className="text-moss">FIRST</span>
              </h2>
              <p className="text-mist leading-relaxed">
                Essential safety guidelines for a successful and safe hiking
                experience in Colorado&apos;s mountains.
              </p>
            </div>
          </RevealOnScroll>
          <div className="bg-obsidian rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl tracking-wider mb-4 text-moss">
                  Before You Go
                </h3>
                <ul className="space-y-2 text-cloud text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Check
                    weather conditions and trail closures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Inform
                    someone of your hiking plans
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Pack the
                    10 essentials
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Start
                    early to avoid afternoon storms
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl tracking-wider mb-4 text-moss">
                  On the Trail
                </h3>
                <ul className="space-y-2 text-cloud text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Stay on
                    designated trails
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Drink
                    water regularly and eat snacks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Turn back
                    if conditions deteriorate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-trail text-xs mt-1">✓</span>Respect
                    wildlife and maintain distance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-6">
              START YOUR <span className="text-moss">ADVENTURE</span>
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8">
              Choose your trail, select your gear, and create memories that last
              a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gear"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Rent Gear Now
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                Get Trail Advice
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
