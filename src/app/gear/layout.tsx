import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Hiking Gear - Summit Rentals",
  description:
    "Browse our full collection of premium hiking gear available for rent — backpacks, tents, boots, navigation kits, trekking poles, and safety equipment.",
  openGraph: {
    title: "Hiking Gear Rentals | Summit Rentals",
    description:
      "Discover premium hiking gear for rent. From backpacks to tents, boots to navigation kits — everything you need for your next adventure.",
    type: "website",
  },
};

export default function GearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
