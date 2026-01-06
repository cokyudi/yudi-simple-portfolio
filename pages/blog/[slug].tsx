import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";

const postsDirectory = path.join(process.cwd(), "posts");

interface BlogPostProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
  };
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const files = fs.readdirSync(postsDirectory);

  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.mdx$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  BlogPostProps,
  Params
> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const filePath = path.join(postsDirectory, `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  return {
    props: {
      mdxSource,
      frontMatter: {
        title: data.title as string,
        date: data.date as string,
      },
    },
  };
};

export default function BlogPost({
  mdxSource,
  frontMatter,
}: BlogPostProps) {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as Intl.DateTimeFormatOptions;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {frontMatter.title}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {new Date(frontMatter.date).toLocaleDateString('en-US', dateOptions)}
      </p>

      <article className="mt-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-900 p-6 md:p-8 shadow-sm">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote {...mdxSource} />
        </div>
      </article>
    </div>
  );
}