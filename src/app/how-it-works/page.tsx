import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works - Summit Rentals",
  description:
    "Discover how easy it is to rent equipment with Summit Rentals. From browsing to doorstep delivery and beyond - cars, cameras, construction equipment and more.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      icon: "🔍",
      title: "BROWSE & SELECT",
      subtitle: "Find Your Perfect Equipment",
      description:
        "Explore our curated collection of premium equipment. Filter by category, brand, or rental duration to find exactly what you need.",
      details: [
        "Professional equipment recommendations for every use case",
        "Detailed specifications and real user reviews",
        "Size and compatibility guides for perfect matching",
        "Availability calendar for project planning",
      ],
    },
    {
      number: "02",
      icon: "📅",
      title: "CHOOSE DATES",
      subtitle: "Flexible Rental Periods",
      description:
        "Select your pickup and return dates. We offer flexible rental periods from 1 day to 30 days, perfect for any project length.",
      details: [
        "Minimum 1-day rental, maximum 30-day projects",
        "Early pickup and late return options available",
        "Calendar integration for easy project planning",
        "Automatic damage insurance included",
      ],
    },
    {
      number: "03",
      icon: "📦",
      title: "DOORSTEP DELIVERY",
      subtitle: "24-Hour Fast Delivery",
      description:
        "Your equipment arrives clean, inspected, and ready-to-use within 24 hours. Free delivery within 15 miles of our locations.",
      details: [
        "Professional cleaning and inspection before every rental",
        "Contactless delivery with photo confirmation",
        "Detailed equipment check and instruction guides included",
        "Emergency contact support during your rental period",
      ],
    },
    {
      number: "04",
      icon: "✨",
      title: "GET WORK DONE",
      subtitle: "Use Equipment with Confidence",
      description:
        "Take your equipment and get your project completed. Our support team is always available for questions or technical assistance.",
      details: [
        "24/7 support and equipment replacement if needed",
        "Usage tips and safety guidelines included",
        "Technical assistance available for complex equipment",
        "Share your success stories with our community",
      ],
    },
    {
      number: "05",
      icon: "↩️",
      title: "EASY RETURNS",
      subtitle: "Hassle-Free Pickup",
      description:
        "Schedule a pickup or drop off at any partner location. No need to clean – we handle all the maintenance and sanitization.",
      details: [
        "Free pickup at your location or drop off points",
        "No cleaning required – leave it to the professionals",
        "Instant damage assessment with transparent pricing",
        "Loyalty points earned for every completed rental",
      ],
    },
  ];

  const features = [
    {
      icon: "🛡️",
      title: "Damage Protection",
      description:
        "All rentals include comprehensive damage protection for normal wear and tear.",
    },
    {
      icon: "⚡",
      title: "Last-Minute Bookings",
      description:
        "Need gear today? Same-day delivery available for orders placed before 2 PM.",
    },
    {
      icon: "🔄",
      title: "Easy Modifications",
      description:
        "Change dates, add gear, or modify your order up to 24 hours before pickup.",
    },
    {
      icon: "💰",
      title: "Price Match",
      description:
        "Found a lower price elsewhere? We'll match it and give you an extra 5% off.",
    },
  ];

  const faqs = [
    {
      q: "What happens if gear breaks during my trip?",
      a: "All rentals include damage protection for normal wear and tear. For serious damage, contact our 24/7 support for immediate replacement gear.",
    },
    {
      q: "Can I extend my rental period?",
      a: "Yes! Contact us during your rental period to extend. Additional days are charged at our daily rates, subject to availability.",
    },
    {
      q: "What if the weather is bad on my trip dates?",
      a: "We offer flexible rescheduling up to 24 hours before pickup for weather-related cancellations with no penalty.",
    },
    {
      q: "How clean is the gear?",
      a: "Every item is professionally cleaned, sanitized, and inspected before rental. We maintain the highest hygiene standards.",
    },
  ];

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              HOW IT <span className="text-moss">WORKS</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Renting premium outdoor gear has never been easier. From browse to
              adventure and back, we&apos;ve streamlined every step of your
              journey.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 0.1}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 last:mb-0 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-display text-4xl text-moss tracking-wider">
                      {step.number}
                    </span>
                    <span className="text-4xl">{step.icon}</span>
                  </div>
                  <h2 className="font-display text-4xl tracking-[2px] mb-2">
                    {step.title}
                  </h2>
                  <h3 className="text-moss text-xl font-medium mb-4">
                    {step.subtitle}
                  </h3>
                  <p className="text-mist text-lg leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-cloud"
                      >
                        <span className="text-trail text-sm mt-1">✓</span>
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                    \n{" "}
                  </ul>
                </div>
                <div
                  className={`bg-slate rounded-2xl p-8 border border-white/10 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="text-6xl mb-6 text-center">{step.icon}</div>
                  <div className="space-y-4">
                    <div className="bg-moss/10 rounded-xl p-4">
                      <h4 className="font-display text-lg tracking-wider mb-2">
                        Pro Tip
                      </h4>
                      <p className="text-cloud text-sm">
                        {i === 0 &&
                          "Use our gear recommendation quiz to find the perfect equipment for your skill level and trip type."}
                        {i === 1 &&
                          "Book early for popular dates like holidays and peak seasons. You can always modify your reservation later."}
                        {i === 2 &&
                          "Download our mobile app for real-time delivery tracking and direct communication with your delivery team."}
                        {i === 3 &&
                          "Join our community forum to share trail reports and get insider tips from fellow adventurers."}
                        {i === 4 &&
                          "Rate your gear after return to help future renters and earn loyalty points for discounts."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                WHY CHOOSE <span className="text-moss">US?</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                We&apos;ve thought of everything to make your rental experience
                seamless and worry-free.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <RevealOnScroll key={feature.title} delay={i * 0.1}>
                <div className="bg-obsidian rounded-2xl p-6 border border-white/5 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-display text-lg tracking-wider mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-cloud text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                COMMON <span className="text-moss">QUESTIONS</span>
              </h2>
              <p className="text-mist leading-relaxed">
                Got questions? We&apos;ve got answers. Here are the most common
                questions about our rental process.
              </p>
            </div>
          </RevealOnScroll>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="bg-slate rounded-2xl p-6 border border-white/5">
                  <h3 className="font-display text-lg tracking-wider mb-3 text-moss">
                    {faq.q}
                  </h3>
                  <p className="text-mist leading-relaxed">{faq.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-6">
              READY TO <span className="text-moss">START?</span>
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8">
              Your next adventure is just a few clicks away. Browse our gear and
              start planning your epic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gear"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Browse Gear
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                Still Have Questions?
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
