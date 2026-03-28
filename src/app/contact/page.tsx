import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - Summit Rentals",
  description:
    "Get in touch with Summit Rentals for gear rental questions, support, or adventure planning assistance. Multiple ways to reach our team.",
};

export default function ContactPage() {
  const contactMethods = [
    {
      title: "Phone Support",
      description: "Fastest way to get help",
      details: [
        { label: "General Inquiries", value: "(123) 456-7890" },
        { label: "Emergency Support", value: "(123) 456-7891" },
        { label: "Hours", value: "Mon-Fri 7AM-9PM, Weekends 8AM-6PM" },
      ],
      icon: "📞",
      color: "moss",
    },
    {
      title: "Email Support",
      description: "Detailed questions and requests",
      details: [
        { label: "General", value: "hello@summitrentals.com" },
        { label: "Reservations", value: "bookings@summitrentals.com" },
        { label: "Support", value: "support@summitrentals.com" },
      ],
      icon: "✉️",
      color: "trail",
    },
    {
      title: "Visit Our Store",
      description: "Inspect gear and get advice",
      details: [
        { label: "Address", value: "1234 Adventure Ave, Denver, CO 80202" },
        { label: "Pickup Hours", value: "Mon-Fri 8AM-6PM, Weekends 8AM-4PM" },
        { label: "Parking", value: "Free in our lot and street parking" },
      ],
      icon: "🏢",
      color: "sunrise",
    },
    {
      title: "Live Chat",
      description: "Quick questions during business hours",
      details: [
        { label: "Availability", value: "Mon-Fri 8AM-8PM, Weekends 9AM-5PM" },
        { label: "Response Time", value: "Usually under 2 minutes" },
        { label: "Best For", value: "Quick questions, availability checks" },
      ],
      icon: "💬",
      color: "peak",
    },
  ];

  const team = [
    {
      name: "Chipui Kasar",
      role: "Founder & CEO",
      bio: "Former wilderness guide with 15+ years coordinating outdoor adventures",
      specialties: ["Trip Planning", "Group Rentals", "Custom Packages"],
      email: "sarah@summitrentals.com",
      emoji: "👩🏻‍💼",
    },
    {
      name: "Marcus Rodriguez",
      role: "Operations Manager",
      bio: "Gear specialist and logistics expert ensuring quality and timely delivery",
      specialties: [
        "Gear Selection",
        "Delivery Coordination",
        "Quality Control",
      ],
      email: "marcus@summitrentals.com",
      emoji: "🧗🏽‍♂️",
    },
    {
      name: "Alex Thompson",
      role: "Customer Success",
      bio: "Adventure photographer passionate about helping customers capture memories",
      specialties: [
        "Customer Support",
        "Photography Gear",
        "Trail Recommendations",
      ],
      email: "alex@summitrentals.com",
      emoji: "📸",
    },
  ];

  const faqQuickLinks = [
    {
      question: "How far in advance should I book?",
      answer: "1-2 weeks for most gear, 2-4 weeks during peak season.",
    },
    {
      question: "Do you deliver gear?",
      answer: "Yes, free delivery within 25 miles of Denver, fees beyond that.",
    },
    {
      question: "What if gear is damaged?",
      answer:
        "Normal wear is expected. Damage protection available for peace of mind.",
    },
    {
      question: "Can I modify my reservation?",
      answer: "Free changes up to 48 hours before your rental start date.",
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
              GET IN <span className="text-moss">TOUCH</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Ready for your next adventure? Our team is here to help you find
              the perfect gear and plan an amazing outdoor experience.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                📞 Call Now
              </a>
              <a
                href="#contact-form"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                Send Message
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                WAYS TO <span className="text-moss">CONNECT</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Choose the method that works best for you. We are here to help
                however you prefer to communicate.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, i) => (
              <RevealOnScroll key={method.title} delay={i * 0.1}>
                <div className="bg-slate rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{method.icon}</div>
                    <h3
                      className={`font-display text-xl tracking-wider text-${method.color} mb-2`}
                    >
                      {method.title}
                    </h3>
                    <p className="text-cloud text-sm">{method.description}</p>
                  </div>
                  <div className="space-y-2">
                    {method.details.map((detail, j) => (
                      <div key={j} className="text-xs">
                        <span className="text-mist font-medium">
                          {detail.label}:
                        </span>
                        <div className="text-snow mt-1">{detail.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 px-6 bg-slate">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                SEND A <span className="text-moss">MESSAGE</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Tell us about your adventure plans, gear needs, or any questions
                you have. We typically respond within 2 hours during business
                hours.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <ContactForm />
          </RevealOnScroll>
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
                Our passionate team combines decades of outdoor experience with
                exceptional customer service.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1}>
                <div className="bg-slate rounded-2xl p-6 border border-white/5 text-center">
                  <div className="text-5xl mb-4">{member.emoji}</div>
                  <h3 className="font-display text-xl tracking-wider mb-1">
                    {member.name}
                  </h3>
                  <div className="text-moss text-sm mb-3">{member.role}</div>
                  <p className="text-mist text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="mb-4">
                    <div className="text-cloud text-xs mb-2">
                      Specializes in:
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-obsidian px-2 py-1 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-trail text-sm hover:text-trail/80 transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                QUICK <span className="text-moss">ANSWERS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed mb-6">
                Common questions we hear from adventurers. For more detailed
                information, check our complete FAQ.
              </p>
              <Link
                href="/faq"
                className="text-moss hover:text-moss/80 transition-colors font-medium"
              >
                View Complete FAQ →
              </Link>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqQuickLinks.map((faq, i) => (
              <RevealOnScroll key={faq.question} delay={i * 0.1}>
                <div className="bg-obsidian rounded-xl p-6 border border-white/5">
                  <h3 className="font-display text-lg tracking-wider mb-3 text-trail">
                    {faq.question}
                  </h3>
                  <p className="text-mist leading-relaxed">{faq.answer}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                VISIT OUR <span className="text-moss">WAREHOUSE</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Stop by to inspect gear, get expert advice, or handle pickup and
                returns in person.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <RevealOnScroll delay={0.2}>
              <div>
                <h3 className="font-display text-2xl tracking-wider mb-6 text-trail">
                  Location & Parking
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-moss text-lg">📍</span>
                    <div>
                      <div className="text-snow font-medium">
                        1234 Adventure Avenue
                      </div>
                      <div className="text-mist">Denver, CO 80202</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-moss text-lg">🚗</span>
                    <div>
                      <div className="text-snow font-medium">Free Parking</div>
                      <div className="text-mist">
                        Dedicated lot with 20 spaces plus street parking
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-moss text-lg">🚌</span>
                    <div>
                      <div className="text-snow font-medium">
                        Public Transit
                      </div>
                      <div className="text-mist">
                        Bus stop 50 yards away (Routes 16, 32)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate rounded-xl p-6 border border-white/10">
                  <h4 className="font-display text-lg tracking-wider mb-4 text-peak">
                    Getting Here
                  </h4>
                  <ul className="space-y-2 text-mist text-sm">
                    <li>• 10 minutes from downtown Denver</li>
                    <li>• 25 minutes from Denver International Airport</li>
                    <li>• Easy highway access from I-25 and I-70</li>
                    <li>
                      • Look for the Summit Rentals sign with mountain logo
                    </li>
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.4}>
              <div>
                <h3 className="font-display text-2xl tracking-wider mb-6 text-trail">
                  Hours & Services
                </h3>
                <div className="bg-slate rounded-xl p-6 border border-white/10 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-snow mb-3">
                        Warehouse Hours
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-mist">Monday - Friday</span>
                          <span className="text-trail">8 AM - 6 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-mist">Saturday - Sunday</span>
                          <span className="text-trail">8 AM - 4 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-mist">Holidays</span>
                          <span className="text-trail">Call first</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-snow mb-3">
                        Available Services
                      </h4>
                      <ul className="space-y-1 text-sm text-mist">
                        <li>• Gear pickup & return</li>
                        <li>• Gear inspection & fitting</li>
                        <li>• Expert advice & recommendations</li>
                        <li>• Same-day rentals (based on availability)</li>
                        <li>• Custom package planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-obsidian rounded-xl p-6 border border-moss/20">
                  <h4 className="font-display text-lg tracking-wider mb-3 text-moss">
                    Pro Tip
                  </h4>
                  <p className="text-mist text-sm leading-relaxed">
                    Visit us before your first rental to meet the team, see our
                    inventory, and get personalized gear recommendations. We
                    love talking about adventures!
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <div className="bg-obsidian rounded-2xl p-8 border border-white/10">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-4 text-sunrise">
                EMERGENCY SUPPORT
              </h2>
              <p className="text-mist leading-relaxed mb-6">
                Having gear issues during your adventure? Our 24/7 emergency
                line is available for urgent gear problems, safety concerns, and
                trip-related emergencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a
                  href="tel:+1234567891"
                  className="bg-sunrise hover:bg-sunrise/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
                >
                  🚨 Emergency: (123) 456-7891
                </a>
                <a
                  href="sms:+1234567891"
                  className="bg-transparent border-2 border-sunrise hover:border-sunrise/60 text-sunrise px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
                >
                  📱 Text: (123) 456-7891
                </a>
              </div>
              <p className="text-cloud text-sm">
                Emergency support is for gear failures, safety issues, and
                urgent trip problems only. For general questions, please use
                regular contact methods during business hours.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
