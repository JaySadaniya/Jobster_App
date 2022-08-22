import { FC } from 'react'
import { getClasses } from '../../../utils/general'
import { IModifyClass } from '../../types/IModifyClass'

type IApproximate = IModifyClass & {}

const Approximate: FC<IApproximate> = ({ className, appendClass, removeClass }) => {
  const defaultClass = 'text-9px text-gray-500 text-right relative'
  const classes = getClasses(className || defaultClass, appendClass || '', removeClass || '')

  return <div className={classes}>*Approximate</div>
}

export default Approximate
