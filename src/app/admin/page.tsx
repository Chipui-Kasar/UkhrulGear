"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { User } from "@supabase/supabase-js";
import {
  PlusIcon,
  Cog8ToothIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  MapPinIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, [supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-cloud">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-center p-8 bg-slate rounded-2xl max-w-md">
          <h1 className="text-2xl font-display text-snow mb-4">
            Admin Access Required
          </h1>
          <p className="text-cloud mb-6">
            Please sign in to access the admin dashboard.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-sunrise hover:bg-peak text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const adminFeatures = [
    {
      title: "Gear Management",
      description: "Add, edit, and manage hiking gear inventory",
      href: "/admin/gear",
      icon: ArchiveBoxIcon,
      color: "from-sunrise to-peak",
    },
    {
      title: "Add New Gear",
      description: "Quick add new gear items to the collection",
      href: "/admin/gear/new",
      icon: PlusIcon,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Blog Posts",
      description: "Create and manage adventure blog content",
      href: "/admin/blog",
      icon: DocumentTextIcon,
      color: "from-moss to-trail",
    },
    {
      title: "FAQs",
      description: "Manage frequently asked questions",
      href: "/admin/faqs",
      icon: QuestionMarkCircleIcon,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Partner Locations",
      description: "Manage partner store locations and details",
      href: "/admin/partners",
      icon: MapPinIcon,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Testimonials",
      description: "Manage customer reviews and testimonials",
      href: "/admin/testimonials",
      icon: ChatBubbleLeftEllipsisIcon,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Site Content",
      description: "Edit hero sections and dynamic content blocks",
      href: "/admin/content",
      icon: PencilIcon,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Bookings",
      description: "View and manage rental bookings",
      href: "/admin/bookings",
      icon: CalendarDaysIcon,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Analytics",
      description: "View rental statistics and performance",
      href: "/admin/analytics",
      icon: ChartBarIcon,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Users",
      description: "Manage customer accounts and profiles",
      href: "/admin/users",
      icon: UserGroupIcon,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Settings",
      description: "Configure site settings and preferences",
      href: "/admin/settings",
      icon: Cog8ToothIcon,
      color: "from-gray-500 to-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl tracking-[2px] text-snow mb-4">
            ADMIN DASHBOARD
          </h1>
          <p className="text-cloud text-lg">
            Welcome back,{" "}
            <span className="text-sunrise">{user.email?.split("@")[0]}</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-3xl font-display text-sunrise">24</div>
            <div className="text-cloud text-sm">Total Gear Items</div>
          </div>
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-3xl font-display text-green-400">12</div>
            <div className="text-cloud text-sm">Active Rentals</div>
          </div>
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-3xl font-display text-blue-400">156</div>
            <div className="text-cloud text-sm">Total Customers</div>
          </div>
          <div className="bg-slate rounded-xl p-6 border border-white/5">
            <div className="text-3xl font-display text-purple-400">
              ₹2,30,000
            </div>
            <div className="text-cloud text-sm">Monthly Revenue</div>
          </div>
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group block bg-slate rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-display tracking-wider text-snow mb-3 group-hover:text-sunrise transition-colors">
                  {feature.title}
                </h3>
                <p className="text-cloud text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="text-2xl font-display tracking-wider text-snow mb-6">
            Recent Activity
          </h2>
          <div className="bg-slate rounded-2xl border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {[
                {
                  action: "New booking",
                  item: "Trekking Backpacks",
                  user: "john@example.com",
                  time: "2 hours ago",
                },
                {
                  action: "Gear returned",
                  item: "Camping Tents",
                  user: "sarah@example.com",
                  time: "4 hours ago",
                },
                {
                  action: "New user signup",
                  item: "",
                  user: "mike@example.com",
                  time: "6 hours ago",
                },
                {
                  action: "Booking completed",
                  item: "Hiking Boots",
                  user: "lisa@example.com",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="p-6 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-snow text-sm font-medium">
                        {activity.action}{" "}
                        {activity.item && `• ${activity.item}`}
                      </div>
                      <div className="text-cloud text-xs mt-1">
                        {activity.user}
                      </div>
                    </div>
                    <div className="text-cloud text-xs">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
