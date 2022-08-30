import { forwardRef, InputHTMLAttributes, LegacyRef } from "react";
import { ForwardRefExoticComponent } from "react";
import { getClasses } from "../../../utils/general";
import { IModifyClass } from "../../types/IModifyClass";

export type ITextArea = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
} & IModifyClass;

const TextArea: ForwardRefExoticComponent<ITextArea> = forwardRef(
  (
    { className, appendClass, removeClass, label, type, name, error, ...props },
    ref
  ) => {
    const defaultClass =
      "shadow-sm focus:ring-brand-500 focus:border-brand-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md";

    const classes = getClasses(
      className || defaultClass,
      appendClass || "",
      removeClass || ""
    );
    const id = props.id || name;

    return (
      <>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          name={name}
          className={className ? className : classes}
          rows={3}
          ref={ref as LegacyRef<HTMLTextAreaElement> | undefined}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </>
    );
  }
);

export default TextArea;
