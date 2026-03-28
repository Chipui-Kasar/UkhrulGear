"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  const navLinks = [
    { href: "/gear", label: "Equipment" },
    { href: "/ukhrul-trekking", label: "Ukhrul Trekking" },
    { href: "/shirui-lily-festival", label: "Shirui Lily" },
    { href: "/loktak-lake-camping", label: "Loktak Camping" },
    { href: "/partner-locations", label: "Locations" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? "bg-obsidian/95 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,0.5)] py-3"
            : "bg-transparent py-5"
        } px-6 md:px-10 flex items-center justify-between`}
      >
        <Link
          href="/"
          className="font-display text-3xl tracking-[3px] text-snow hover:text-snow"
        >
          SUMMIT<span className="text-sunrise">.</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cloud text-sm font-medium tracking-wider uppercase relative hover:text-snow transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sunrise transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-granite/60 hover:bg-granite px-4 py-2 rounded-full transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-sunrise flex items-center justify-center text-obsidian text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-snow hidden lg:block">
                    {user.email?.split("@")[0]}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 bg-slate border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[180px]">
                    <div className="px-4 py-3 border-b border-white/5 text-xs text-cloud">
                      {user.email}
                    </div>
                    <Link
                      href="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full px-4 py-3 text-left text-sm text-snow hover:bg-granite/50 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-3 text-left text-sm text-snow hover:bg-granite/50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-sunrise hover:bg-peak text-obsidian px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,111,32,0.3)]"
              >
                Sign In
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-7 h-0.5 bg-snow transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-snow transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-snow transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 px-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl sm:text-4xl tracking-[4px] text-snow hover:text-moss transition-colors text-center"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-xs"
            >
              {user ? (
                <div className="space-y-4 w-full">
                  <p className="text-cloud text-sm text-center">
                    Welcome back!
                  </p>
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block bg-moss text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider text-center transition-colors hover:bg-moss/80"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileOpen(false);
                    }}
                    className="block w-full bg-granite text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-granite/80 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-moss text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider text-center hover:bg-moss/80 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
