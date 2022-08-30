import { FC } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/solid'

type IBreadcrumbItem = { title: string; url?: string }
type IBreadcrumb = { items: IBreadcrumbItem[] }

const Breadcrumb: FC<IBreadcrumb> = ({ items }) => {
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          {(items || []).map((item, index) => (
            <li key={item.title}>
              <div className="flex items-center">
                {index > 0 && <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />}
                {item.url ? (
                  <Link
                    to={item.url}
                    className={cx({ 'ml-4': index > 0 }, 'text-sm font-medium text-gray-500 hover:text-gray-700')}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className={cx({ 'ml-4': index > 0 }, 'text-sm font-medium text-gray-500 hover:text-gray-700')}>
                    {item.title}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb
