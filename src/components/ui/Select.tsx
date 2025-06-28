import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, Info } from "lucide-react";
import { twMerge } from "tailwind-merge";

type Option = {
  label: string;
  value: string | number;
};

type SelectMenuProps = {
  label?: string;
  name?: string;
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  optionClassNames?: string;
  [key: string]: any;
};

const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  className,
  optionClassNames,
  error,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (val: string | number) => {
    onChange(val);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelect(options[highlightedIndex].value);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [isOpen, highlightedIndex, options]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={'w-full relative mb-4'} ref={menuRef}>
      {label && (
        <label
          htmlFor={name}
          className="block font-heading text-[14px] font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
          
          <Info size={12} className="absolute right-0 top-2" />
        </label>
      )}
      <button
        type="button"
        id={name}
        name={name}
        className={twMerge(`w-full border rounded px-3 py-2 text-left bg-white focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary focus:border-primary ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-primary"
        } flex justify-between items-center`, className)}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={buttonRef}
        {...rest}
      >
        <span className={selectedLabel ? "text-black" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute font-body z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className={twMerge(`px-4 py-2 cursor-pointer hover:bg-accent/5 flex justify-between items-center`, optionClassNames)}
              onClick={() => handleSelect(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
              {value === option.value && <Check className="h-4 w-4 text-accent" />}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <small className="text-red-500 text-[10px] absolute -bottom-3 left-0">
          {error}
        </small>
      )}
    </div>
  );
};

export default SelectMenu;
