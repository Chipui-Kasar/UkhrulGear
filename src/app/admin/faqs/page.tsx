"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-client";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  published: boolean;
  created_at: string;
}

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    category: "",
    published: true,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error("Error loading FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async () => {
    try {
      const maxOrder = Math.max(...faqs.map((f) => f.order_index), 0);
      const { error } = await supabase.from("faqs").insert([
        {
          ...newFAQ,
          order_index: maxOrder + 1,
        },
      ]);

      if (error) throw error;
      setNewFAQ({ question: "", answer: "", category: "", published: true });
      setShowAddForm(false);
      loadFAQs();
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  };

  const updateFAQ = async (id: string, updates: Partial<FAQ>) => {
    try {
      const { error } = await supabase
        .from("faqs")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      loadFAQs();
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  const deleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);

      if (error) throw error;
      loadFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const reorderFAQ = async (id: string, direction: "up" | "down") => {
    const currentIndex = faqs.findIndex((f) => f.id === id);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    // Swap order indexes
    const current = faqs[currentIndex];
    const target = faqs[targetIndex];

    await Promise.all([
      updateFAQ(current.id, { order_index: target.order_index }),
      updateFAQ(target.id, { order_index: current.order_index }),
    ]);
  };

  const categories = Array.from(new Set(faqs.map((f) => f.category))).filter(
    Boolean,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-cloud">Loading FAQs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl tracking-[2px] text-snow mb-4">
              FAQ MANAGEMENT
            </h1>
            <p className="text-cloud text-lg">
              Manage frequently asked questions
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Add FAQ
          </button>
        </div>

        {/* Add FAQ Form */}
        {showAddForm && (
          <div className="bg-slate rounded-xl p-6 border border-white/5 mb-8">
            <h3 className="font-display text-xl tracking-wider text-snow mb-4">
              Add New FAQ
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={newFAQ.question}
                  onChange={(e) =>
                    setNewFAQ({ ...newFAQ, question: e.target.value })
                  }
                  className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
                  placeholder="Enter the question..."
                />
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Answer
                </label>
                <textarea
                  value={newFAQ.answer}
                  onChange={(e) =>
                    setNewFAQ({ ...newFAQ, answer: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss resize-vertical"
                  placeholder="Enter the answer..."
                />
              </div>

              <div>
                <label className="block text-cloud text-sm font-medium mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={newFAQ.category}
                  onChange={(e) =>
                    setNewFAQ({ ...newFAQ, category: e.target.value })
                  }
                  className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
                  placeholder="e.g., Booking, Gear, Policies"
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={newFAQ.published}
                  onChange={(e) =>
                    setNewFAQ({ ...newFAQ, published: e.target.checked })
                  }
                  className="w-5 h-5 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
                />
                <label htmlFor="published" className="text-cloud">
                  Published
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={createFAQ}
                  className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Add FAQ
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewFAQ({
                      question: "",
                      answer: "",
                      category: "",
                      published: true,
                    });
                  }}
                  className="bg-slate border border-white/20 text-cloud hover:text-snow px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQs List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-slate rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              {editingId === faq.id ? (
                // Edit mode
                <EditFAQForm
                  faq={faq}
                  onSave={(updates) => {
                    updateFAQ(faq.id, updates);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                  categories={categories}
                />
              ) : (
                // Display mode
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => reorderFAQ(faq.id, "up")}
                      disabled={index === 0}
                      className="p-1 text-cloud hover:text-moss disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUpIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => reorderFAQ(faq.id, "down")}
                      disabled={index === faqs.length - 1}
                      className="p-1 text-cloud hover:text-moss disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDownIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                          {faq.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            faq.published
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {faq.published ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingId(faq.id)}
                          className="p-2 text-cloud hover:text-moss transition-colors"
                          title="Edit FAQ"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            updateFAQ(faq.id, { published: !faq.published })
                          }
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            faq.published
                              ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                              : "bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400"
                          }`}
                        >
                          {faq.published ? "Hide" : "Show"}
                        </button>
                        <button
                          onClick={() => deleteFAQ(faq.id)}
                          className="p-2 text-cloud hover:text-red-400 transition-colors"
                          title="Delete FAQ"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-display text-lg tracking-wider text-snow mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-cloud leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-cloud text-lg mb-4">No FAQs found</div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Create Your First FAQ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EditFAQForm({
  faq,
  onSave,
  onCancel,
  categories,
}: {
  faq: FAQ;
  onSave: (updates: Partial<FAQ>) => void;
  onCancel: () => void;
  categories: string[];
}) {
  const [formData, setFormData] = useState({
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    published: faq.published,
  });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-cloud text-sm font-medium mb-2">
          Question
        </label>
        <input
          type="text"
          value={formData.question}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
        />
      </div>

      <div>
        <label className="block text-cloud text-sm font-medium mb-2">
          Answer
        </label>
        <textarea
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          rows={4}
          className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss resize-vertical"
        />
      </div>

      <div>
        <label className="block text-cloud text-sm font-medium mb-2">
          Category
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full bg-obsidian border border-white/20 rounded-lg px-4 py-3 text-snow placeholder-mist focus:outline-none focus:border-moss"
          list="edit-categories"
        />
        <datalist id="edit-categories">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="edit-published"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="w-5 h-5 text-moss bg-obsidian border border-white/20 rounded focus:ring-moss"
        />
        <label htmlFor="edit-published" className="text-cloud">
          Published
        </label>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <button
          onClick={() => onSave(formData)}
          className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-2 rounded-lg font-bold transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="bg-slate border border-white/20 text-cloud hover:text-snow px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
