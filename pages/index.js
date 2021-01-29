import Header from '@/components/Header'
import Layout from '@/components/Layout'
import { allJobs } from '@/lib/job-queries'
import { format } from 'date-fns'
import Head from 'next/head'
import Link from 'next/link'
import CalendarIcon from 'heroicons/solid/calendar.svg'
import BriefcaseIcon from 'heroicons/solid/briefcase.svg'
import LocationMarkerIcon from 'heroicons/solid/location-marker.svg'
import CurrencyDollarIcon from 'heroicons/solid/currency-dollar.svg'
import ChevronRightIcon from 'heroicons/solid/chevron-right.svg'

export async function getStaticProps() {
  return {
    props: {
      jobs: await allJobs(),
    },
  }
}

function JobCard({ job: { metadata } }) {
  return (
    <div className="block rounded-lg shadow-sm">
      <div className="flex justify-between items-center rounded-lg px-6 py-4 shadow-xs bg-white">
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg leading-7 font-semibold text-teal-700">{metadata.title}</h3>
            <p className="text-gray-500">{metadata.subtitle}</p>
          </div>
          <dl className="space-y-4 md:flex md:space-y-0 md:space-x-6">
            <div>
              <dt className="sr-only">Employment type</dt>
              <dl className="flex items-start space-x-2 text-sm leading-5">
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{metadata.jobType}</span>
              </dl>
            </div>
            <div>
              <dt className="sr-only">Location</dt>
              <dl className="flex items-start space-x-2 text-sm leading-5">
                <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{metadata.location[0]}</span>
              </dl>
            </div>
            <div>
              <dt className="sr-only">Salary</dt>
              <dl className="flex items-start space-x-2 text-sm leading-5">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{metadata.salary[0]}</span>
              </dl>
            </div>
            <div>
              <dt className="sr-only">Closing date</dt>
              <dl className="flex items-start space-x-2 text-sm leading-5">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">
                  <span aria-hidden>{metadata.status === 'open' ? 'Closes' : 'Closed'} on</span>{' '}
                  <time dateTime={metadata.closes}>
                    {format(new Date(metadata.closes), 'MMM d, y')}
                  </time>
                </span>
              </dl>
            </div>
          </dl>
        </div>
        <div className="hidden md:block">
          <ChevronRightIcon className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default function JobPosting({ jobs }) {
  const openJobs = jobs.filter((j) => j.metadata.status === 'open')
  const closedJobs = jobs.filter((j) => j.metadata.status === 'closed')

  return (
    <Layout>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tailwindcss" />
        <meta name="twitter:title" content="Tailwind Labs Jobs" />
        <meta
          name="twitter:description"
          content="Help us build the future of Tailwind CSS and Tailwind UI."
        />
        <meta name="twitter:image" content="https://jobs.tailwindui.com/social.png" />
        <meta name="twitter:creator" content="@tailwindcss" />
        <meta property="og:url" content="https://jobs.tailwindui.com/" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Tailwind Labs Jobs" />
        <meta
          property="og:description"
          content="Help us build the future of Tailwind CSS and Tailwind UI."
        />
        <meta property="og:image" content="https://jobs.tailwindui.com/social.png" />
        <title>Tailwind Labs Jobs</title>
      </Head>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Header />
      </div>
      <div className="bg-gray-50">
        <main className="max-w-6xl mx-auto px-6">
          <div className="py-8 space-y-8">
            <h1 className="text-3xl leading-9 font-bold text-gray-900">Job Postings</h1>
            {openJobs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg leading-6 font-semibold text-gray-900">Open</h2>
                <div>
                  <ul className="space-y-4">
                    {openJobs.map((job) => {
                      return (
                        <li key={job.path}>
                          <Link href="/[job]" as={`/${job.path}`}>
                            <a>
                              <JobCard job={job} />
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <h2 className="text-lg leading-6 font-semibold text-gray-900">Closed</h2>
              <div>
                <ul className="space-y-4">
                  {closedJobs.map((job) => {
                    return (
                      <li key={job.path}>
                        <Link href="/[job]" as={`/${job.path}`}>
                          <a>
                            <JobCard job={job} />
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
