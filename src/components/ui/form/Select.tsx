import { FC } from 'react'
import { Controller } from 'react-hook-form'

import Select, { IOption } from '../select/Select'

type ISelectControl = {
  control: any
  name: string
  label?: string
  options: IOption[]
  optionHeight?: string
}

const SelectControl: FC<ISelectControl> = ({ name, label, options, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <>
            <Select
              options={options}
              onSelect={(option: IOption | undefined) => {
                onChange(option?.id || null)
              }}
              value={value}
              label={label}
              {...props}
              error={error?.message}
            />
          </>
        )
      }}
    />
  )
}

export default SelectControl
