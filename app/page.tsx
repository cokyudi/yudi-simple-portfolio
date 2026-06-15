import About from '@/components/About';
import { userData } from '@/constants/data';
import { SITE_URL, SITE_NAME, SITE_TITLE } from '@/constants/site';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: SITE_TITLE,
  sameAs: [userData.socialLinks.linkedin, userData.socialLinks.github],
};

export default function Home() {
  return (
    <div className='space-y-14 lg:space-y-24'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className='max-w-4xl mx-auto mt-10 antialiased'>
        <About />
      </div>
    </div>
  )
}
