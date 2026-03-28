import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { createServerComponentClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "FAQ - Summit Rentals",
  description:
    "Frequently asked questions about gear rental, policies, reservations, and outdoor adventures. Get quick answers to your questions.",
};

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
}

export default async function FAQPage() {
  const supabase = await createServerComponentClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  // Group FAQs by category
  const categories = (faqs || []).reduce(
    (acc: { [key: string]: FAQ[] }, faq: FAQ) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    },
    {},
  );

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              <span className="text-moss">FREQUENTLY</span> ASKED
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Get quick answers to common questions about gear rental, policies,
              and outdoor adventures.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-slate rounded-2xl p-6 border border-white/10 text-center">
              <h2 className="font-display text-xl tracking-wider mb-3">
                Can&apos;t find your answer?
              </h2>
              <p className="text-mist mb-4">
                Our team is here to help with any questions about your
                adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+1234567890"
                  className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm transition-all"
                >
                  📞 Call (123) 456-7890
                </a>
                <Link
                  href="/contact"
                  className="border border-white/20 hover:border-moss text-snow px-6 py-3 rounded-xl font-bold text-sm transition-all"
                >
                  💬 Send Message
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {Object.entries(categories).map(
            ([categoryTitle, categoryFaqs], categoryIndex) => (
              <RevealOnScroll key={categoryTitle} delay={categoryIndex * 0.1}>
                <div className="mb-16">
                  <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8 text-center">
                    <span className="text-moss">
                      {categoryTitle.split(" ")[0]}
                    </span>{" "}
                    {categoryTitle.split(" ").slice(1).join(" ")}
                  </h2>
                  <div className="space-y-4">
                    {(categoryFaqs as FAQ[]).map((faq) => (
                      <div
                        key={faq.id}
                        className="bg-slate rounded-xl border border-white/5 overflow-hidden"
                      >
                        <details className="group">
                          <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                            <h3 className="font-display text-lg tracking-wider leading-snug pr-4">
                              {faq.question}
                            </h3>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-cloud group-open:text-moss group-open:border-moss transition-all">
                              <span className="text-sm group-open:rotate-45 transition-transform">
                                +
                              </span>
                            </div>
                          </summary>
                          <div className="px-6 pb-6 -mt-2">
                            <div className="pt-4 border-t border-white/10">
                              <p className="text-mist leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ),
          )}

          {/* No FAQs fallback */}
          {Object.keys(categories).length === 0 && (
            <div className="text-center py-12">
              <div className="text-cloud text-lg mb-4">
                No FAQs available at this time
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
              >
                Contact Us for Questions
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Additional Help */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                NEED MORE <span className="text-moss">HELP?</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Explore these resources or get in touch with our team for
                personalized assistance.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Rental Policy",
                description: "Complete terms and conditions for gear rental.",
                link: "/rental-policy",
                icon: "📋",
              },
              {
                title: "Trail Guides",
                description:
                  "Detailed guides for popular Colorado hiking trails.",
                link: "/trail-guides",
                icon: "🗺️",
              },
              {
                title: "How It Works",
                description:
                  "Step-by-step guide to booking and receiving gear.",
                link: "/how-it-works",
                icon: "⚙️",
              },
              {
                title: "Contact Us",
                description:
                  "Direct contact for specific questions or support.",
                link: "/contact",
                icon: "📞",
              },
            ].map((resource, i) => (
              <RevealOnScroll key={resource.title} delay={i * 0.1}>
                <Link href={resource.link}>
                  <div className="bg-obsidian rounded-2xl p-6 border border-white/5 hover:border-moss/30 transition-all duration-300 text-center group">
                    <div className="text-4xl mb-4">{resource.icon}</div>
                    <h3 className="font-display text-lg tracking-wider mb-2 group-hover:text-moss transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-cloud text-sm leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-slate rounded-2xl p-8 lg:p-12 border border-white/10">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8 text-center">
                SUPPORT <span className="text-moss">HOURS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl tracking-wider mb-4 text-trail">
                    Regular Support
                  </h3>
                  <div className="space-y-2 text-mist">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-snow">7 AM - 9 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span className="text-snow">8 AM - 6 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Holidays</span>
                      <span className="text-snow">9 AM - 5 PM</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider mb-4 text-sunrise">
                    Emergency Support
                  </h3>
                  <div className="space-y-2 text-mist">
                    <div className="flex justify-between">
                      <span>Emergency Line</span>
                      <span className="text-snow">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gear Issues</span>
                      <span className="text-snow">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safety Concerns</span>
                      <span className="text-snow">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-cloud text-sm mb-4">
                  Emergency support is for gear failures, safety issues, and
                  urgent trip-related problems only.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+1234567890"
                    className="bg-sunrise hover:bg-sunrise/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm transition-all"
                  >
                    🚨 Emergency: (123) 456-7890
                  </a>
                  <a
                    href="tel:+1234567891"
                    className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm transition-all"
                  >
                    📞 Regular: (123) 456-7891
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
