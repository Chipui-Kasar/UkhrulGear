"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  reading_time: number;
  featured: boolean;
  published: boolean;
  published_at: string;
  created_at: string;
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "published" | "draft" | "featured"
  >("all");
  const supabase = createClient();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ published: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ featured: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    switch (filter) {
      case "published":
        return post.published;
      case "draft":
        return !post.published;
      case "featured":
        return post.featured;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="text-cloud">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl md:text-5xl tracking-[2px] text-snow mb-4">
              BLOG MANAGEMENT
            </h1>
            <p className="text-cloud text-lg">
              Create and manage adventure blog content
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            New Post
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { key: "all", label: "All Posts" },
            { key: "published", label: "Published" },
            { key: "draft", label: "Drafts" },
            { key: "featured", label: "Featured" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.key
                  ? "bg-moss text-obsidian"
                  : "bg-slate text-cloud hover:text-snow border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate rounded-xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-xl tracking-wider text-snow group-hover:text-moss transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {post.featured && (
                        <span className="px-2 py-1 bg-sunrise/20 text-sunrise rounded-lg text-xs font-bold">
                          FEATURED
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          post.published
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {post.published ? "PUBLISHED" : "DRAFT"}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-cloud text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-mist">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.reading_time} min read</span>
                    <span>•</span>
                    <span>
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                    {post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-white/5 text-mist px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-mist text-xs">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-cloud hover:text-moss transition-colors"
                    title="View Post"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>

                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="p-2 text-cloud hover:text-moss transition-colors"
                    title="Edit Post"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>

                  <button
                    onClick={() => toggleFeatured(post.id, post.featured)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      post.featured
                        ? "bg-sunrise/20 text-sunrise hover:bg-sunrise/30"
                        : "bg-white/10 text-cloud hover:bg-white/20"
                    }`}
                    title={
                      post.featured ? "Remove from Featured" : "Make Featured"
                    }
                  >
                    {post.featured ? "Featured" : "Feature"}
                  </button>

                  <button
                    onClick={() => togglePublished(post.id, post.published)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      post.published
                        ? "bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400"
                        : "bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400"
                    }`}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-cloud hover:text-red-400 transition-colors"
                    title="Delete Post"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-cloud text-lg mb-4">No blog posts found</div>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
