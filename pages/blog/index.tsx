import { getAllPosts, BlogPostMeta } from "../../lib/posts";
import BlogCard from "../../components/BlogCard";
import { GetStaticProps } from "next";

interface BlogIndexProps {
  posts: BlogPostMeta[];
}

export const getStaticProps: GetStaticProps<{
  posts: BlogPostMeta[];
}> = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Notes on learning, experiments, and experiences.
        </p>
      </header>

      <section
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </section>
    </main>
  );
}