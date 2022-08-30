import { FC, useEffect, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { classNames } from "../../../utils/general";

export type IOption = { id: number | string; name: string };
export type ISelect = {
  options: IOption[];
  value?: number | string;
  onSelect?: (option: IOption | undefined) => void;
  label?: string;
  error?: string;
  optionHeight?: string;
};

const Select: FC<ISelect> = ({
  options,
  value,
  onSelect,
  label,
  error,
  optionHeight,
}) => {
  const [selected, setSelected] = useState<IOption | undefined>();

  useEffect(() => {
    const option = options.filter((option) => option.id === value)[0];
    setSelected(option);
  }, [value, options]);

  const handleChange = (value: IOption | undefined) => {
    setSelected(value);
    if (onSelect) onSelect(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <div className="flex flex-col w-full">
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-3 text-lg">
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <Listbox.Button className="bg-brand-50 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm disabled:cursor-not-allowed">
              <span className="block truncate">{selected?.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm ${
                  optionHeight ? optionHeight : "max-h-60"
                }`}
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-brand-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-brand-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>
        </div>
      )}
    </Listbox>
  );
};
export default Select;
