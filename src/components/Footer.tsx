import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate border-t border-white/5 pt-20 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link
            href="/"
            className="font-display text-2xl tracking-[3px] text-snow"
          >
            SUMMIT<span className="text-sunrise">.</span>
          </Link>
          <p className="text-cloud text-sm leading-relaxed mt-4 max-w-xs">
            Premium equipment rentals for every need. Cars, cameras,
            construction equipment, and more without the commitment. Serving
            Northeast India since 2019.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg tracking-[2px] mb-5">
            EQUIPMENT
          </h4>
          {[
            "Cars & Vehicles",
            "Cameras & Photography",
            "Audio & Speakers",
            "Construction Equipment",
            "Electronics & Gaming",
          ].map((item) => (
            <Link
              key={item}
              href="/gear"
              className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-display text-lg tracking-[2px] mb-5">COMPANY</h4>
          <Link
            href="/about"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/how-it-works"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/trail-guides"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Trail Guides
          </Link>
          <Link
            href="/careers"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Careers
          </Link>
          <Link
            href="/blog"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Blog
          </Link>
        </div>
        <div>
          <h4 className="font-display text-lg tracking-[2px] mb-5">SUPPORT</h4>
          <Link
            href="/faq"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            FAQs
          </Link>
          <Link
            href="/rental-policy"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Rental Policy
          </Link>
          <Link
            href="/damage-insurance"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Damage & Insurance
          </Link>
          <Link
            href="/contact"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/partner-locations"
            className="block text-cloud text-sm mb-3 hover:text-sunrise transition-colors"
          >
            Partner Locations
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-cloud text-sm">
          © {new Date().getFullYear()} Summit Rentals. All rights reserved.
        </span>
        <div className="flex gap-3">
          {["IG", "X", "FB", "YT"].map((s) => (
            <a
              key={s}
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cloud text-xs hover:bg-sunrise hover:text-obsidian hover:border-sunrise transition-all"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
