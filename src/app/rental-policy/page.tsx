import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rental Policy - Summit Rentals",
  description:
    "Complete rental terms and conditions, damage policies, cancellation rules, and guidelines for gear rental with Summit Rentals.",
};

export default function RentalPolicyPage() {
  const policyNavigationData = [
    { title: "Reservations", id: "reservations" },
    { title: "Payment", id: "payment" },
    { title: "Delivery & Pickup", id: "delivery" },
    { title: "Gear Care", id: "gear-care" },
    { title: "Damages & Loss", id: "damages" },
    { title: "Cancellations", id: "cancellations" },
    { title: "Liability", id: "liability" },
  ];

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              RENTAL <span className="text-moss">POLICY</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Complete terms and conditions for gear rental. Understanding our
              policies ensures a smooth adventure experience.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-slate rounded-2xl p-6 border border-white/10">
              <h2 className="font-display text-xl tracking-wider mb-4 text-center">
                Quick Navigation
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {policyNavigationData.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="px-4 py-2 bg-obsidian hover:bg-moss hover:text-obsidian rounded-xl text-sm font-medium transition-all border border-white/10 hover:border-moss"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Reservations */}
          <RevealOnScroll>
            <div id="reservations" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">RESERVATIONS</span> & BOOKING
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Advance Booking
                  </h3>
                  <p className="mb-4">
                    Reservations can be made up to 6 months in advance. We
                    recommend booking at least 1-2 weeks ahead for popular
                    items, especially during peak season (May through October).
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Peak season booking recommended 2-4 weeks in advance
                    </li>
                    <li>Last-minute bookings subject to availability</li>
                    <li>Holiday weekends require advance booking</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Availability Guarantee
                  </h3>
                  <p>
                    Confirmed reservations guarantee your gear will be available
                    and in excellent condition. If we cannot fulfill a confirmed
                    reservation due to equipment failure or theft, we will
                    provide comparable gear at no additional cost or offer a
                    full refund.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Group Reservations
                  </h3>
                  <p className="mb-4">
                    Groups of 4 or more people qualify for special pricing and
                    dedicated support:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>4-7 people: 15% discount on total rental</li>
                    <li>8+ people: 20% discount on total rental</li>
                    <li>Custom packages available for large groups</li>
                    <li>Dedicated coordination specialist assigned</li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Payment */}
          <RevealOnScroll>
            <div id="payment" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">PAYMENT</span> & PRICING
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Payment Schedule
                  </h3>
                  <p className="mb-4">
                    A deposit is required to confirm your reservation, with the
                    balance due before delivery:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Reservation deposit: 25% of total rental cost</li>
                    <li>Balance due: 24 hours before delivery</li>
                    <li>Payment plans available for rentals over ₹15,000</li>
                    <li>
                      Major credit cards, PayPal, and bank transfers accepted
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Damage Protection
                  </h3>
                  <p className="mb-4">
                    Optional damage protection is available for 12% of the
                    rental value and covers:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Accidental damage during normal use</li>
                    <li>Water damage and weather exposure</li>
                    <li>Zipper failures and fabric tears</li>
                    <li>Minor gear malfunctions</li>
                  </ul>
                  <p className="mt-4 text-sm text-cloud">
                    Note: Damage protection does not cover theft, loss,
                    negligence, or misuse.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Additional Fees
                  </h3>
                  <div className="bg-slate rounded-xl p-6 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-snow mb-2">
                          Delivery Fees
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Within 25 miles</span>
                            <span className="text-trail">Free</span>
                          </div>
                          <div className="flex justify-between">
                            <span>25-50 miles</span>
                            <span>₹25 each way</span>
                          </div>
                          <div className="flex justify-between">
                            <span>50+ miles</span>
                            <span>₹1.50/mile each way</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-snow mb-2">
                          Other Fees
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Late return</span>
                            <span>150% daily rate</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Excessive cleaning</span>
                            <span>₹75-300</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rush processing</span>
                            <span>₹100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Delivery & Pickup */}
          <RevealOnScroll>
            <div id="delivery" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">DELIVERY</span> & PICKUP
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Delivery Schedule
                  </h3>
                  <p className="mb-4">
                    Gear is delivered the day before your adventure and
                    collected the day after your return:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Delivery window: 9 AM - 7 PM</li>
                    <li>Specific time slots can be requested</li>
                    <li>48-hour notice required for delivery changes</li>
                    <li>
                      Same day delivery available for ₹100 fee (subject to
                      availability)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Delivery Requirements
                  </h3>
                  <p className="mb-4">To ensure successful delivery:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Secure location must be available for gear</li>
                    <li>Someone 18+ must be available to receive gear</li>
                    <li>
                      Access instructions must be provided for gated communities
                    </li>
                    <li>
                      Alternative arrangements can be made for unattended
                      delivery
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Warehouse Pickup
                  </h3>
                  <p className="mb-4">
                    Prefer to handle logistics yourself? Pickup is available at
                    our Denver warehouse:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Monday-Friday: 8 AM - 6 PM</li>
                    <li>Saturday-Sunday: 8 AM - 4 PM</li>
                    <li>No pickup fees</li>
                    <li>Inspect gear before taking</li>
                    <li>Same-day rentals possible with advance notice</li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Gear Care */}
          <RevealOnScroll>
            <div id="gear-care" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">GEAR</span> CARE EXPECTATIONS
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Normal Use Guidelines
                  </h3>
                  <p className="mb-4">
                    We expect gear to be used for its intended outdoor purposes.
                    Normal use includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Hiking, camping, and outdoor recreation</li>
                    <li>Exposure to weather, dirt, and natural elements</li>
                    <li>Reasonable wear from proper use</li>
                    <li>Minor scuffs and normal fabric wear</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Prohibited Uses
                  </h3>
                  <p className="mb-4">
                    The following uses void damage protection and may incur
                    additional charges:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Commercial or professional use</li>
                    <li>Extreme sports beyond gear specifications</li>
                    <li>Use by children without adult supervision</li>
                    <li>Modification or alteration of gear</li>
                    <li>Use under influence of drugs or alcohol</li>
                    <li>Lending gear to non-approved users</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Return Condition
                  </h3>
                  <p className="mb-4">When returning gear:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Empty pockets, stuff sacks, and compartments</li>
                    <li>Shake out debris from tents and sleeping gear</li>
                    <li>Return all included accessories and parts</li>
                    <li>
                      Don&apos;t attempt to wash gear - we handle professional
                      cleaning
                    </li>
                    <li>Report any damage or issues immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Damages & Loss */}
          <RevealOnScroll>
            <div id="damages" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">DAMAGES</span> & LOSS POLICY
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Damage Assessment
                  </h3>
                  <p className="mb-4">
                    All gear is inspected upon return. Damage charges are based
                    on:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Actual repair costs for fixable damage</li>
                    <li>Replacement value minus depreciation for total loss</li>
                    <li>Professional assessment for complex damage</li>
                    <li>Fair market value for discontinued items</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Common Damage Examples
                  </h3>
                  <div className="bg-slate rounded-xl p-6 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-medium text-snow mb-3">
                          Minor Damage (Usually Covered)
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Small fabric tears (&lt;2 inches)</li>
                          <li>• Scuff marks and normal wear</li>
                          <li>• Zipper pulls replacement</li>
                          <li>• Cord and buckle replacement</li>
                          <li>• Cleaning for normal dirt/mud</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-snow mb-3">
                          Major Damage (Additional Charges)
                        </div>
                        <ul className="text-sm space-y-1">
                          <li>• Large rips or holes (&gt;2 inches)</li>
                          <li>• Broken zippers or poles</li>
                          <li>• Stains that won&apos;t clean</li>
                          <li>• Structural damage</li>
                          <li>• Missing components</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Lost or Stolen Gear
                  </h3>
                  <p className="mb-4">In case of theft or loss:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Report loss within 24 hours of discovery</li>
                    <li>Police report required for theft claims</li>
                    <li>
                      Replacement charges based on current retail value minus
                      depreciation
                    </li>
                    <li>
                      Travel insurance may cover theft - check your policy
                    </li>
                    <li>Payment plans available for large replacement costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Cancellations */}
          <RevealOnScroll>
            <div id="cancellations" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">CANCELLATION</span> POLICY
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Standard Cancellations
                  </h3>
                  <div className="bg-slate rounded-xl p-6 border border-white/10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="font-medium">
                          More than 48 hours before rental
                        </span>
                        <span className="text-trail font-bold">
                          100% Refund
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="font-medium">
                          24-48 hours before rental
                        </span>
                        <span className="text-sunrise font-bold">
                          50% Refund
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          Less than 24 hours or no-show
                        </span>
                        <span className="text-red-400 font-bold">
                          No Refund
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Weather-Related Cancellations
                  </h3>
                  <p className="mb-4">
                    Severe weather conditions may qualify for special
                    consideration:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      National Weather Service warnings for your destination
                    </li>
                    <li>Road closures preventing access to trailheads</li>
                    <li>Evacuation orders or emergency conditions</li>
                    <li>Alternative dates will be offered when possible</li>
                  </ul>
                  <p className="text-sm text-cloud mt-4">
                    General poor weather (rain, snow, cold) does not qualify for
                    weather-related cancellations unless it poses safety risks.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Modifications
                  </h3>
                  <p className="mb-4">Changes to your rental:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Date changes allowed up to 48 hours before rental</li>
                    <li>Gear substitutions subject to availability</li>
                    <li>
                      Extending rental duration possible with advance notice
                    </li>
                    <li>
                      No fees for reasonable modifications with adequate notice
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Liability */}
          <RevealOnScroll>
            <div id="liability" className="scroll-mt-24">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-8">
                <span className="text-moss">LIABILITY</span> & SAFETY
              </h2>
              <div className="space-y-6 text-mist leading-relaxed">
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Assumption of Risk
                  </h3>
                  <p className="mb-4">
                    Outdoor recreation involves inherent risks. By renting gear,
                    you acknowledge:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Outdoor activities have inherent dangers</li>
                    <li>Weather and terrain conditions can be unpredictable</li>
                    <li>
                      Proper gear use and safety knowledge are your
                      responsibility
                    </li>
                    <li>Emergency response may be delayed in remote areas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Safety Requirements
                  </h3>
                  <p className="mb-4">To ensure safe adventures:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Users must be physically capable of planned activities
                    </li>
                    <li>Proper gear knowledge and experience required</li>
                    <li>Helmets required for all rock climbing and cycling</li>
                    <li>Children must be supervised by responsible adults</li>
                    <li>Trip plans should be shared with emergency contacts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                    Insurance Recommendations
                  </h3>
                  <p className="mb-4">We strongly recommend:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Travel insurance for trip cancellation and medical
                      coverage
                    </li>
                    <li>Personal liability insurance for outdoor activities</li>
                    <li>
                      Verification that activities are covered by your health
                      insurance
                    </li>
                    <li>
                      Emergency evacuation insurance for remote destinations
                    </li>
                  </ul>
                </div>
                <div className="bg-slate rounded-xl p-6 border border-red-400/20">
                  <h4 className="font-display text-lg tracking-wider text-red-400 mb-3">
                    Important Notice
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Summit Rentals provides outdoor gear in good working
                    condition but cannot guarantee the safety of outdoor
                    activities. Users assume all risks associated with outdoor
                    recreation. Our liability is limited to the replacement
                    value of rental gear. By renting gear, you agree to these
                    terms and acknowledge understanding of the risks involved.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-6">
              POLICY <span className="text-moss">QUESTIONS?</span>
            </h2>
            <p className="text-mist text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Our team is happy to clarify any aspects of our rental policy.
              Clear communication ensures great adventures.
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
                href="/faq"
                className="bg-transparent border-2 border-white/20 hover:border-white/60 text-snow px-8 py-4 rounded-2xl font-bold uppercase tracking-wider transition-all"
              >
                View FAQ
              </Link>
            </div>
            <p className="text-cloud text-sm mt-6">
              Last updated: March 2026 • Policy subject to change with notice
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
