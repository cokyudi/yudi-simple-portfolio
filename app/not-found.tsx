import Image from 'next/image';

export default function NotFound() {
  return (
    <main className='mt-16 flex items-center justify-center px-4'>
      <div className='max-w-md text-center'>
        <div className='flex justify-center mb-6'>
          <Image
            src='/logo.png'
            alt='Yudi Putra Logo'
            width={64}
            height={64}
            priority
          />
        </div>

        <h1 className='text-2xl font-semibold mb-2'>
          404 — Page Not Found
        </h1>

        <p className='text-gray-800 dark:text-gray-200 mb-6'>
          The page you’re looking for doesn’t exist.
        </p>
      </div>
    </main>
  );
}