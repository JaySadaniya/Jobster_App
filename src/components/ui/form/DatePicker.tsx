import { FC } from "react";
import { Controller } from "react-hook-form";

import DatePicker, { DatePickerProps } from "../date-picker/DatePicker";

export interface DatePickerControlProps
  extends Omit<DatePickerProps, "onChange"> {
  name: string;
  control: any;
  label: string;
}

const DatePickerControl: FC<DatePickerControlProps> = ({
  name,
  control,
  label,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <DatePicker
          name={name}
          label={label}
          value={value}
          onBlur={onBlur}
          selected={value}
          onChange={onChange}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
};

export default DatePickerControl;
