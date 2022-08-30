import Icon from '../icon/Icon'
import { ReactComponent as CircleNotchIcon } from '../../../icons/circle-notch.svg'
import { IModifyClass } from '../../types/IModifyClass'
import { FC } from 'react'
import { getClasses } from '../../../utils/general'

type IActivityLoader = IModifyClass & {}

const ActivityLoader: FC<IActivityLoader> = ({ className, appendClass, removeClass }) => {
  const defaultClass = 'h-4 w-4 fill-current text-white-500 animate-spin'
  const classes = getClasses(className || defaultClass, appendClass || '', removeClass || '')

  return (
    <Icon className={classes}>
      <CircleNotchIcon />
    </Icon>
  )
}

export default ActivityLoader
