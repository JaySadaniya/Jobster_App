import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

export interface DatePickerProps extends ReactDatePickerProps {
  label?: string;
  error?: string | null;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  error,
  label,
  ...props
}) => {
  const id = props.id || name;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <ReactDatePicker id={id} name={name} {...props} />

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default DatePicker;
