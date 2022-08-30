import { FC } from 'react'
import { getClasses } from '../../../utils/general'

type IImage = {
  url: string
  alt?: string
  className?: string
  appendClass?: string
  removeClass?: string
}

const Image: FC<IImage> = ({ url, alt, className, appendClass, removeClass }) => {
  const defaultClass = 'h-40 w-40 bg-transparent bg-center'

  const classes = getClasses(className || defaultClass, appendClass || '', removeClass || '')

  return <img draggable={false} src={url} alt={alt || ''} className={classes} />
}

export default Image
