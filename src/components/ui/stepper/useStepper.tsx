import { useCallback } from 'react'
import { IUseStepper } from './types'

const useStepper = ({ steps, stepIndex, setStepIndex }: IUseStepper) => {
  const next = useCallback(() => {
    const nextStep = stepIndex + 1
    if (nextStep < steps.length && setStepIndex) setStepIndex(nextStep)
  }, [stepIndex, steps, setStepIndex])

  const previous = useCallback(() => {
    const previousStep = stepIndex - 1
    if (previousStep >= 0 && setStepIndex) setStepIndex(previousStep)
  }, [stepIndex, setStepIndex])

  const hasPrevious = useCallback(() => stepIndex - 1 >= 0, [stepIndex])

  const hasNext = useCallback(() => stepIndex + 1 < steps.length, [stepIndex, steps.length])

  return { hasNext, hasPrevious, next, previous }
}

export default useStepper
