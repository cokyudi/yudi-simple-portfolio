import Image from 'next/image';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export default function Figure({ src, alt, caption, priority = false }: FigureProps) {
  return (
    <figure className='my-8 flex flex-col items-center'>
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        priority={priority}
        className='border-2 border-ink shadow-retro w-auto h-auto'
      />

      {caption && (
        <figcaption className='mt-2 text-center text-sm text-muted'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}