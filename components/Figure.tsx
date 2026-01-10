import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-8 flex flex-col items-center">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="rounded-xl w-auto h-auto"
      />

      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}