import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Damage Insurance - Summit Rentals",
  description:
    "Comprehensive damage protection for your gear rental. Understand coverage, costs, and how to protect your adventure investment.",
};

export default function DamageInsurancePage() {
  const coverageFeatures = [
    {
      title: "Accidental Damage",
      description: "Normal wear and unexpected damage during proper use",
      examples: [
        "Small tears and rips",
        "Zipper failures",
        "Pole bending",
        "Fabric stains",
      ],
      covered: true,
      icon: "🛡️",
    },
    {
      title: "Weather Damage",
      description: "Protection from unexpected weather conditions",
      examples: [
        "Rain damage to electronics",
        "UV degradation",
        "Snow and ice damage",
        "Wind damage",
      ],
      covered: true,
      icon: "🌦️",
    },
    {
      title: "Theft Protection",
      description: "Gear stolen from secure locations or vehicles",
      examples: [
        "Car break-ins",
        "Campsite theft",
        "Secure locker theft",
        "Hotel room theft",
      ],
      covered: false,
      icon: "🔒",
      note: "Requires separate travel insurance coverage",
    },
    {
      title: "Loss Protection",
      description: "Gear lost during activities or transport",
      examples: [
        "Dropped equipment",
        "Lost in nature",
        "Left behind items",
        "Transportation loss",
      ],
      covered: false,
      icon: "📦",
      note: "Replacement cost responsibility of renter",
    },
    {
      title: "Misuse Damage",
      description: "Damage from improper use or negligence",
      examples: [
        "Using gear beyond limits",
        "Ignoring safety instructions",
        "Modifications",
        "Commercial use",
      ],
      covered: false,
      icon: "⚠️",
      note: "Voids all protection coverage",
    },
    {
      title: "Normal Wear",
      description: "Expected wear from outdoor use",
      examples: [
        "Dirt and mud",
        "Minor scuffs",
        "Regular fabric wear",
        "Hardware patina",
      ],
      covered: true,
      icon: "✅",
      note: "Always included at no cost",
    },
  ];

  const pricingTiers = [
    {
      name: "Basic Coverage",
      percentage: "8%",
      description: "Essential protection for standard rentals",
      features: [
        "Accidental damage up to ₹2,000",
        "Weather-related damage",
        "Minor repairs and adjustments",
        "Basic cleaning included",
        "24/7 support hotline",
      ],
      bestFor: "Day hikes and weekend trips",
      color: "moss",
    },
    {
      name: "Complete Coverage",
      percentage: "12%",
      description: "Comprehensive protection for extended adventures",
      features: [
        "All Basic Coverage benefits",
        "Damage protection up to ₹10,000",
        "Expedited replacement gear",
        "Worldwide coverage",
        "No deductible fees",
        "Priority customer support",
      ],
      bestFor: "Multi-day backpacking and expeditions",
      color: "trail",
      recommended: true,
    },
    {
      name: "Premium Coverage",
      percentage: "18%",
      description: "Maximum protection for high-value gear rentals",
      features: [
        "All Complete Coverage benefits",
        "Unlimited damage protection",
        "Same-day gear replacement",
        "Personal gear coverage extension",
        "Trip interruption assistance",
        "Dedicated account manager",
      ],
      bestFor: "Professional shoots and extreme adventures",
      color: "sunrise",
    },
  ];

  const claimProcess = [
    {
      step: "1",
      title: "Report Immediately",
      description: "Contact us as soon as damage occurs or is discovered",
      timeframe: "Within 24 hours",
      actions: [
        "Call our support line",
        "Take photos of damage",
        "Secure the damaged gear",
        "Note circumstances of damage",
      ],
    },
    {
      step: "2",
      title: "Document Everything",
      description: "Provide detailed information about the incident",
      timeframe: "Within 48 hours",
      actions: [
        "Complete damage report form",
        "Submit photos and videos",
        "Provide witness information",
        "Share trip details and conditions",
      ],
    },
    {
      step: "3",
      title: "Assessment",
      description: "Our team evaluates the damage and determines coverage",
      timeframe: "2-5 business days",
      actions: [
        "Professional gear inspection",
        "Coverage verification",
        "Repair cost estimation",
        "Alternative gear arrangement",
      ],
    },
    {
      step: "4",
      title: "Resolution",
      description: "We handle repairs or replacement and finalize your claim",
      timeframe: "5-10 business days",
      actions: [
        "Approved repairs completed",
        "Replacement gear provided",
        "Final cost calculation",
        "Claim closure confirmation",
      ],
    },
  ];

  const exclusions = [
    {
      category: "Activities",
      items: [
        "Commercial or professional use",
        "Activities beyond gear specifications",
        "Competition or racing events",
        "Educational or institutional use",
        "Rental to unauthorized parties",
      ],
    },
    {
      category: "Conditions",
      items: [
        "Pre-existing damage or wear",
        "Manufacturer defects",
        "Normal depreciation",
        "Cosmetic damage not affecting function",
        "Damage from improper storage",
      ],
    },
    {
      category: "Circumstances",
      items: [
        "Intentional damage or misuse",
        "Use under influence of substances",
        "Acts of war or terrorism",
        "Nuclear incidents",
        "Criminal activity involvement",
      ],
    },
  ];

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              DAMAGE <span className="text-moss">PROTECTION</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Adventure with confidence. Our comprehensive damage protection
              covers the unexpected so you can focus on exploring.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Coverage Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                WHAT&apos;S <span className="text-moss">COVERED</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Understanding what is and is not covered helps you make informed
                decisions about protection.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageFeatures.map((feature, i) => (
              <RevealOnScroll key={feature.title} delay={i * 0.1}>
                <div
                  className={`bg-slate rounded-2xl p-6 border ${feature.covered ? "border-moss/20" : "border-red-400/20"} relative`}
                >
                  {feature.covered && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-moss rounded-full flex items-center justify-center">
                      <span className="text-obsidian text-xs font-bold">✓</span>
                    </div>
                  )}
                  {!feature.covered && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-obsidian text-xs font-bold">✗</span>
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3
                      className={`font-display text-xl tracking-wider mb-2 ${feature.covered ? "text-moss" : "text-red-400"}`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-cloud text-sm">{feature.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-mist font-medium mb-2">
                      Examples:
                    </div>
                    <ul className="text-xs space-y-1">
                      {feature.examples.map((example, j) => (
                        <li
                          key={j}
                          className="text-cloud flex items-start gap-2"
                        >
                          <span className="text-mist mt-0.5">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                    {feature.note && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-cloud italic">
                          {feature.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                PROTECTION <span className="text-moss">PLANS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Choose the level of protection that matches your adventure style
                and gear value.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <RevealOnScroll key={tier.name} delay={i * 0.1}>
                <div
                  className={`bg-obsidian rounded-2xl p-6 border border-white/5 relative ${tier.recommended ? "border-trail/50 ring-2 ring-trail/20" : ""}`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-trail text-obsidian px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3
                      className={`font-display text-2xl tracking-wider text-${tier.color} mb-2`}
                    >
                      {tier.name}
                    </h3>
                    <div
                      className={`text-4xl font-bold text-${tier.color} mb-2`}
                    >
                      {tier.percentage}
                    </div>
                    <p className="text-cloud text-sm">{tier.description}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <span className={`text-${tier.color} text-sm mt-0.5`}>
                          ✓
                        </span>
                        <span className="text-mist text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`bg-${tier.color}/10 rounded-xl p-4 border border-${tier.color}/20`}
                  >
                    <div
                      className={`text-${tier.color} text-xs font-medium mb-1`}
                    >
                      Best For:
                    </div>
                    <div className="text-snow text-sm">{tier.bestFor}</div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-cloud text-sm mb-4">
                Protection fee is calculated as a percentage of your total
                rental value.
              </p>
              <div className="bg-obsidian rounded-xl p-4 border border-white/10 inline-block">
                <div className="text-moss text-sm font-medium mb-1">
                  Example:
                </div>
                <div className="text-snow text-sm">
                  ₹3,000 rental × 12% Complete Coverage = ₹360 protection fee
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                CLAIM <span className="text-moss">PROCESS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                If damage occurs, our streamlined process gets you back to
                adventuring quickly.
              </p>
            </div>
          </RevealOnScroll>
          <div className="space-y-8">
            {claimProcess.map((step, i) => (
              <RevealOnScroll key={step.step} delay={i * 0.1}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-moss rounded-full flex items-center justify-center">
                      <span className="text-obsidian text-xl font-bold">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-slate rounded-2xl p-6 border border-white/10">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                        <h3 className="font-display text-xl tracking-wider text-trail">
                          {step.title}
                        </h3>
                        <span className="text-moss text-sm font-medium">
                          {step.timeframe}
                        </span>
                      </div>
                      <p className="text-mist mb-4">{step.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.actions.map((action, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <span className="text-trail text-sm">→</span>
                            <span className="text-cloud text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                POLICY <span className="text-moss">EXCLUSIONS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Understanding what is not covered helps set proper expectations
                and avoid surprises.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exclusions.map((category, i) => (
              <RevealOnScroll key={category.category} delay={i * 0.1}>
                <div className="bg-obsidian rounded-2xl p-6 border border-red-400/20">
                  <h3 className="font-display text-xl tracking-wider text-red-400 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-red-400 text-sm mt-0.5">✗</span>
                        <span className="text-mist text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
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
                PROTECTION <span className="text-moss">FAQ</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Common questions about damage protection and coverage details.
              </p>
            </div>
          </RevealOnScroll>
          <div className="space-y-4">
            {[
              {
                q: "When should I purchase damage protection?",
                a: "Protection must be added at the time of booking. It cannot be added after gear delivery or during your rental period.",
              },
              {
                q: "What happens if I decline protection and damage occurs?",
                a: "You will be responsible for the full repair or replacement cost of damaged gear. This can be significantly more expensive than the protection fee.",
              },
              {
                q: "Can I get a refund on unused protection coverage?",
                a: "Protection fees are non-refundable once your rental period begins, even if no damage occurs. Think of it as peace of mind insurance.",
              },
              {
                q: "How quickly can I get replacement gear after damage?",
                a: "With Complete or Premium coverage, replacement gear is typically available within 24-48 hours. Basic coverage may take 3-5 days.",
              },
              {
                q: "Does protection cover damage to my personal gear?",
                a: "Only Premium coverage includes limited personal gear protection when used with our rental equipment. Check policy details for coverage limits.",
              },
              {
                q: "What if I disagree with the damage assessment?",
                a: "You can request a second assessment or independent evaluation. Our customer service team will work with you to find a fair resolution.",
              },
            ].map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className="bg-slate rounded-xl border border-white/5 overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <h3 className="font-display text-lg tracking-wider leading-snug pr-4">
                        {faq.q}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-cloud group-open:text-moss group-open:border-moss transition-all">
                        <span className="text-sm group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 -mt-2">
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-mist leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </details>
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
              HAVE <span className="text-moss">QUESTIONS?</span>
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Our team can help you choose the right protection level and
              explain coverage details for your specific adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                📞 Call (123) 456-7890
              </a>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                Send Message
              </Link>
              <Link
                href="/rental-policy"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                View Policy
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
