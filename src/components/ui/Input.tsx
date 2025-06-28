import { Info } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type FormInputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  [key: string]: any;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className,
  ...rest
}) => {
  const inputClasses = twMerge(
    "w-full bg-white text-[16px] font-body border rounded px-3 py-2 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary focus:border-primary",
    error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-200",
    className
  );

  return (
    <div className="w-full relative mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block font-heading text-[14px] font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
          <Info size={12} className="absolute right-0 top-2" />
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        {...rest}
      />
      {error && (
        <small className="text-red-500 text-[10px] absolute -bottom-4 left-0">
          {error}
        </small>
      )}
    </div>
  );
};

export default FormInput;
