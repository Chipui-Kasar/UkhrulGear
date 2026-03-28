"use client";

import Link from "next/link";
import Image from "next/image";
import { GearItem } from "@/lib/types";
import { motion } from "framer-motion";

export default function GearCard({
  item,
  index,
}: {
  item: GearItem;
  index: number;
}) {
  const gradients = [
    "from-[#2d5016] to-[#1a2a1a]",
    "from-[#4a2810] to-[#2a1a0d]",
    "from-[#1a3040] to-[#0d1a2e]",
    "from-[#3a1a2e] to-[#1a0d1a]",
    "from-[#2a2a10] to-[#1a1a0d]",
    "from-[#103030] to-[#0d1a1a]",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/gear/${item.slug}`}
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-sunrise focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-2xl"
      >
        <div className="bg-slate rounded-2xl overflow-hidden transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] group-focus-visible:-translate-y-2 group-focus-visible:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Image */}
          <div
            className={`relative h-60 bg-gradient-to-br ${
              gradients[index % gradients.length]
            } flex items-center justify-center overflow-hidden`}
          >
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={`${item.name} - ${item.description}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-focus-visible:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <span className="text-5xl" role="img" aria-label="Backpack icon">
                🎒
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate via-transparent to-transparent" />
            {item.badge && (
              <span className="absolute top-3 right-3 z-10 bg-sunrise text-obsidian px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {item.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            <h3 className="font-display text-lg sm:text-xl lg:text-2xl tracking-[2px] group-hover:text-moss transition-colors">
              {item.name}
            </h3>
            <p className="text-cloud text-sm mt-2 leading-relaxed line-clamp-2 flex-1">
              {item.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-5 gap-3 sm:gap-0">
              <div className="font-display text-2xl sm:text-3xl text-sunrise">
                ₹{item.price_per_day}
                <span className="text-cloud text-xs font-body font-normal ml-1">
                  /day
                </span>
              </div>
              <div
                className="flex items-center gap-1 text-sm"
                role="img"
                aria-label={`Rating: ${item.rating} out of 5 stars, ${item.review_count} reviews`}
              >
                <span className="text-peak">★</span>
                <span className="text-snow">{item.rating}</span>
                <span className="text-cloud">({item.review_count})</span>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-xs text-cloud flex flex-wrap items-center gap-2">
              {item.available_count > 0 ? (
                <span className="text-trail">✓ Available</span>
              ) : (
                <span className="text-peak">Out of stock</span>
              )}
              <span>• {item.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
