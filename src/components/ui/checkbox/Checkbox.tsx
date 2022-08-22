import { FC, InputHTMLAttributes } from 'react'
import Input from '../input/Input'

type ICheckbox = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Checkbox: FC<ICheckbox> = ({ label, ...props }) => {
  return (
    <>
      <Input
        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-secondary-300 rounded"
        type="checkbox"
        {...props}
      />
      {label && (
        <label htmlFor={props.id || props.name || ''} className="ml-2 block text-sm text-secondary-900">
          {label}
        </label>
      )}
    </>
  )
}

export default Checkbox
