import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Check, Info } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useCountries, type Option } from "../../utilities/fetchCountries";
import IMask from "imask";

type PhoneInputProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  defaultCountryCode?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  name,
  value,
  onChange,
  defaultCountryCode = "+355",
  error,
  required = false,
  className,
}) => {
  const { countries, loading } = useCountries();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [maskedValue, setMaskedValue] = useState(defaultCountryCode);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("")
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maskPattern = "{000000000}";

  const applyMask = (val: string) => {
    const masked = IMask.createMask({ mask: maskPattern });
    masked.resolve(val.replace(/\D/g, ""));
    return masked.value;
  };

  // Initialize selected country
  useEffect(() => {
    if (!loading) {
      const country =
        countries.find((c) => c.value === defaultCountryCode) ||
        countries[0] ||
        null;
      setSelectedCountry(country);
    }
  }, [loading, countries, defaultCountryCode]);

  useEffect(() => {
    if (!selectedCountry) return;

    if (value.startsWith(selectedCountry.value)) {
      const stripped = value.replace(selectedCountry.value, "");
      setMaskedValue(applyMask(stripped));
    } else {
      setMaskedValue(applyMask(value));
    }
  }, [value, selectedCountry]);

  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountryCode(defaultCountryCode)
    } else {
      setSelectedCountryCode(selectedCountry.value);
    }
  }, [defaultCountryCode, selectedCountry]);

  const updatePhone = useCallback(
    (raw: string) => {
      const cleanDigits = raw.replace(/\D/g, "");
      const masked = applyMask(cleanDigits);
      setMaskedValue(masked);
      if (selectedCountry) {
        onChange(selectedCountry.value + cleanDigits);
      } else {
        onChange(cleanDigits);
      }
    },
    [selectedCountry, onChange]
  );

  const handleCountrySelect = (option: Option) => {
    setSelectedCountry(option);
    setIsOpen(false);
    onChange(option.value + maskedValue.replace(/\D/g, ""));
  };

  // Search and filtered country list
  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const containerClasses = twMerge("w-full relative mb-4 z-5", className);
  const inputClasses = twMerge(
    "w-full bg-white text-[16px] font-body border rounded px-3 py-2 focus:outline-none ring-offset-2 focus:ring-2 focus:ring-primary focus:border-primary",
    error
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "border-gray-200"
  );

  return (
    <div className={containerClasses} ref={menuRef}>
      {label && (
        <label
          htmlFor={name}
          className="block font-heading text-[14px] font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
          
          <Info size={12} className="absolute right-0 top-2" />
        </label>
      )}
      <div className="flex items-center gap-2 relative">
        <button
          type="button"
          className="w-[70px] h-[42px] absolute flex items-center justify-between gap-1  px-2 py-1 z-10"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img height={24} width={24} src={selectedCountry?.flag} alt={selectedCountry?.flag + ' selected'} className="rounded" />
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <span className="absolute pl-[70px] w-[50px]">({selectedCountryCode})</span>
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          placeholder={"_____"}
          className={`${inputClasses} pl-[130px]`}
          value={maskedValue}
          onChange={(e) => updatePhone(e.target.value)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>

      {isOpen && (
        <div className="absolute flex flex-col z-10 mt-2 w-[300px] max-h-64 overflow-y-auto border border-gray-200 bg-white shadow-md rounded">
          <div className="p-2">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="flex-grow overflow-auto">
            {filteredCountries.map((country) => (
              <li
                key={country.flag}
                onClick={() => handleCountrySelect(country)}
                className="px-4 py-2 cursor-pointer hover:bg-accent/10 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img height={18} width={18} src={country.flag} alt={country.value} />
                  <span>{country.label}</span>
                </div>
                {selectedCountry?.value === country.value && (
                  <Check className="h-4 w-4 text-accent" />
                )}
              </li>
            ))}
            {!filteredCountries.length && <li
                className="px-4 py-2 text-sm text-gray-600"
              >
                No country found for "{search}"
              </li>}
          </ul>
        </div>
      )}

      {error && (
        <small
          id={`${name}-error`}
          className="text-red-500 text-[10px] absolute -bottom-3 left-0"
        >
          {error}
        </small>
      )}
    </div>
  );
};

export default PhoneInput;
