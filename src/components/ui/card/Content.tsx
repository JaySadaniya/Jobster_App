import { FC, ReactNode } from 'react'

const Content: FC<{children: ReactNode}> = ({ children }) => {
  return <>{children}</>
}
Content.displayName = 'Content'

export default Content
export { Content }
