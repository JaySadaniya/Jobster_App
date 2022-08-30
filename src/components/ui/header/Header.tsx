import { FC, ReactElement, ReactNode} from 'react'

type IHeader = { title: string | ReactElement, children: ReactNode };

const Header: FC<IHeader> = ({ children, title }) => {
  return (
    <div className="mt-2 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">{title}</h2>
      </div>
      <div className="mt-4 flex-shrink-0 flex self-center md:mt-0 md:ml-4">{children}</div>
    </div>
  )
}

export default Header
