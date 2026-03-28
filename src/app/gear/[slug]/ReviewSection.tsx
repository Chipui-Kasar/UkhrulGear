"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase-client";
import { Review } from "@/lib/types";

export default function ReviewSection({ gearId }: { gearId: string }) {
  const supabase = createClient();
  const isMountedRef = useRef(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    rating: 5,
    comment: "",
    project_name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  const fetchReviews = useCallback(async () => {
    if (!isMountedRef.current) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("gear_id", gearId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (data && isMountedRef.current) setReviews(data);
    } catch (e) {
      // no reviews
    }
    if (isMountedRef.current) setLoading(false);
  }, [supabase, gearId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReviews();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchReviews]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        setUserName(
          data.user.user_metadata?.full_name ||
            data.user.email?.split("@")[0] ||
            "Hiker",
        );
      }
    });
  }, [supabase.auth]);

  const handleSubmit = async () => {
    if (!userId || !form.comment) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert([
      {
        gear_id: gearId,
        user_id: userId,
        user_name: userName,
        rating: form.rating,
        comment: form.comment,
        project_name: form.project_name || null,
      },
    ]);
    if (!error) {
      setShowForm(false);
      setForm({ rating: 5, comment: "", project_name: "" });
      fetchReviews();
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl tracking-[2px]">REVIEWS</h2>
        {userId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sunrise text-sm font-medium hover:text-peak transition-colors"
          >
            {showForm ? "Cancel" : "+ Write a Review"}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-slate/60 rounded-xl border border-white/5 p-6 mb-6 space-y-4">
          <div>
            <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  className={`text-2xl transition-colors ${
                    star <= form.rating ? "text-peak" : "text-granite"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
              Project/Usage (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Wedding Photography, Construction Project"
              value={form.project_name}
              onChange={(e) =>
                setForm({ ...form, project_name: e.target.value })
              }
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder:text-cloud/60 outline-none focus:border-sunrise transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
              Your Review
            </label>
            <textarea
              placeholder="How was your experience with this gear?"
              rows={3}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow placeholder:text-cloud/60 outline-none focus:border-sunrise transition-colors resize-y"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || !form.comment}
            className="bg-sunrise hover:bg-peak text-obsidian px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-slate/30 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-1/3 mb-3" />
              <div className="h-3 bg-white/5 rounded w-full mb-2" />
              <div className="h-3 bg-white/5 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate/30 rounded-xl p-6 border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sunrise/20 flex items-center justify-center text-sunrise text-sm font-bold">
                    {review.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {review.user_name}
                    </div>
                    {review.trail_name && (
                      <div className="text-xs text-cloud">
                        {review.trail_name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-peak text-sm">
                  {"★".repeat(review.rating)}
                  <span className="text-granite">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>
              </div>
              <p className="text-cloud text-sm leading-relaxed">
                {review.comment}
              </p>
              <div className="text-xs text-cloud/50 mt-3">
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-cloud">
          <p className="text-sm">
            No reviews yet.{" "}
            {userId
              ? "Be the first to share your experience!"
              : "Sign in to write a review."}
          </p>
        </div>
      )}
    </div>
  );
}
