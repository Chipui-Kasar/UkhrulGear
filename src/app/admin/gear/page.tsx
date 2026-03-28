"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-client";
import { GearItem } from "@/lib/types";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

export default function AdminGearPage() {
  const [gear, setGear] = useState<GearItem[]>([]);
  const [filteredGear, setFilteredGear] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const supabase = createClient();

  const categories = [
    "All",
    "Packs",
    "Shelter",
    "Footwear",
    "Electronics",
    "Safety",
    "Accessories",
  ];

  useEffect(() => {
    loadGear();
  }, []);

  useEffect(() => {
    filterGear();
  }, [gear, searchQuery, selectedCategory]);

  const loadGear = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("gear")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) {
        setGear(data);
        setFilteredGear(data);
      }
    } catch (error) {
      console.error("Error loading gear:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterGear = () => {
    let filtered = gear;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

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
  };

  const deleteGear = async (id: string) => {
    try {
      const { error } = await supabase.from("gear").delete().eq("id", id);
      if (!error) {
        setGear(gear.filter((item) => item.id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error deleting gear:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate rounded-2xl p-6">
                  <div className="h-32 bg-granite rounded mb-4"></div>
                  <div className="h-4 bg-granite rounded mb-2"></div>
                  <div className="h-4 bg-granite rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-cloud hover:text-sunrise transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl tracking-[2px] text-snow mb-2">
              GEAR MANAGEMENT
            </h1>
            <p className="text-cloud">Manage your gear inventory</p>
          </div>
          <Link
            href="/admin/gear/new"
            className="flex items-center gap-2 bg-sunrise hover:bg-peak text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add New Gear
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cloud" />
            <input
              type="search"
              placeholder="Search gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-slate border border-white/10 rounded-xl text-snow focus:border-sunrise focus:outline-none transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-2xl font-display text-sunrise">
              {gear.length}
            </div>
            <div className="text-cloud text-sm">Total Items</div>
          </div>
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-2xl font-display text-green-400">
              {gear.filter((g) => g.available_count > 0).length}
            </div>
            <div className="text-cloud text-sm">Available</div>
          </div>
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-2xl font-display text-yellow-400">
              {
                gear.filter(
                  (g) => g.available_count <= 5 && g.available_count > 0,
                ).length
              }
            </div>
            <div className="text-cloud text-sm">Low Stock</div>
          </div>
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-2xl font-display text-red-400">
              {gear.filter((g) => g.available_count === 0).length}
            </div>
            <div className="text-cloud text-sm">Out of Stock</div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-cloud text-sm">
            Showing {filteredGear.length} of {gear.length} items
          </p>
        </div>

        {/* Gear Grid */}
        {filteredGear.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-display text-snow mb-2">
              No gear found
            </h2>
            <p className="text-cloud mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGear.map((item) => (
              <div
                key={item.id}
                className="bg-slate rounded-2xl overflow-hidden border border-white/5 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-granite to-slate">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📦
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute top-3 right-3 bg-sunrise text-obsidian px-2 py-1 rounded-full text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${
                      item.available_count > 5
                        ? "bg-green-500 text-white"
                        : item.available_count > 0
                          ? "bg-yellow-500 text-obsidian"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {item.available_count} left
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg tracking-wider text-snow line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-granite rounded text-cloud">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-cloud text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="font-display text-xl text-sunrise">
                      ₹{item.price_per_day}
                      <span className="text-cloud text-xs font-normal ml-1">
                        /day
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-peak">★</span>
                      <span className="text-snow">{item.rating}</span>
                      <span className="text-cloud">({item.review_count})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/gear/${item.slug}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-granite hover:bg-white/10 text-cloud hover:text-snow rounded-lg text-sm transition-colors"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View
                    </Link>
                    <Link
                      href={`/admin/gear/${item.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-sunrise hover:bg-peak text-obsidian rounded-lg text-sm transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate rounded-2xl p-6 max-w-md mx-4">
              <h3 className="text-xl font-display text-snow mb-4">
                Confirm Delete
              </h3>
              <p className="text-cloud mb-6">
                Are you sure you want to delete this gear item? This action
                cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-granite hover:bg-white/10 text-cloud rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteGear(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
