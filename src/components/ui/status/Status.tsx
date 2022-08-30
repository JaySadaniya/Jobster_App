import { FC } from 'react'
import Icon from '../icon/Icon'
import { ReactComponent as CircleIcon } from '../../../icons/circle.svg'
import cx from 'classnames'

type IStatus = { status: string }

const Status: FC<IStatus> = ({ status }) => {
  const styles = {
    'text-emarald-500': status === 'start',
    'text-red-500': status === 'stop',
    'text-gray-500': !['start', 'stop'].includes(status),
  }

  return (
    <Icon className={cx(styles, `fill-current h-3 w-3`)}>
      <CircleIcon title={(status || '').toUpperCase()} />
    </Icon>
  )
}

export default Status
