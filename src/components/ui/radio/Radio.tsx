import { ChangeEvent, FC } from 'react'

export type IRadio = { id: string; title: string }

type RadioProps = {
  name: string
  label?: string
  error?: string
  value?: string
  radios: IRadio[]
  onChange: (value: string) => void
}

const Radio: FC<RadioProps> = ({ value, radios, label, error, name, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value)
  }

  return (
    <>
      <div>
        {label && <label className="text-sm font-medium text-gray-900">{label}</label>}
        <fieldset className="mt-1">
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {radios.map((radio) => (
              <div key={radio.id} className="flex items-center">
                <input
                  name={name}
                  type="radio"
                  id={radio.id}
                  value={radio.id}
                  onChange={handleChange}
                  defaultChecked={value === radio.id}
                  className="focus:ring-indigo-500 h-4 w-4 text-brand-600 border-gray-300 cursor-pointer"
                />
                <label htmlFor={radio.id} className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                  {radio.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    </>
  )
}

export default Radio
