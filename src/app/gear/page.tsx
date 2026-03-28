"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";
import { GearItem } from "@/lib/types";
import GearCard from "@/components/GearCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const fallbackGear: GearItem[] = [
  {
    id: "1",
    name: "Hatchback Cars",
    slug: "hatchback-cars",
    category: "Vehicles",
    description: "Compact and fuel-efficient cars perfect for city travel.",
    long_description: "",
    price_per_day: 1200,
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
    name: "Professional Cameras",
    slug: "professional-cameras",
    category: "Electronics",
    description: "DSLR and mirrorless cameras for photography projects.",
    long_description: "",
    price_per_day: 800,
    image_url: "",
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
    name: "Mountain Bikes",
    slug: "mountain-bikes",
    category: "Sports",
    description: "High-quality bikes for trails and city commuting.",
    long_description: "",
    price_per_day: 400,
    image_url: "",
    gallery_images: [],
    badge: null,
    features: [],
    specs: {},
    available_count: 25,
    rating: 4.6,
    review_count: 156,
    created_at: "",
  },
  {
    id: "4",
    name: "Sound Systems",
    slug: "sound-systems",
    category: "Audio",
    description: "Professional speakers for events and parties.",
    long_description: "",
    price_per_day: 600,
    image_url: "",
    gallery_images: [],
    badge: "New",
    features: [],
    specs: {},
    available_count: 8,
    rating: 4.9,
    review_count: 67,
    created_at: "",
  },
  {
    id: "5",
    name: "Construction Equipment",
    slug: "construction-equipment",
    category: "Construction",
    description: "Excavators, JCB, and heavy machinery for projects.",
    long_description: "",
    price_per_day: 5000,
    image_url: "",
    gallery_images: [],
    badge: null,
    features: [],
    specs: {},
    available_count: 20,
    rating: 4.5,
    review_count: 93,
    created_at: "",
  },
  {
    id: "6",
    name: "Trekking Poles",
    slug: "trekking-poles",
    category: "Accessories",
    description: "Carbon and aluminum poles with ergonomic grips.",
    long_description: "",
    price_per_day: 6,
    image_url: "",
    gallery_images: [],
    badge: null,
    features: [],
    specs: {},
    available_count: 18,
    rating: 4.7,
    review_count: 71,
    created_at: "",
  },
];

export default function GearPage() {
  const [gear, setGear] = useState<GearItem[]>(fallbackGear);
  const [filteredGear, setFilteredGear] = useState<GearItem[]>(fallbackGear);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(gear.map((g) => g.category))),
  ];

  // Load gear data
  useEffect(() => {
    async function loadGear() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("gear")
          .select("*")
          .order("created_at");
        if (data && data.length > 0) {
          setGear(data);
          setFilteredGear(data);
        }
      } catch (e) {
        // Use fallback data
        setGear(fallbackGear);
        setFilteredGear(fallbackGear);
      } finally {
        setLoading(false);
      }
    }
    loadGear();
  }, []);

  // Filter gear based on category and search
  useEffect(() => {
    let filtered = gear;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      );
    }

    setFilteredGear(filtered);
    setNoResults(
      filtered.length === 0 &&
        (selectedCategory !== "All" || searchQuery.trim() !== ""),
    );
  }, [gear, selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-10 min-h-screen">
      {/* Header */}
      <RevealOnScroll className="text-center mb-12">
        <div className="text-xs font-bold tracking-[4px] uppercase text-sunrise mb-4">
          Full Collection
        </div>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] tracking-[3px]">
          ALL GEAR
        </h1>
        <p className="text-cloud text-lg max-w-xl mx-auto mt-3">
          Everything you need for the trail — rent by the day, adventure for a
          lifetime.
        </p>
      </RevealOnScroll>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cloud" />
          <input
            type="search"
            placeholder="Search gear by name, type, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate border border-white/10 rounded-2xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
            aria-label="Search equipment"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedCategory === cat
                ? "border-sunrise bg-sunrise text-obsidian"
                : "border-white/10 text-cloud hover:border-sunrise hover:text-sunrise"
            }`}
            aria-pressed={selectedCategory === cat}
            aria-label={`Filter by ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Filters & Results Count */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-cloud text-sm">
            {loading
              ? "Loading gear..."
              : `Showing ${filteredGear.length} of ${gear.length} items`}
            {selectedCategory !== "All" && (
              <span className="ml-2 inline-flex items-center gap-1 px-3 py-1 bg-sunrise/20 text-sunrise rounded-full text-xs">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:text-peak"
                  aria-label={`Remove ${selectedCategory} filter`}
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="ml-2 inline-flex items-center gap-1 px-3 py-1 bg-peak/20 text-peak rounded-full text-xs">
                &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-sunrise"
                  aria-label="Clear search"
                >
                  ×
                </button>
              </span>
            )}
          </div>

          {(selectedCategory !== "All" || searchQuery.trim()) && (
            <button
              onClick={clearFilters}
              className="text-sm text-cloud hover:text-sunrise transition-colors underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-slate rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-60 bg-granite" />
              <div className="p-6">
                <div className="h-6 bg-granite rounded mb-2" />
                <div className="h-4 bg-granite rounded mb-4" />
                <div className="h-8 bg-granite rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : noResults ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-display text-snow mb-2">
            No gear found
          </h2>
          <p className="text-cloud mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-sunrise hover:bg-peak text-obsidian rounded-full font-bold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGear.map((item, i) => (
            <GearCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
