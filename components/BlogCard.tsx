import Link from 'next/link';
import { BlogPostMeta } from '@/lib/posts';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

type BlogCardProps = BlogPostMeta;

export default function BlogCard({
  title,
  description,
  date,
  slug,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      aria-label={`Read blog post: ${title}`}
      className='group h-full'
    >
      <article
        className='
          h-full
          rounded-xl border border-gray-200 dark:border-gray-800
          bg-white dark:bg-black
          p-6
          transition
          hover:-translate-y-1
          hover:shadow-lg
        '
      >
        <time
          dateTime={date}
          className='text-sm text-gray-800 dark:text-gray-200'
        >
          {dateFormatter.format(new Date(date))}
        </time>

        <h2 className='mt-2 text-lg font-semibold text-gray-900 dark:text-white'>
          {title}
        </h2>

        <p className='mt-3 text-sm text-gray-800 dark:text-gray-200 line-clamp-3'>
          {description}
        </p>

        <span className='mt-4 inline-block text-sm font-medium text-teal-500 dark:text-teal-300 group-hover:underline'>
          Read more →
        </span>
      </article>
    </Link>
  );
}