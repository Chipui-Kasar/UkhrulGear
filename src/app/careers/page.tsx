import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers - Summit Rentals",
  description:
    "Join the Summit Rentals team and turn your passion for outdoor adventures into a rewarding career. Explore opportunities in gear curation, customer success, and operations.",
};

export default function CareersPage() {
  const positions = [
    {
      title: "Gear Specialist",
      department: "Operations",
      type: "Full-time",
      location: "Denver, CO",
      description:
        "Curate and maintain our premium outdoor gear collection. Inspect, repair, and recommend equipment while helping customers choose the perfect gear for their adventures.",
      requirements: [
        "3+ years outdoor industry experience",
        "Expert knowledge of camping & hiking gear",
        "Basic equipment repair skills",
        "Excellent customer service abilities",
        "Physical ability to lift 50+ lbs",
      ],
      benefits: [
        "Health Insurance",
        "Gear Discounts",
        "Adventure Days",
        "Flexible Schedule",
      ],
    },
    {
      title: "Customer Success Manager",
      department: "Customer Experience",
      type: "Full-time",
      location: "Denver, CO",
      description:
        "Be the voice of Summit Rentals, providing exceptional support to customers planning their outdoor adventures. Handle reservations, troubleshoot issues, and ensure amazing experiences.",
      requirements: [
        "2+ years customer service experience",
        "Excellent written and verbal communication",
        "Problem-solving and conflict resolution skills",
        "Outdoor recreation knowledge preferred",
        "Proficiency with booking systems",
      ],
      benefits: [
        "Competitive Salary",
        "Remote Work Options",
        "Professional Development",
        "Team Adventures",
      ],
    },
    {
      title: "Brand Photographer",
      department: "Marketing",
      type: "Contract",
      location: "Colorado (Travel Required)",
      description:
        "Capture the spirit of adventure through stunning photography. Document our gear in action, create marketing content, and tell visual stories that inspire outdoor exploration.",
      requirements: [
        "Professional photography portfolio",
        "Outdoor/adventure photography experience",
        "Own professional camera equipment",
        "Willingness to travel throughout Colorado",
        "Basic video creation skills preferred",
      ],
      benefits: [
        "Competitive Day Rates",
        "Gear Access",
        "Portfolio Building",
        "Travel Opportunities",
      ],
    },
    {
      title: "Logistics Coordinator",
      department: "Operations",
      type: "Part-time",
      location: "Denver, CO",
      description:
        "Ensure gear delivery and pickup operations run smoothly. Coordinate drivers, manage inventory movement, and solve logistical challenges to deliver exceptional customer experiences.",
      requirements: [
        "Strong organizational and multitasking skills",
        "Valid driver's license with clean record",
        "Experience with inventory management systems",
        "Excellent attention to detail",
        "Ability to work flexible hours including weekends",
      ],
      benefits: [
        "Flexible Hours",
        "Growth Opportunities",
        "Employee Discounts",
        "Team Outings",
      ],
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      type: "Full-time",
      location: "Remote/Denver, CO",
      description:
        "Drive growth through digital marketing excellence. Manage social media, create content, run PPC campaigns, and analyze performance to attract adventure-seeking customers.",
      requirements: [
        "3+ years digital marketing experience",
        "Expertise in Google Ads, Facebook Ads, and SEO",
        "Strong content creation abilities",
        "Analytics and performance tracking skills",
        "Outdoor industry experience preferred",
      ],
      benefits: [
        "Remote Flexibility",
        "Marketing Budget",
        "Conference Attendance",
        "Adventure Time",
      ],
    },
    {
      title: "Maintenance Technician",
      department: "Operations",
      type: "Part-time",
      location: "Denver, CO",
      description:
        "Keep our gear in top condition through expert maintenance and repair. Perform detailed inspections, execute repairs, and ensure safety standards for all rental equipment.",
      requirements: [
        "Technical background in outdoor gear repair",
        "Experience with tents, backpacks, and camping equipment",
        "Attention to detail and quality standards",
        "Ability to work independently",
        "Basic inventory management skills",
      ],
      benefits: [
        "Skills Development",
        "Gear Industry Knowledge",
        "Flexible Schedule",
        "Equipment Discounts",
      ],
    },
  ];

  const benefits = [
    {
      category: "Health & Wellness",
      items: [
        "Comprehensive health, dental, vision",
        "Mental health support programs",
        "Fitness center membership",
        "Quarterly wellness challenges",
      ],
    },
    {
      category: "Adventure Time",
      items: [
        "Unlimited gear rental privileges",
        "Paid adventure days (use our gear!)",
        "Team expedition opportunities",
        "Industry event attendance",
      ],
    },
    {
      category: "Growth & Learning",
      items: [
        "Professional development budget",
        "Outdoor industry training",
        "Leadership development programs",
        "Cross-department learning opportunities",
      ],
    },
    {
      category: "Work-Life Balance",
      items: [
        "Flexible work arrangements",
        "Generous PTO policy",
        "Work from anywhere weeks",
        "Family-friendly policies",
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
              JOIN THE <span className="text-moss">ADVENTURE</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Turn your passion for outdoor adventures into a rewarding career.
              Help others explore the great outdoors while building your own
              professional summit.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                OPEN <span className="text-moss">POSITIONS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Find your perfect role in our growing team. We are always
                looking for passionate people to join our mission.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {positions.map((position, i) => (
              <RevealOnScroll key={position.title} delay={i * 0.1}>
                <div className="bg-obsidian rounded-2xl p-6 border border-white/5 group hover:border-moss/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl tracking-wider group-hover:text-moss transition-colors">
                        {position.title}
                      </h3>
                      <p className="text-cloud text-sm">
                        {position.department}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-moss text-sm font-medium">
                        {position.type}
                      </div>
                      <div className="text-cloud text-xs">
                        {position.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-mist text-sm leading-relaxed mb-4">
                    {position.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-display text-sm tracking-wider mb-2">
                      REQUIREMENTS
                    </h4>
                    <ul className="space-y-1">
                      {position.requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="text-cloud text-xs flex items-start gap-2"
                        >
                          <span className="text-trail text-xs mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-display text-sm tracking-wider mb-2">
                      PERKS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {position.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="bg-moss/10 text-moss px-2 py-1 rounded-lg text-xs"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all">
                    Apply Now
                  </button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                BENEFITS & <span className="text-moss">PERKS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                We take care of our team so they can take care of our customers
                and pursue their passion for adventure.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((category, i) => (
              <RevealOnScroll key={category.category} delay={i * 0.1}>
                <div className="bg-slate rounded-2xl p-6 border border-white/5">
                  <h3 className="font-display text-lg tracking-wider mb-4 text-moss">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-cloud text-sm flex items-start gap-2"
                      >
                        <span className="text-trail text-xs mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-6">
                  OUR <span className="text-moss">CULTURE</span>
                </h2>
                <div className="space-y-4 text-mist leading-relaxed">
                  <p>
                    At Summit Rentals, we are not just colleagues – we are
                    adventure buddies. Our team regularly hits the trails
                    together, testing gear and exploring new routes.
                  </p>
                  <p>
                    We believe the best work happens when you are passionate
                    about what you do. That is why we hire outdoor enthusiasts
                    who understand our customers needs firsthand.
                  </p>
                  <p>
                    Whether you are planning a weekend backpacking trip or
                    training for a big expedition, we support your adventures
                    with flexible time off and gear access.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="bg-obsidian rounded-2xl p-8 border border-white/10">
                <h3 className="font-display text-2xl tracking-wider mb-4">
                  Team Adventures
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏔️</span>
                    <div>
                      <div className="text-snow font-medium">
                        Monthly team hikes
                      </div>
                      <div className="text-cloud text-sm">
                        Explore Colorado&apos;s best trails together
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎿</span>
                    <div>
                      <div className="text-snow font-medium">
                        Seasonal adventures
                      </div>
                      <div className="text-cloud text-sm">
                        Skiing, climbing, and camping trips
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎒</span>
                    <div>
                      <div className="text-snow font-medium">Gear testing</div>
                      <div className="text-cloud text-sm">
                        Try new equipment before our customers
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏕️</span>
                    <div>
                      <div className="text-snow font-medium">
                        Annual retreat
                      </div>
                      <div className="text-cloud text-sm">
                        Multi-day backcountry adventure
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                APPLICATION <span className="text-moss">PROCESS</span>
              </h2>
              <p className="text-mist leading-relaxed">
                Our hiring process is designed to be transparent and get to know
                you as both a professional and an adventurer.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Application",
                description:
                  "Submit your resume and a cover letter telling us about your outdoor adventures.",
              },
              {
                number: "02",
                title: "Phone Screen",
                description:
                  "A casual 30-minute conversation about your experience and interests.",
              },
              {
                number: "03",
                title: "Interview",
                description:
                  "In-depth discussion about the role and how you can contribute to our mission.",
              },
              {
                number: "04",
                title: "Trial Day",
                description:
                  "Spend a day with our team to see if we are a good mutual fit.",
              },
              {
                number: "05",
                title: "Welcome!",
                description:
                  "Join the team and start your adventure with Summit Rentals.",
              },
            ].map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 0.1}>
                <div className="flex items-start gap-6">
                  <div className="bg-moss text-obsidian w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-display text-xl tracking-wider mb-2">
                      {step.title}
                    </h3>
                    <p className="text-cloud leading-relaxed">
                      {step.description}
                    </p>
                  </div>
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
              READY TO <span className="text-moss">APPLY?</span>
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8">
              Do not see a perfect match? Send us your resume anyway – we are
              always looking for great people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@summitrentals.com"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                Send Application
              </a>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                Ask Questions
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
