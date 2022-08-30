import { FC } from 'react'
import ActivityLoader from '../loader/ActivityLoader'

type IProgress = { progress: number; base?: number }

const Progress: FC<IProgress> = ({ progress, base = 100 }) => {
  return (
    <div className="flex items-center">
      {progress < base && (
        <div className="mr-1">
          <ActivityLoader />
        </div>
      )}
      <div>{progress}%</div>
    </div>
  )
}

export default Progress
