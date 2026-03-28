import { type Metadata } from "next";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "About Us - Summit Rentals",
  description:
    "Learn about Summit Rentals - Premium equipment rentals serving Northeast India since 2019. Our mission, values, and commitment to accessible rental solutions.",
};

export default function AboutPage() {
  const values = [
    {
      icon: "�",
      title: "Sustainability First",
      description:
        "We believe in reducing waste through sharing economy. Every rental reduces manufacturing demand and environmental impact.",
    },
    {
      icon: "⚡",
      title: "Quality Assured",
      description:
        "All equipment is professionally inspected, cleaned, and maintained to the highest standards before every rental.",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description:
        "Built by locals, for locals. We understand Northeast India's unique needs and provide equipment solutions for every purpose.",
    },
    {
      icon: "💡",
      title: "Innovation Forward",
      description:
        "Constantly evolving our services to make quality equipment more accessible and projects more successful.",
    },
  ];

  const team = [
    {
      name: "Chipui Kasar",
      role: "Founder & CEO",
      background:
        "Former equipment specialist with 15+ years in rental industry. Experienced in construction, photography, and event equipment.",
      image: "👨‍💼",
    },
    {
      name: "Worchan Raikhan",
      role: "Head of Operations",
      background:
        "Equipment logistics expert and regional specialist. Expert in heavy machinery and technical equipment management.",
      image: "👩🏻‍💼",
    },
  ];

  const stats = [
    { number: "8K+", label: "Happy Customers" },
    { number: "25K+", label: "Successful Rentals" },
    { number: "98%", label: "Return Rate" },
    { number: "7", label: "Years of Excellence" },
  ];

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              SOLUTIONS <span className="text-moss">BEGIN</span> HERE
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Since 2019, Summit Rentals has been democratizing access to
              quality equipment by making premium rentals available to everyone
              in Northeast India. From personal needs to professional projects,
              we equip your success.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-4xl md:text-5xl text-moss tracking-wider mb-2">
                  {stat.number}
                </div>
                <div className="text-cloud text-sm uppercase tracking-[2px]">
                  {stat.label}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div>
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-6">
                OUR <span className="text-moss">STORY</span>
              </h2>
              <div className="space-y-4 text-mist leading-relaxed">
                <p>
                  Summit Rentals was born from a simple frustration: Chipui
                  Kasar, our founder, spent thousands on gear for a single
                  backpacking trip to Patagonia. After returning home, her
                  expensive equipment gathered dust in the garage.
                </p>
                <p>
                  &ldquo;There had to be a better way,&rdquo; Sarah thought.
                  &ldquo;Why should cost be a barrier to adventure?&rdquo;
                </p>
                <p>
                  Starting with just 20 pieces of gear and a vision for
                  sustainable outdoor access, Summit Rentals has grown into the
                  premier gear rental service, helping thousands of adventurers
                  explore the great outdoors without the financial burden of
                  ownership.
                </p>
                <p>
                  Today, we&apos;re not just a rental company &ndash; we&apos;re
                  enablers of dreams, protectors of the environment, and
                  champions of accessible adventure.
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="bg-slate rounded-2xl p-8 border border-white/10">
              <h3 className="font-display text-2xl tracking-wider mb-4">
                Mission Statement
              </h3>
              <p className="text-mist leading-relaxed mb-6">
                &ldquo;To make premium outdoor gear accessible to every
                adventurer while promoting sustainable practices that protect
                the wilderness we all love.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-moss/20 flex items-center justify-center text-2xl">
                  🏔️
                </div>
                <div>
                  <div className="font-medium text-snow">Chipui Kasar</div>
                  <div className="text-cloud text-sm">Founder & CEO</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                OUR <span className="text-moss">VALUES</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Every decision we make is guided by these core principles that
                define who we are and what we stand for.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} delay={i * 0.1}>
                <div className="bg-obsidian rounded-2xl p-6 border border-white/5 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-display text-xl tracking-wider mb-3">
                    {value.title}
                  </h3>
                  <p className="text-cloud text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                MEET THE <span className="text-moss">TEAM</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Passionate adventurers and gear experts who live and breathe the
                outdoor lifestyle.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1}>
                <div className="bg-slate rounded-2xl p-6 border border-white/5 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="font-display text-xl tracking-wider mb-1">
                    {member.name}
                  </h3>
                  <div className="text-moss text-sm font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-cloud text-sm leading-relaxed">
                    {member.background}
                  </p>
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
              READY TO <span className="text-moss">EXPLORE?</span>
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8">
              Join thousands of adventurers who trust Summit Rentals for their
              outdoor gear needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gear"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Browse Gear
              </Link>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                Get in Touch
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
