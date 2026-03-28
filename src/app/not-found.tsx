import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-display text-[10rem] leading-none text-sunrise/20">
          404
        </div>
        <h1 className="font-display text-4xl tracking-[3px] -mt-6">
          PAGE NOT FOUND
        </h1>
        <p className="text-cloud mt-4 mb-8">
          Looks like you wandered off the path. Let&apos;s get you back on
          track.
        </p>
        <Link
          href="/"
          className="inline-flex bg-sunrise hover:bg-peak text-obsidian px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5"
        >
          Back to Base Camp →
        </Link>
      </div>
    </section>
  );
}
