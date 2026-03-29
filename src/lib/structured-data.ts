// JSON-LD Structured Data for SEO
export const LoktakLakeJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Loktak Lake Camping",
  description:
    "Manipur's largest freshwater lake with unique floating phumdi islands",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Moirang",
    addressRegion: "Manipur",
    addressCountry: "India",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.5167",
    longitude: "93.7833",
  },
  touristType: "Nature Lovers, Wildlife Enthusiasts, Campers",
};

export const ShiruiLilyJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Shirui Lily Festival",
  description:
    "Annual festival celebrating Manipur's state flower, the rare Shirui Lily",
  location: {
    "@type": "Place",
    name: "Shirui Hills",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ukhrul",
      addressRegion: "Manipur",
      addressCountry: "India",
    },
  },
  startDate: "2024-04-01",
  endDate: "2024-05-31",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
};

export const UkhrulTrekkingJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Ukhrul Trekking Destinations",
  description:
    "Premier trekking destination in Manipur with Shirui Hills, Khangkhui Cave, and cultural experiences",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ukhrul",
    addressRegion: "Manipur",
    addressCountry: "India",
  },
  touristType: "Adventure Seekers, Trekkers, Nature Photographers",
  includesAttraction: [
    {
      "@type": "TouristAttraction",
      name: "Shirui Hills",
      description: "Home to the rare Shirui Lily flower",
    },
    {
      "@type": "TouristAttraction",
      name: "Khangkhui Cave",
      description: "Ancient limestone caves with archaeological significance",
    },
    {
      "@type": "TouristAttraction",
      name: "Wuyawon Kachui",
      description: "Pristine camping and trekking location",
    },
  ],
};

export const SummitRentalsJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Summit Rentals",
  description:
    "Premium equipment rentals for Manipur tourism, Ukhrul trekking, and Northeast India adventures",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Opposite Cyber Hills",
    addressLocality: "Imphal",
    addressRegion: "Manipur",
    postalCode: "795001",
    addressCountry: "India",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.8170",
    longitude: "93.9368",
  },
  telephone: "+91-385-244-5678",
  email: "info@summitrentals.com",
  openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 08:00-20:00",
  priceRange: "₹₹",
  servedCuisine: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tourism Equipment Rental",
    itemListElement: [
      {
        "@type": "Offer",
        price: "15",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Product",
          name: "Ukhrul Trekking Equipment",
          category: "Outdoor Gear",
          description: "Complete trekking gear for Ukhrul hills and Shirui exploration",
          offers: {
            "@type": "Offer",
            price: "15",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2024-12-31",
            itemCondition: "https://schema.org/NewCondition"
          }
        },
      },
      {
        "@type": "Offer",
        price: "25",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Product",
          name: "Photography Equipment for Shirui Lily",
          category: "Camera Equipment",
          description: "Professional camera gear for capturing Shirui Lily and wildlife photography",
          offers: {
            "@type": "Offer",
            price: "25",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2024-12-31",
            itemCondition: "https://schema.org/NewCondition"
          }
        },
      },
      {
        "@type": "Offer",
        price: "20",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Product",
          name: "Loktak Lake Camping Gear",
          category: "Camping Equipment",
          description: "Complete camping setup for Loktak Lake floating island experience",
          offers: {
            "@type": "Offer",
            price: "20",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: "2024-12-31",
            itemCondition: "https://schema.org/NewCondition"
          }
        },
      },
    ],
  },
  areaServed: [
    {
      "@type": "State",
      name: "Manipur",
    },
    {
      "@type": "State",
      name: "Northeast India",
    },
  ],
};
