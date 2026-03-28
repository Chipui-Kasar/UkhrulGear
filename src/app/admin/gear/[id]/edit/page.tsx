"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { GearItem } from "@/lib/types";
import {
  ChevronLeftIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function EditGearPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const gearId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [gear, setGear] = useState<GearItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    long_description: "",
    price_per_day: "",
    image_url: "",
    badge: "",
    available_count: "",
  });

  const [features, setFeatures] = useState<string[]>([""]);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Packs",
    "Shelter",
    "Footwear",
    "Electronics",
    "Safety",
    "Accessories",
  ];

  const badges = ["", "Popular", "New", "Best Seller", "Limited"];

  useEffect(() => {
    if (gearId) {
      loadGear();
    }
  }, [gearId]);

  const loadGear = async () => {
    try {
      const { data, error } = await supabase
        .from("gear")
        .select("*")
        .eq("id", gearId)
        .single();

      if (error) {
        console.error("Error loading gear:", error);
        router.push("/admin/gear");
        return;
      }

      if (data) {
        setGear(data);
        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          category: data.category || "",
          description: data.description || "",
          long_description: data.long_description || "",
          price_per_day: data.price_per_day?.toString() || "",
          image_url: data.image_url || "",
          badge: data.badge || "",
          available_count: data.available_count?.toString() || "",
        });

        // Set features
        if (data.features && Array.isArray(data.features)) {
          setFeatures(data.features.length > 0 ? data.features : [""]);
        }

        // Set specs
        if (data.specs && typeof data.specs === "object") {
          const specsArray = Object.entries(data.specs).map(([key, value]) => ({
            key,
            value: String(value),
          }));
          setSpecs(
            specsArray.length > 0 ? specsArray : [{ key: "", value: "" }],
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSpecChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price_per_day || parseFloat(formData.price_per_day) <= 0) {
      newErrors.price_per_day = "Valid price is required";
    }
    if (!formData.available_count || parseInt(formData.available_count) < 0) {
      newErrors.available_count = "Valid available count is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    try {
      // Process features and specs
      const processedFeatures = features.filter((f) => f.trim() !== "");
      const processedSpecs = specs.reduce(
        (acc, spec) => {
          if (spec.key.trim() && spec.value.trim()) {
            acc[spec.key.trim()] = spec.value.trim();
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      const updateData = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        description: formData.description.trim(),
        long_description: formData.long_description.trim(),
        price_per_day: parseFloat(formData.price_per_day),
        image_url: formData.image_url.trim(),
        badge: formData.badge || null,
        available_count: parseInt(formData.available_count),
        features: processedFeatures,
        specs: processedSpecs,
      };

      const { error } = await supabase
        .from("gear")
        .update(updateData)
        .eq("id", gearId);

      if (error) {
        console.error("Error updating gear:", error);
        setErrors({ submit: "Failed to update gear. Please try again." });
      } else {
        router.push("/admin/gear");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate rounded mb-6"></div>
            <div className="bg-slate rounded-2xl p-8">
              <div className="h-6 bg-granite rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-granite rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gear) {
    return (
      <div className="min-h-screen bg-obsidian pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-display text-snow mb-4">
            Gear Not Found
          </h1>
          <Link href="/admin/gear" className="text-sunrise hover:text-peak">
            Back to Gear Management
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/gear"
            className="flex items-center gap-2 text-cloud hover:text-sunrise transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Back to Gear Management
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-display text-4xl tracking-[2px] text-snow mb-2">
            EDIT GEAR
          </h1>
          <p className="text-cloud">Update gear item: {gear.name}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-slate rounded-2xl p-8 border border-white/5">
            <h2 className="text-2xl font-display tracking-wider text-snow mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Gear Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                  placeholder="e.g., Mountain Hiking Backpack"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                  placeholder="mountain-hiking-backpack"
                />
                {errors.slug && (
                  <p className="text-red-400 text-sm mt-1">{errors.slug}</p>
                )}
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow focus:border-sunrise focus:outline-none transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Badge
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow focus:border-sunrise focus:outline-none transition-colors"
                >
                  <option value="">No badge</option>
                  {badges
                    .filter((b) => b)
                    .map((badge) => (
                      <option key={badge} value={badge}>
                        {badge}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Price per Day (₹) *
                </label>
                <input
                  type="number"
                  name="price_per_day"
                  value={formData.price_per_day}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                  placeholder="25.00"
                />
                {errors.price_per_day && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.price_per_day}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Available Count *
                </label>
                <input
                  type="number"
                  name="available_count"
                  value={formData.available_count}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                  placeholder="10"
                />
                {errors.available_count && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.available_count}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-slate rounded-2xl p-8 border border-white/5">
            <h2 className="text-2xl font-display tracking-wider text-snow mb-6">
              Descriptions
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors resize-none"
                  placeholder="Brief description for gear cards and previews"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Long Description
                </label>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors resize-none"
                  placeholder="Detailed description for the gear detail page"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-slate rounded-2xl p-8 border border-white/5">
            <h2 className="text-2xl font-display tracking-wider text-snow mb-6">
              Image
            </h2>
            <div>
              <label className="block text-cloud text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="text-cloud text-xs mt-2">
                Recommended: 800x600px or larger, high quality image
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-slate rounded-2xl p-8 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display tracking-wider text-snow">
                Features
              </h2>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 px-4 py-2 bg-sunrise hover:bg-peak text-obsidian rounded-lg font-medium transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                    placeholder="e.g., Waterproof construction"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-3 text-cloud hover:text-red-400 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-slate rounded-2xl p-8 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display tracking-wider text-snow">
                Specifications
              </h2>
              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-2 px-4 py-2 bg-sunrise hover:bg-peak text-obsidian rounded-lg font-medium transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                Add Spec
              </button>
            </div>
            <div className="space-y-3">
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecChange(index, "key", e.target.value)
                    }
                    className="w-1/3 px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                    placeholder="e.g., Material"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecChange(index, "value", e.target.value)
                    }
                    className="flex-1 px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder-cloud focus:border-sunrise focus:outline-none transition-colors"
                    placeholder="e.g., Ripstop Nylon"
                  />
                  {specs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpec(index)}
                      className="px-3 py-3 text-cloud hover:text-red-400 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4">
            <Link
              href="/admin/gear"
              className="flex-1 md:flex-none px-8 py-4 bg-granite hover:bg-white/10 text-cloud rounded-xl font-bold transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-8 py-4 bg-sunrise hover:bg-peak disabled:opacity-50 disabled:cursor-not-allowed text-obsidian rounded-xl font-bold transition-colors"
            >
              {saving ? "Updating..." : "Update Gear"}
            </button>
          </div>

          {errors.submit && (
            <div className="bg-red-600/20 border border-red-600/40 rounded-xl p-4">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
