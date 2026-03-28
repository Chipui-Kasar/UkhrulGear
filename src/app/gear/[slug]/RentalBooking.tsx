"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { GearItem } from "@/lib/types";
import Link from "next/link";

export default function RentalBooking({ gear }: { gear: GearItem }) {
  const supabase = createClient();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "needsAuth"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              86400000,
          ),
        )
      : 0;
  const total = days * gear.price_per_day;

  const today = new Date().toISOString().split("T")[0];

  const handleBook = async () => {
    if (!startDate || !endDate) return;
    if (new Date(endDate) <= new Date(startDate)) {
      setErrorMsg("End date must be after start date.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatus("needsAuth");
      return;
    }

    const { error } = await supabase.from("rentals").insert([
      {
        user_id: user.id,
        gear_id: gear.id,
        start_date: startDate,
        end_date: endDate,
        total_price: total,
        status: "pending",
      },
    ]);

    if (error) {
      setErrorMsg("Failed to book. Please try again.");
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-slate rounded-2xl border border-white/10 p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="font-display text-2xl tracking-[2px] mb-2">
          BOOKING CONFIRMED
        </h3>
        <p className="text-cloud text-sm mb-2">
          {gear.name} reserved for {days} day{days > 1 ? "s" : ""}
        </p>
        <p className="font-display text-3xl text-sunrise">
          ${total.toFixed(2)}
        </p>
        <p className="text-cloud text-xs mt-4">
          {startDate} → {endDate}
        </p>
        <p className="text-cloud text-xs mt-6">
          We&apos;ll send a confirmation email with pickup details shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate rounded-2xl border border-white/10 p-7">
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-display text-4xl text-sunrise">
          ₹{gear.price_per_day}
        </span>
        <span className="text-cloud text-sm">/day</span>
      </div>

      {/* Date Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
            Pickup Date
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setStatus("idle");
            }}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow outline-none focus:border-sunrise transition-colors [color-scheme:dark]"
          />
        </div>
        <div>
          <label className="block text-xs text-cloud uppercase tracking-wider mb-2">
            Return Date
          </label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setStatus("idle");
            }}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-snow outline-none focus:border-sunrise transition-colors [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Price Breakdown */}
      {days > 0 && (
        <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-cloud">
              ${gear.price_per_day} × {days} day{days > 1 ? "s" : ""}
            </span>
            <span className="text-snow">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cloud">Delivery fee</span>
            <span className="text-green-400">Free</span>
          </div>
          <div className="flex justify-between text-sm pt-3 border-t border-white/5">
            <span className="text-snow font-semibold">Total</span>
            <span className="font-display text-2xl text-sunrise">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Book Button */}
      {status === "needsAuth" ? (
        <div className="mt-6 text-center">
          <p className="text-cloud text-sm mb-3">
            Sign in to complete your booking
          </p>
          <Link
            href="/auth"
            className="block w-full bg-sunrise hover:bg-peak text-obsidian py-4 rounded-full font-bold uppercase tracking-wider text-center transition-all"
          >
            Sign In to Book
          </Link>
        </div>
      ) : (
        <button
          onClick={handleBook}
          disabled={
            !startDate ||
            !endDate ||
            status === "loading" ||
            gear.available_count === 0
          }
          className="mt-6 w-full bg-sunrise hover:bg-peak text-obsidian py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-[0_4px_30px_rgba(255,111,32,0.3)] disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {status === "loading"
            ? "Booking..."
            : gear.available_count === 0
              ? "Unavailable"
              : "Reserve Now"}
        </button>
      )}

      {status === "error" && (
        <p className="text-red-400 text-xs mt-3 text-center">{errorMsg}</p>
      )}

      {/* Trust badges */}
      <div className="mt-8 pt-5 border-t border-white/5 space-y-3">
        {[
          { icon: "🛡️", text: "Full damage protection included" },
          { icon: "🚚", text: "Free delivery & pickup" },
          { icon: "🔄", text: "Easy cancellation up to 24h before" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 text-sm text-cloud"
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
