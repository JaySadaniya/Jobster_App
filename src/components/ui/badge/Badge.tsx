import { FC, ReactNode } from 'react'
import cx from 'classnames'

export enum BadgeType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
}

type IBadge = { type: string, children: ReactNode }

const Badge: FC<IBadge> = ({ type, children }) => {
  const styles = {
    'bg-100': {
      'bg-blue-100': type === BadgeType.Info,
      'bg-yellow-100': type === BadgeType.Warning,
      'bg-green-100': type === BadgeType.Success,
      'bg-red-100': type === BadgeType.Error,
      'bg-gray-100': type === BadgeType.Debug,
    },
    'text-800': {
      'text-blue-800': type === BadgeType.Info,
      'text-yellow-800': type === BadgeType.Warning,
      'text-green-800': type === BadgeType.Success,
      'text-red-800': type === BadgeType.Error,
      'text-gray-800': type === BadgeType.Debug,
    },
  }

  return (
    <span
      className={cx(
        styles['bg-100'],
        styles['text-800'],
        'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium mt-2'
      )}
    >
      {children}
    </span>
  )
}

export default Badge
