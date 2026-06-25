import About from '@/components/About';
import { personSchema, websiteSchema, jsonLdGraph } from '@/lib/jsonld';

export default function Home() {
  return (
    <div className='space-y-14 lg:space-y-24'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: jsonLdGraph(websiteSchema, personSchema) }}
      />
      <div className='max-w-4xl mx-auto mt-10 antialiased'>
        <About />
      </div>
    </div>
  )
}
