import { FC } from 'react'
import { Controller } from 'react-hook-form'

import Radio, { IRadio } from '../radio/Radio'

type IRadioControl = {
  control: any
  name: string
  label?: string
  radios: IRadio[]
}

const RadioControl: FC<IRadioControl> = ({ name, label, radios, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <>
            <Radio
              name={name}
              radios={radios}
              onChange={(value: string) => onChange(value)}
              label={label}
              value={value}
              {...props}
              error={error?.message}
            />
          </>
        )
      }}
    />
  )
}

export default RadioControl
