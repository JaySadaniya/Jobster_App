import { FC } from 'react'
import Button from '../button/Button'
import { useStepContext } from './Step'
import useStepper from './useStepper'

export type IStepFooter = {
  isDisabled?: boolean
  isLoading?: boolean
  onPreviousClick?: () => void
  onSaveClick?: () => void
}

const StepFooter: FC<IStepFooter> = ({ isDisabled, isLoading, onPreviousClick, onSaveClick }) => {
  const { steps, stepIndex, setStepIndex } = useStepContext()
  const { hasPrevious, hasNext } = useStepper({ steps, stepIndex, setStepIndex })

  return (
    <div className="flex justify-end gap-x-2">
      {hasPrevious() && <Button onClick={onPreviousClick}>Previous</Button>}
      {(hasNext() || stepIndex === steps.length - 1) && (
        <Button type="submit" onClick={onSaveClick} isLoading={isLoading} disabled={isDisabled}>
          {hasNext() ? 'Next' : 'Save'}
        </Button>
      )}
    </div>
  )
}

export default StepFooter
