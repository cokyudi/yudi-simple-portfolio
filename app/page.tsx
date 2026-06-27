import About from '@/components/About';
import { userData } from '@/constants/data';
import { i18n } from '@/constants/i18n';
import { personSchema, websiteSchema, jsonLdGraph, PERSON_ID } from '@/lib/jsonld';

const projectsCopy = i18n.en.projects;

// Standalone apps Yudi built (exclude this site itself), declared as
// SoftwareApplication entities authored by the Person.
const appSchemas = userData.projects
  .filter((project) => project.id !== 'portfolio')
  .map((project) => ({
    '@type': 'SoftwareApplication',
    '@id': `${project.url}#app`,
    name: project.name,
    url: project.url,
    description: projectsCopy[project.id],
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    author: { '@id': PERSON_ID },
  }));

export default function Home() {
  return (
    <div className='space-y-14 lg:space-y-24'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(websiteSchema, personSchema, ...appSchemas),
        }}
      />
      <div className='max-w-4xl mx-auto mt-10 antialiased'>
        <About />
      </div>
    </div>
  )
}
