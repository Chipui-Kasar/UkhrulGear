"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image_url: string;
  gear_used: string;
  adventure_type: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "featured" | "published">("all");
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    location: "",
    quote: "",
    rating: 5,
    image_url: "",
    gear_used: "",
    adventure_type: "",
    featured: false,
    published: true,
  });

  const supabase = createClient();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async () => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .insert([newTestimonial]);

      if (error) throw error;
      resetNewTestimonial();
      setShowAddForm(false);
      loadTestimonials();
    } catch (error) {
      console.error("Error creating testimonial:", error);
    }
  };

  const updateTestimonial = async (
    id: string,
    updates: Partial<Testimonial>,
  ) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      loadTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const resetNewTestimonial = () => {
    setNewTestimonial({
      name: "",
      location: "",
      quote: "",
      rating: 5,
      image_url: "",
      gear_used: "",
      adventure_type: "",
      featured: false,
      published: true,
    });
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    switch (filter) {
      case "featured":
        return testimonial.featured;
      case "published":
        return testimonial.published;
      default:
        return true;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="w-4 h-4 text-gray-400" />
      ),
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-cloud">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl tracking-[2px] text-snow mb-4">
              TESTIMONIALS
            </h1>
            <p className="text-cloud text-lg">
              Manage customer reviews and testimonials
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Testimonial
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { key: "all", label: "All Testimonials" },
            { key: "featured", label: "Featured" },
            { key: "published", label: "Published" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.key
                  ? "bg-moss text-obsidian"
                  : "bg-slate text-cloud hover:text-snow border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add Testimonial Form */}
        {showAddForm && (
          <div className="bg-slate rounded-xl p-6 border border-white/5 mb-8">
            <h3 className="font-display text-xl tracking-wider text-snow mb-6">
              Add New Testimonial
            </h3>
            <TestimonialForm
              data={newTestimonial}
              onChange={setNewTestimonial}
              onSave={createTestimonial}
              onCancel={() => {
                setShowAddForm(false);
                resetNewTestimonial();
              }}
              submitText="Add Testimonial"
            />
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              {editingId === testimonial.id ? (
                <EditTestimonialForm
                  testimonial={testimonial}
                  onSave={(updates: Partial<Testimonial>) => {
                    updateTestimonial(testimonial.id, updates);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex items-start gap-6">
                  {testimonial.image_url && (
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="w-16 h-16 object-cover rounded-full border border-white/10"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-lg tracking-wider text-snow">
                            {testimonial.name}
                          </h3>
                          <span className="text-cloud text-sm">
                            {testimonial.location}
                          </span>
                          <div className="flex items-center gap-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {testimonial.featured && (
                            <span className="px-2 py-1 bg-sunrise/20 text-sunrise rounded-lg text-xs font-bold">
                              FEATURED
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              testimonial.published
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {testimonial.published ? "PUBLISHED" : "DRAFT"}
                          </span>
                          {testimonial.adventure_type && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                              {testimonial.adventure_type}
                            </span>
                          )}
                        </div>

                        <blockquote className="text-cloud text-lg leading-relaxed mb-3 pl-4 border-l-4 border-moss/30">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        {testimonial.gear_used && (
                          <div className="text-sm text-mist">
                            <strong>Gear Used:</strong> {testimonial.gear_used}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingId(testimonial.id)}
                          className="p-2 text-cloud hover:text-moss transition-colors"
                          title="Edit Testimonial"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() =>
                            updateTestimonial(testimonial.id, {
                              featured: !testimonial.featured,
                            })
                          }
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            testimonial.featured
                              ? "bg-sunrise/20 text-sunrise hover:bg-sunrise/30"
                              : "bg-white/10 text-cloud hover:bg-white/20"
                          }`}
                        >
                          {testimonial.featured ? "Featured" : "Feature"}
                        </button>

                        <button
                          onClick={() =>
                            updateTestimonial(testimonial.id, {
                              published: !testimonial.published,
                            })
                          }
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            testimonial.published
                              ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                              : "bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400"
                          }`}
                        >
                          {testimonial.published ? "Hide" : "Show"}
                        </button>

                        <button
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="p-2 text-cloud hover:text-red-400 transition-colors"
                          title="Delete Testimonial"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-cloud text-lg mb-4">No testimonials found</div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Your First Testimonial
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TestimonialForm({
  data,
  onChange,
  onSave,
  onCancel,
  submitText,
}: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="Customer name..."
          />
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="City, State..."
          />
        </div>
      </div>

      <div>
        <label className="block text-cloud text-sm font-medium mb-2">
          Quote *
        </label>
        <textarea
          value={data.quote}
          onChange={(e) => onChange({ ...data, quote: e.target.value })}
          rows={4}
          className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss resize-vertical"
          placeholder="Customer testimonial..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Rating *
          </label>
          <select
            value={data.rating}
            onChange={(e) =>
              onChange({ ...data, rating: parseInt(e.target.value) })
            }
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow focus:outline-none focus:border-moss"
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Adventure Type
          </label>
          <input
            type="text"
            value={data.adventure_type}
            onChange={(e) =>
              onChange({ ...data, adventure_type: e.target.value })
            }
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="e.g., Day Hiking, Backpacking..."
          />
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={data.image_url}
            onChange={(e) => onChange({ ...data, image_url: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-cloud text-sm font-medium mb-2">
          Gear Used
        </label>
        <input
          type="text"
          value={data.gear_used}
          onChange={(e) => onChange({ ...data, gear_used: e.target.value })}
          className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
          placeholder="e.g., Backpack, Tent, Hiking Boots..."
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(e) => onChange({ ...data, featured: e.target.checked })}
            className="w-5 h-5 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
          />
          <span className="text-cloud">Featured Testimonial</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => onChange({ ...data, published: e.target.checked })}
            className="w-5 h-5 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
          />
          <span className="text-cloud">Published</span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <button
          onClick={onSave}
          className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-lg font-bold transition-colors"
        >
          {submitText}
        </button>
        <button
          onClick={onCancel}
          className="bg-slate border border-white/20 text-cloud hover:text-snow px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function EditTestimonialForm({ testimonial, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: testimonial.name,
    location: testimonial.location || "",
    quote: testimonial.quote,
    rating: testimonial.rating,
    image_url: testimonial.image_url || "",
    gear_used: testimonial.gear_used || "",
    adventure_type: testimonial.adventure_type || "",
    featured: testimonial.featured,
    published: testimonial.published,
  });

  return (
    <TestimonialForm
      data={formData}
      onChange={setFormData}
      onSave={() => onSave(formData)}
      onCancel={onCancel}
      submitText="Save Changes"
    />
  );
}
