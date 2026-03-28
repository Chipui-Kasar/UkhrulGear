import { type Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Link from "next/link";
import { createServerComponentClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  author_avatar: string;
  category: string;
  tags: string[];
  reading_time: number;
  featured: boolean;
  published: boolean;
  published_at: string;
  created_at: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createServerComponentClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", resolvedParams.slug)
    .eq("published", true)
    .single();

  if (!post) {
    return {
      title: "Blog Post Not Found - Summit Rentals",
    };
  }

  return {
    title: `${post.title} - Summit Rentals`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createServerComponentClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  // Get related posts from same category
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, author, category, reading_time, published_at",
    )
    .eq("category", post.category)
    .eq("published", true)
    .neq("slug", resolvedParams.slug)
    .limit(3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="bg-obsidian text-snow">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-mist hover:text-moss transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-moss/20 text-moss px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-mist text-sm">
                  {post.reading_time} min read
                </span>
              </div>
              <h1 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.1] tracking-[1px] mb-6">
                {post.title}
              </h1>
              <p className="text-mist text-xl leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              {post.author_avatar && (
                <img
                  src={post.author_avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-snow">{post.author}</div>
                <div className="text-mist text-sm">
                  {formatDate(post.published_at)}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Image */}
      {post.image_url && (
        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="prose prose-lg prose-invert max-w-none">
              {post.content
                .split("\n\n")
                .map((paragraph: string, index: number) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="font-display text-3xl tracking-[1px] mb-6 mt-12 text-moss"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("# ")) {
                    return (
                      <h1
                        key={index}
                        className="font-display text-4xl tracking-[1px] mb-6 mt-12 text-snow"
                      >
                        {paragraph.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3
                        key={index}
                        className="font-display text-xl tracking-[1px] mb-4 mt-8 text-trail"
                      >
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph
                      .split("\n")
                      .filter((item: string) => item.startsWith("- "));
                    return (
                      <ul key={index} className="mb-6 space-y-2">
                        {items.map((item: string, itemIndex: number) => (
                          <li
                            key={itemIndex}
                            className="text-mist leading-relaxed"
                          >
                            {item.replace("- ", "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-mist leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                })}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <section className="px-6 py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll>
              <h3 className="font-display text-xl tracking-wider mb-6">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-slate border border-white/10 px-4 py-2 rounded-xl text-sm text-mist"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="px-6 py-20 bg-slate">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <h2 className="font-display text-3xl tracking-[2px] mb-12 text-center">
                RELATED <span className="text-moss">ARTICLES</span>
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <RevealOnScroll key={relatedPost.id} delay={index * 0.1}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-obsidian rounded-2xl p-6 border border-white/5 hover:border-moss/30 transition-all duration-300 group">
                      <div className="mb-4">
                        <span className="text-moss text-sm font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h3 className="font-display text-xl tracking-wider mb-3 group-hover:text-moss transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-mist text-sm leading-relaxed mb-4 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-cloud">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.reading_time} min read</span>
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-moss hover:bg-moss/80 text-obsidian px-8 py-4 rounded-xl font-bold transition-colors"
            >
              ← Back to All Articles
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
