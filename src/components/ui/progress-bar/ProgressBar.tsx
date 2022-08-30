import { FC } from 'react'

type IProgressBar = {
  progress: number | string
}

const ProgressBar: FC<IProgressBar> = ({ progress }) => {
  return (
    <div className="flex flex-row items-center space-x-3">
      <div className="relative w-2/4">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-brand-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-500"
          ></div>
        </div>
      </div>
      <div>{progress}%</div>
    </div>
  )
}

export default ProgressBar
