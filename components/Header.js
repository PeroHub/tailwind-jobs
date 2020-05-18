import Link from 'next/link'
import OfficeBuildingIcon from 'heroicons/solid/office-building.svg'
import UserGroupIcon from 'heroicons/solid/user-group.svg'

export default function Header() {
  return (
    <header className="space-y-4">
      <Link href="/">
        <a className="block">
          <img className="h-6 w-auto" src="/img/tailwind-ui-logo.svg" alt="Tailwind UI" />
        </a>
      </Link>
      <dl className="flex space-x-6">
        <div>
          <dt className="sr-only">Company headquarters</dt>
          <dl className="flex items-center space-x-2 text-sm leading-5">
            <OfficeBuildingIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">
              Kitchener, ON<span className="hidden sm:inline">, Canada</span>
            </span>
          </dl>
        </div>
        <div>
          <dt className="sr-only">Company size</dt>
          <dl className="flex items-center space-x-2 text-sm leading-5">
            <UserGroupIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">3 people</span>
          </dl>
        </div>
      </dl>
      <div className="max-w-xl text-sm leading-5 text-gray-500">
        <p>
          Tailwind UI is a small team of developers and designers building tools to help other
          developers build better user interfaces.
        </p>
      </div>
    </header>
  )
}
