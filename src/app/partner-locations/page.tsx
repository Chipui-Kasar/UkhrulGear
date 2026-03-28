import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { createServerComponentClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Ukhrul & Manipur Tourism Equipment Pickup Locations - Summit Rentals",
  description:
    "Find Summit Rentals partner locations throughout Ukhrul, Imphal, Loktak Lake, and Manipur tourism destinations. Convenient pickup points for trekking equipment, cameras, camping gear for Shirui Lily festival and Northeast India adventures.",
};

interface PartnerLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  image_url: string;
  services: string[];
  specialties: string[];
  hours: Record<string, string>;
  coordinates: { lat: number; lng: number };
  featured: boolean;
  active: boolean;
}

export default async function PartnerLocationsPage() {
  const supabase = await createServerComponentClient();
  const { data: partners } = await supabase
    .from("partner_locations")
    .select("*")
    .eq("active", true)
    .order("featured", { ascending: false });

  // Separate featured and regular partners
  const featuredPartners = partners?.filter((p) => p.featured) || [];
  const regularPartners = partners?.filter((p) => !p.featured) || [];

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              PARTNER <span className="text-moss">LOCATIONS</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Find Summit Rentals pickup points throughout Northeast India.
              Convenient access to cars, bikes, cameras, equipment, and
              everything you need to rent across the region.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Partner Locations */}
      {featuredPartners.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                  <span className="text-moss">FEATURED</span> PARTNERS
                </h2>
                <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                  Our premier partner locations in Northeast India, offering
                  complete rental services and local expertise.
                </p>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPartners.map(
                (partner: PartnerLocation, index: number) => (
                  <RevealOnScroll key={partner.id} delay={index * 0.1}>
                    <div className="bg-slate rounded-2xl p-8 border border-white/10">
                      <div className="flex items-center gap-4 mb-6">
                        {partner.image_url ? (
                          <img
                            src={partner.image_url}
                            alt={partner.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-moss/20 flex items-center justify-center">
                            <span className="text-3xl">🏢</span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-display text-xl tracking-wider text-moss">
                            {partner.name}
                          </h3>
                          <p className="text-cloud text-sm">
                            {partner.city}, {partner.state}
                          </p>
                        </div>
                      </div>

                      <p className="text-mist text-sm mb-6 leading-relaxed">
                        {partner.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="text-trail text-lg">📍</span>
                            <div>
                              <div className="text-snow font-medium">
                                Address
                              </div>
                              <div className="text-mist text-sm">
                                {partner.address}
                                <br />
                                {partner.city}, {partner.state}{" "}
                                {partner.zip_code}
                              </div>
                            </div>
                          </div>

                          {partner.phone && (
                            <div className="flex items-start gap-3">
                              <span className="text-trail text-lg">📞</span>
                              <div>
                                <div className="text-snow font-medium">
                                  Phone
                                </div>
                                <div className="text-mist text-sm">
                                  <a
                                    href={`tel:${partner.phone}`}
                                    className="hover:text-moss transition-colors"
                                  >
                                    {partner.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}

                          {partner.email && (
                            <div className="flex items-start gap-3">
                              <span className="text-trail text-lg">📧</span>
                              <div>
                                <div className="text-snow font-medium">
                                  Email
                                </div>
                                <div className="text-mist text-sm">
                                  <a
                                    href={`mailto:${partner.email}`}
                                    className="hover:text-moss transition-colors"
                                  >
                                    {partner.email}
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}

                          {partner.website && (
                            <div className="flex items-start gap-3">
                              <span className="text-trail text-lg">🌐</span>
                              <div>
                                <div className="text-snow font-medium">
                                  Website
                                </div>
                                <div className="text-mist text-sm">
                                  <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-moss transition-colors"
                                  >
                                    Visit Website
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          {partner.services && partner.services.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-display text-sm tracking-wider text-trail mb-2">
                                SERVICES
                              </h4>
                              <div className="space-y-1">
                                {partner.services.map(
                                  (service: string, i: number) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="text-moss text-xs">
                                        ✓
                                      </span>
                                      <span className="text-cloud text-xs">
                                        {service}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          {partner.specialties &&
                            partner.specialties.length > 0 && (
                              <div>
                                <h4 className="font-display text-sm tracking-wider text-trail mb-2">
                                  SPECIALTIES
                                </h4>
                                <div className="space-y-1">
                                  {partner.specialties.map(
                                    (specialty: string, i: number) => (
                                      <div
                                        key={i}
                                        className="flex items-center gap-2"
                                      >
                                        <span className="text-sunrise text-xs">
                                          •
                                        </span>
                                        <span className="text-cloud text-xs">
                                          {specialty}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>

                      {partner.hours &&
                        Object.keys(partner.hours).length > 0 && (
                          <div className="mt-6 pt-4 border-t border-white/10">
                            <h4 className="font-display text-sm tracking-wider text-trail mb-2">
                              HOURS
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {Object.entries(partner.hours).map(
                                ([day, hours]) => (
                                  <div
                                    key={day}
                                    className="flex justify-between text-xs"
                                  >
                                    <span className="text-cloud capitalize">
                                      {day}:
                                    </span>
                                    <span className="text-mist">{hours}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </RevealOnScroll>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* All Partner Locations */}
      {regularPartners.length > 0 && (
        <section className="py-20 px-6 bg-slate">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                  PARTNER <span className="text-moss">NETWORK</span>
                </h2>
                <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                  Additional partner locations across the region for convenient
                  equipment access and local support.
                </p>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPartners.map(
                (partner: PartnerLocation, index: number) => (
                  <RevealOnScroll key={partner.id} delay={index * 0.1}>
                    <div className="bg-obsidian rounded-2xl p-6 border border-white/5 hover:border-moss/30 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        {partner.image_url ? (
                          <img
                            src={partner.image_url}
                            alt={partner.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-moss/20 flex items-center justify-center">
                            <span className="text-xl">📍</span>
                          </div>
                        )}
                        <div>
                          <h3 className="font-display text-lg tracking-wider text-moss">
                            {partner.name}
                          </h3>
                          <p className="text-cloud text-sm">
                            {partner.city}, {partner.state}
                          </p>
                        </div>
                      </div>

                      <p className="text-mist text-sm mb-4 leading-relaxed line-clamp-3">
                        {partner.description}
                      </p>

                      <div className="space-y-2">
                        {partner.phone && (
                          <div className="flex items-center gap-2">
                            <span className="text-trail text-sm">📞</span>
                            <a
                              href={`tel:${partner.phone}`}
                              className="text-mist text-sm hover:text-moss transition-colors"
                            >
                              {partner.phone}
                            </a>
                          </div>
                        )}

                        {partner.email && (
                          <div className="flex items-center gap-2">
                            <span className="text-trail text-sm">📧</span>
                            <a
                              href={`mailto:${partner.email}`}
                              className="text-mist text-sm hover:text-moss transition-colors"
                            >
                              Contact
                            </a>
                          </div>
                        )}

                        {partner.website && (
                          <div className="flex items-center gap-2">
                            <span className="text-trail text-sm">🌐</span>
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-mist text-sm hover:text-moss transition-colors"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>

                      {partner.specialties &&
                        partner.specialties.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex flex-wrap gap-1">
                              {partner.specialties
                                .slice(0, 3)
                                .map((specialty: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-moss/20 text-moss px-2 py-1 rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              {partner.specialties.length > 3 && (
                                <span className="text-xs text-cloud">
                                  +{partner.specialties.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </RevealOnScroll>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* No Partners Fallback */}
      {(!partners || partners.length === 0) && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <div className="text-6xl mb-6">🗺️</div>
              <h2 className="font-display text-3xl tracking-wider text-moss mb-4">
                Partner Network Coming Soon
              </h2>
              <p className="text-mist leading-relaxed mb-8">
                We&apos;re building our network of trusted partner locations
                across Northeast India. Check back soon for convenient pickup
                points and local equipment access.
              </p>
              <Link
                href="/contact"
                className="bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all inline-block"
              >
                Partner With Us
              </Link>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Partner Benefits */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                PARTNER <span className="text-moss">BENEFITS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                More than just pickup points - our partners offer exclusive
                services and local expertise across Northeast India.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RevealOnScroll delay={0.1}>
              <div className="bg-obsidian rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">�</div>
                <h3 className="font-display text-xl tracking-wider text-moss mb-3">
                  LOCAL EXPERTISE
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  Get insider knowledge about local services, regulations, and
                  recommendations from experienced local partners.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="bg-obsidian rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display text-xl tracking-wider text-moss mb-3">
                  QUICK PICKUP
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  Skip the wait - reserve online and pick up your equipment
                  instantly at any partner location convenient to your
                  destination.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="bg-obsidian rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="font-display text-xl tracking-wider text-moss mb-3">
                  EQUIPMENT SERVICES
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  Last-minute adjustments, equipment checks, and quick
                  maintenance to ensure your rental is ready for use.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.4}>
              <div className="bg-obsidian rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="font-display text-xl tracking-wider text-moss mb-3">
                  SECURE STORAGE
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  Store your personal items safely while you use rentals, or
                  swap equipment during your rental period at partner locations.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.5}>
              <div className="bg-obsidian rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="font-display text-xl tracking-wider text-moss mb-3">
                  LOCAL GUIDANCE
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  Get personalized recommendations based on your needs, local
                  conditions, and rental duration requirements.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.6}>
              <div className="bg-obsidian rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-display text-xl tracking-wider text-moss mb-3">
                  24/7 SUPPORT
                </h3>
                <p className="text-mist text-sm leading-relaxed">
                  24/7 customer support and assistance coordination through our
                  partner network and local service providers.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* How to Use Partners */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl tracking-[2px] mb-4">
                USING PARTNER <span className="text-moss">LOCATIONS</span>
              </h2>
              <p className="text-mist max-w-2xl mx-auto leading-relaxed">
                Simple steps to access Summit Rentals equipment through our
                partner network across Northeast India.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealOnScroll delay={0.1}>
              <div className="bg-slate rounded-2xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-moss rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-obsidian text-xl font-bold">1</span>
                </div>
                <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                  Book Online
                </h3>
                <p className="text-mist mb-4 text-sm">
                  Reserve your equipment through our website and select partner
                  pickup
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Choose your equipment and dates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Select partner location during checkout
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Receive confirmation with pickup instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Pay online or at pickup location
                    </span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="bg-slate rounded-2xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-moss rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-obsidian text-xl font-bold">2</span>
                </div>
                <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                  Pickup Equipment
                </h3>
                <p className="text-mist mb-4 text-sm">
                  Collect your equipment at the designated partner location
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Arrive during partner business hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Bring confirmation and ID
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Inspect equipment with partner staff
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Get local advice and recommendations
                    </span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="bg-slate rounded-2xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-moss rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-obsidian text-xl font-bold">3</span>
                </div>
                <h3 className="font-display text-xl tracking-wider text-trail mb-3">
                  Return Equipment
                </h3>
                <p className="text-mist mb-4 text-sm">
                  Return clean equipment to any partner location or our
                  warehouse
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Return during business hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Clean equipment as per instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Include all accessories and parts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-moss text-sm mt-0.5">•</span>
                    <span className="text-cloud text-xs">
                      Receive return confirmation
                    </span>
                  </li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </main>
  );
}
