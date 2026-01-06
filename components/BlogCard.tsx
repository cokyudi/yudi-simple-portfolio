import Link from "next/link";
import { BlogPostMeta } from "../lib/posts";

export default function BlogCard({
  title,
  description,
  date,
  slug,
}: BlogPostMeta) {
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  } as Intl.DateTimeFormatOptions;

  return (
    <Link href={`/blog/${slug}`}>
      <article
        className="
          h-full
          rounded-xl border
          border-gray-200 dark:border-gray-800
          p-6
          transition
          hover:-translate-y-1
          hover:shadow-lg
          bg-white dark:bg-black
          cursor-pointer
        "
      >
        <time className="text-sm text-gray-400">{new Date(date).toLocaleDateString('en-US', dateOptions)}</time>

        <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {description}
        </p>

        <span className="mt-4 inline-block text-sm font-medium text-teal-300">
          Read more →
        </span>
      </article>
    </Link>
  );
}