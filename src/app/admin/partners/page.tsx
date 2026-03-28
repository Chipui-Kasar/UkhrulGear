"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface PartnerLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  image_url: string | null;
  services: string[];
  specialties: string[];
  hours: Record<string, string>;
  coordinates: { lat: number; lng: number } | null;
  featured: boolean;
  active: boolean;
  created_at: string;
}

export default function PartnerLocationManagement() {
  const [locations, setLocations] = useState<PartnerLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "CO",
    zip_code: "",
    phone: "",
    email: "",
    website: "",
    image_url: "",
    services: [] as string[],
    specialties: [] as string[],
    hours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
    featured: false,
    active: true,
  });

  const supabase = createClient();

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const { data, error } = await supabase
        .from("partner_locations")
        .select("*")
        .order("featured", { ascending: false })
        .order("name");

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error loading partner locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const createLocation = async () => {
    try {
      const locationData = {
        ...newLocation,
        hours: JSON.stringify(newLocation.hours),
        coordinates: null, // Could integrate with geocoding API
      };

      const { error } = await supabase
        .from("partner_locations")
        .insert([locationData]);

      if (error) throw error;
      resetNewLocation();
      setShowAddForm(false);
      loadLocations();
    } catch (error) {
      console.error("Error creating partner location:", error);
    }
  };

  const updateLocation = async (
    id: string,
    updates: Partial<PartnerLocation>,
  ) => {
    try {
      if (updates.hours) {
        updates.hours = JSON.stringify(updates.hours) as any;
      }

      const { error } = await supabase
        .from("partner_locations")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      loadLocations();
    } catch (error) {
      console.error("Error updating partner location:", error);
    }
  };

  const deleteLocation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner location?"))
      return;

    try {
      const { error } = await supabase
        .from("partner_locations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadLocations();
    } catch (error) {
      console.error("Error deleting partner location:", error);
    }
  };

  const resetNewLocation = () => {
    setNewLocation({
      name: "",
      description: "",
      address: "",
      city: "",
      state: "CO",
      zip_code: "",
      phone: "",
      email: "",
      website: "",
      image_url: "",
      services: [],
      specialties: [],
      hours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      featured: false,
      active: true,
    });
  };

  const commonServices = [
    "Gear Sales",
    "Repairs",
    "Rentals",
    "Guidebooks",
    "Equipment Sales",
    "Ski Rentals",
    "Bike Rentals",
    "Guided Services",
    "Classes",
    "Group Outings",
  ];

  const commonSpecialties = [
    "Climbing",
    "Hiking",
    "Camping",
    "Winter Sports",
    "Skiing",
    "Snowboarding",
    "Mountain Biking",
    "Backcountry",
    "Photography",
    "Wilderness Survival",
    "Rock Climbing",
    "14er Preparation",
    "Fishing",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-cloud">Loading partner locations...</div>
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
              PARTNER LOCATIONS
            </h1>
            <p className="text-cloud text-lg">
              Manage partner store locations and details
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add Location
          </button>
        </div>

        {/* Add Location Form */}
        {showAddForm && (
          <div className="bg-slate rounded-xl p-6 border border-white/5 mb-8">
            <h3 className="font-display text-xl tracking-wider text-snow mb-6">
              Add New Partner Location
            </h3>
            <PartnerLocationForm
              data={newLocation}
              onChange={setNewLocation}
              onSave={createLocation}
              onCancel={() => {
                setShowAddForm(false);
                resetNewLocation();
              }}
              commonServices={commonServices}
              commonSpecialties={commonSpecialties}
              submitText="Add Location"
            />
          </div>
        )}

        {/* Locations Grid */}
        <div className="grid gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-slate rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              {editingId === location.id ? (
                <EditLocationForm
                  location={location}
                  onSave={(updates: Partial<PartnerLocation>) => {
                    updateLocation(location.id, updates);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                  commonServices={commonServices}
                  commonSpecialties={commonSpecialties}
                />
              ) : (
                <div className="flex items-start gap-6">
                  {location.image_url && (
                    <div className="flex-shrink-0">
                      <img
                        src={location.image_url}
                        alt={location.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl tracking-wider text-snow">
                            {location.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {location.featured && (
                              <span className="px-2 py-1 bg-sunrise/20 text-sunrise rounded-lg text-xs font-bold">
                                FEATURED
                              </span>
                            )}
                            <span
                              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                location.active
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {location.active ? "ACTIVE" : "INACTIVE"}
                            </span>
                          </div>
                        </div>

                        <p className="text-cloud mb-2">
                          {location.description}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-mist mb-3">
                          <MapPinIcon className="w-4 h-4" />
                          <span>
                            {location.address}, {location.city},{" "}
                            {location.state} {location.zip_code}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingId(location.id)}
                          className="p-2 text-cloud hover:text-moss transition-colors"
                          title="Edit Location"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() =>
                            updateLocation(location.id, {
                              featured: !location.featured,
                            })
                          }
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            location.featured
                              ? "bg-sunrise/20 text-sunrise hover:bg-sunrise/30"
                              : "bg-white/10 text-cloud hover:bg-white/20"
                          }`}
                        >
                          {location.featured ? "Featured" : "Feature"}
                        </button>

                        <button
                          onClick={() =>
                            updateLocation(location.id, {
                              active: !location.active,
                            })
                          }
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            location.active
                              ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                              : "bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400"
                          }`}
                        >
                          {location.active ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          onClick={() => deleteLocation(location.id)}
                          className="p-2 text-cloud hover:text-red-400 transition-colors"
                          title="Delete Location"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                      {/* Contact Info */}
                      {(location.phone ||
                        location.email ||
                        location.website) && (
                        <div>
                          <h4 className="font-medium text-cloud mb-2">
                            Contact
                          </h4>
                          <div className="space-y-1 text-mist">
                            {location.phone && <div>{location.phone}</div>}
                            {location.email && <div>{location.email}</div>}
                            {location.website && (
                              <div>
                                <a
                                  href={location.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-moss hover:text-trail underline"
                                >
                                  Website
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Services */}
                      {location.services.length > 0 && (
                        <div>
                          <h4 className="font-medium text-cloud mb-2">
                            Services
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {location.services.map((service) => (
                              <span
                                key={service}
                                className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specialties */}
                      {location.specialties.length > 0 && (
                        <div>
                          <h4 className="font-medium text-cloud mb-2">
                            Specialties
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {location.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {locations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-cloud text-lg mb-4">
              No partner locations found
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Your First Location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PartnerLocationForm({
  data,
  onChange,
  onSave,
  onCancel,
  commonServices,
  commonSpecialties,
  submitText,
}: any) {
  const handleArrayChange = (
    field: "services" | "specialties",
    value: string,
    checked: boolean,
  ) => {
    const currentArray = data[field] || [];
    if (checked) {
      onChange({ ...data, [field]: [...currentArray, value] });
    } else {
      onChange({
        ...data,
        [field]: currentArray.filter((item: string) => item !== value),
      });
    }
  };

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
            placeholder="Partner name..."
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
          Description *
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={3}
          className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss resize-vertical"
          placeholder="Brief description of the partner..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Address *
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange({ ...data, address: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="Street address..."
          />
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            City *
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="City..."
          />
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={data.zip_code}
            onChange={(e) => onChange({ ...data, zip_code: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="80301..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="(303) 555-0123..."
          />
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="info@partner.com..."
          />
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => onChange({ ...data, website: e.target.value })}
            className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
            placeholder="https://partner.com..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Services
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-white/20 rounded-lg p-3 bg-obsidian">
            {commonServices.map((service: string) => (
              <label key={service} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.services?.includes(service) || false}
                  onChange={(e) =>
                    handleArrayChange("services", service, e.target.checked)
                  }
                  className="w-4 h-4 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
                />
                <span className="text-cloud">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-cloud text-sm font-medium mb-2">
            Specialties
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-white/20 rounded-lg p-3 bg-obsidian">
            {commonSpecialties.map((specialty: string) => (
              <label
                key={specialty}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={data.specialties?.includes(specialty) || false}
                  onChange={(e) =>
                    handleArrayChange(
                      "specialties",
                      specialty,
                      e.target.checked,
                    )
                  }
                  className="w-4 h-4 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
                />
                <span className="text-cloud">{specialty}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(e) => onChange({ ...data, featured: e.target.checked })}
            className="w-5 h-5 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
          />
          <span className="text-cloud">Featured Partner</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.active}
            onChange={(e) => onChange({ ...data, active: e.target.checked })}
            className="w-5 h-5 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
          />
          <span className="text-cloud">Active</span>
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

function EditLocationForm({
  location,
  onSave,
  onCancel,
  commonServices,
  commonSpecialties,
}: any) {
  const [formData, setFormData] = useState({
    name: location.name,
    description: location.description,
    address: location.address,
    city: location.city,
    state: location.state,
    zip_code: location.zip_code,
    phone: location.phone || "",
    email: location.email || "",
    website: location.website || "",
    image_url: location.image_url || "",
    services: location.services || [],
    specialties: location.specialties || [],
    featured: location.featured,
    active: location.active,
  });

  return (
    <PartnerLocationForm
      data={formData}
      onChange={setFormData}
      onSave={() => onSave(formData)}
      onCancel={onCancel}
      commonServices={commonServices}
      commonSpecialties={commonSpecialties}
      submitText="Save Changes"
    />
  );
}
