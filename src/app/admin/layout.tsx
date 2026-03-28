import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Summit Rentals",
  description:
    "Manage gear inventory, bookings, and settings for Summit Rentals",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
