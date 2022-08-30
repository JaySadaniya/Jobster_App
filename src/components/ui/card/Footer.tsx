import { FC, ReactNode } from 'react'

const Footer: FC<{ children: ReactNode}> = ({ children }) => {
  return <>{children}</>
}
Footer.displayName = 'Footer'

export default Footer
export { Footer }
