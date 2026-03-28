import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { createServerComponentClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Blog - Summit Rentals",
  description:
    "Adventure stories, gear reviews, and outdoor tips from the Summit Rentals team and community. Get inspired for your next adventure.",
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  author_avatar: string;
  category: string;
  tags: string[];
  reading_time: number;
  featured: boolean;
  published_at: string;
  image_url: string;
}

export default async function BlogPage() {
  const supabase = await createServerComponentClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const { data: categories } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("published", true);

  // Get unique categories with counts
  const categoryStats = (categories || []).reduce(
    (acc: { [key: string]: number }, post: any) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    },
    {},
  );

  const categoryList = [
    { name: "All", count: posts?.length || 0 },
    ...Object.entries(categoryStats).map(([name, count]) => ({ name, count })),
  ];

  const featuredPost = posts?.find((post) => post.featured) || posts?.[0];
  const regularPosts =
    posts?.filter((post) => !post.featured || post.id !== featuredPost?.id) ||
    [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPostImage = (post: BlogPost) => {
    if (post.image_url) return post.image_url;

    // Fallback emojis based on category
    const categoryEmojis: { [key: string]: string } = {
      Adventure: "🏔️",
      "Gear Guide": "⛺",
      Winter: "❄️",
      "Trail Running": "🏃‍♂️",
      Safety: "🛡️",
      Photography: "📸",
      default: "🥾",
    };

    return categoryEmojis[post.category] || categoryEmojis.default;
  };

  const newsletter = {
    title: "The Trailhead Newsletter",
    description:
      "Weekly outdoor inspiration, gear tips, and Colorado trail reports delivered to your inbox.",
    benefits: [
      "Exclusive trail reports and conditions",
      "Early access to gear reviews",
      "Special member discounts",
      "Adventure planning resources",
    ],
  };

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-trail/10" />
        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[3px] mb-6">
              ADVENTURE <span className="text-moss">STORIES</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-mist text-lg leading-relaxed max-w-2xl mx-auto">
              Trail reports, gear insights, and outdoor wisdom from our
              community of adventurers.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categoryList.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full border transition-all ${
                  category.name === "All"
                    ? "bg-moss text-obsidian border-moss"
                    : "border-white/20 text-cloud hover:border-moss hover:text-moss"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-70">
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <RevealOnScroll>
              <div className="bg-slate rounded-2xl p-8 lg:p-12 border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-moss/20 text-moss rounded-full text-xs font-bold uppercase">
                      Featured
                    </span>
                    <span className="text-cloud text-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-mist leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featuredPost.author_avatar ? (
                        <img
                          src={featuredPost.author_avatar}
                          alt={featuredPost.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-moss/20 flex items-center justify-center">
                          👩🏻‍💼
                        </div>
                      )}
                      <div>
                        <div className="text-snow font-medium text-sm">
                          {featuredPost.author}
                        </div>
                        <div className="text-cloud text-xs">
                          {formatDate(featuredPost.published_at)} •{" "}
                          {featuredPost.reading_time} min read
                        </div>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <button className="bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {featuredPost.image_url ? (
                    <img
                      src={featuredPost.image_url}
                      alt={featuredPost.title}
                      className="w-full h-[300px] object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-[8rem] opacity-80">
                      {getPostImage(featuredPost)}
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 px-6 bg-slate">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <h2 className="font-display text-3xl tracking-[2px] mb-12 text-center">
              LATEST <span className="text-moss">ARTICLES</span>
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <RevealOnScroll key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="bg-obsidian rounded-2xl overflow-hidden border border-white/5 hover:border-moss/30 transition-all duration-300 group">
                    <div className="aspect-video bg-slate flex items-center justify-center">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-6xl opacity-80">
                          {getPostImage(post)}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-moss text-xs font-medium uppercase">
                          {post.category}
                        </span>
                        <span className="text-cloud text-xs">•</span>
                        <span className="text-cloud text-xs">
                          {post.reading_time} min read
                        </span>
                      </div>
                      <h3 className="font-display text-xl tracking-wider mb-3 leading-tight group-hover:text-moss transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-mist text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        {post.author_avatar ? (
                          <img
                            src={post.author_avatar}
                            alt={post.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-moss/20 flex items-center justify-center text-xs">
                            {post.author.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-snow text-sm font-medium">
                            {post.author}
                          </div>
                          <div className="text-cloud text-xs">
                            {formatDate(post.published_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          {/* No posts fallback */}
          {(!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <div className="text-cloud text-lg mb-4">
                No blog posts available yet
              </div>
              <p className="text-mist text-sm">
                Check back soon for adventure stories and gear insights!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-slate rounded-2xl p-8 lg:p-12 border border-white/10 text-center">
              <h2 className="font-display text-3xl lg:text-4xl tracking-[2px] mb-4">
                THE TRAILHEAD <span className="text-moss">NEWSLETTER</span>
              </h2>
              <p className="text-mist text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                Weekly outdoor inspiration, gear tips, and Colorado trail
                reports delivered to your inbox.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  {[
                    "Exclusive trail reports and conditions",
                    "Early access to gear reviews",
                    "Special member discounts",
                    "Adventure planning resources",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-moss/20 flex items-center justify-center">
                        <span className="text-moss text-sm">✓</span>
                      </div>
                      <span className="text-mist text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="bg-obsidian rounded-xl p-6 border border-white/5">
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-slate border border-white/10 rounded-lg text-snow placeholder-mist focus:outline-none focus:border-moss transition-colors"
                      />
                      <button className="w-full bg-moss hover:bg-moss/80 text-obsidian px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all">
                        Subscribe Now
                      </button>
                    </div>
                    <p className="text-cloud text-xs mt-3">
                      No spam, unsubscribe at any time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
