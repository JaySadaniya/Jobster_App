import { FC, ReactElement, ReactNode } from 'react'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { ExclamationIcon } from '@heroicons/react/solid'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { XCircleIcon } from '@heroicons/react/solid'
import cx from 'classnames'

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

type IAlert = { type: AlertType; icon?: ReactElement, children: ReactNode }

const Alert: FC<IAlert> = ({ type, icon, children }) => {
  let iconElement = <></>

  if (type === AlertType.Info) {
    iconElement = <InformationCircleIcon aria-hidden="true" />
  }

  if (type === AlertType.Warning) {
    iconElement = <ExclamationIcon aria-hidden="true" />
  }

  if (type === AlertType.Success) {
    iconElement = <CheckCircleIcon aria-hidden="true" />
  }

  if (type === AlertType.Error) {
    iconElement = <XCircleIcon aria-hidden="true" />
  }

  const styles = {
    bg: {
      'bg-blue-50': type === AlertType.Info,
      'bg-yellow-50': type === AlertType.Warning,
      'bg-green-50': type === AlertType.Success,
      'bg-red-50': type === AlertType.Error,
    },
    'text-400': {
      'text-blue-400': type === AlertType.Info,
      'text-yellow-400': type === AlertType.Warning,
      'text-green-400': type === AlertType.Success,
      'text-red-400': type === AlertType.Error,
    },
    'text-700': {
      'text-blue-700': type === AlertType.Info,
      'text-yellow-700': type === AlertType.Warning,
      'text-green-700': type === AlertType.Success,
      'text-red-700': type === AlertType.Error,
    },
  }

  return (
    <div className={cx(styles.bg, 'rounded-md p-4')}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {!icon ? <div className={cx(styles['text-400'], 'h-5 w-5')}>{iconElement}</div> : icon}
        </div>
        <div className={cx(styles['text-700'], 'ml-3 flex-1 md:flex md:justify-between')}>{children}</div>
      </div>
    </div>
  )
}

export default Alert
