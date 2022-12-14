import { CheckIcon } from '@heroicons/react/solid'
import { FC, MouseEvent } from 'react'
import { classNames } from '../../../utils/general'
import { useStepContext } from './Step'

type IStepper = {
  onClick?: (stepIndex: number, e: MouseEvent<HTMLAnchorElement>) => {}
}

const Stepper: FC<IStepper> = ({ onClick }) => {
  const { stepIndex, steps } = useStepContext()

  const handleClick = (stepIndex: number, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) onClick(stepIndex, e)
  }

  const stepComplete = (index: number, stepIndex: number) => {
    return index < stepIndex
  }

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {steps.map((step, index) => (
          <li key={step.name} className={classNames(index !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
            {stepComplete(index, stepIndex) ? (
              <>
                {index !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-brand-600" aria-hidden="true" />
                ) : null}
                <a href="#/" onClick={(e) => handleClick(index, e)} className="relative flex items-start group">
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-brand-600 rounded-full group-hover:bg-brand-800">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            ) : index === stepIndex ? (
              <>
                {index !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                ) : null}
                <a
                  href="#/"
                  onClick={(e) => handleClick(index, e)}
                  className="relative flex items-start group"
                  aria-current="step"
                >
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-brand-600 rounded-full">
                      <span className="h-2.5 w-2.5 bg-brand-600 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-brand-600">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {index !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                ) : null}
                <a href="#/" onClick={(e) => handleClick(index, e)} className="relative flex items-start group">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Stepper
