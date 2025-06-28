import { useRef } from "react";

type OTPInputProps = {
  digits: string[];
  setDigits: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
};

const OTP_LENGTH = 4;

const OTPInput = ({ digits, setDigits, error }: OTPInputProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    if (index >= 0 && index < OTP_LENGTH) {
      refs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // allow only digits

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1) || "";

    setDigits(newDigits);

    if (value.length === 1 && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(paste)) return;

    const pasteDigits = paste.split("");
    setDigits(pasteDigits);
    focusInput(pasteDigits.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pasteDigits.length);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-3 max-w-[356px]">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el:any) => (refs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`w-[80px] h-[80px] text-center text-[48px] border-2 rounded-[8px] focus:outline-none focus:ring-2 ${
              error ? "border-red-500 ring-red-500" : "border-secondary ring-secondary"
            }`}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            aria-label={`OTP digit ${i + 1}`}
            autoComplete="one-time-code"
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default OTPInput;
