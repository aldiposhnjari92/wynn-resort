import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

type ButtonProps = {
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  text?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  icon: Icon,
  iconPosition = "left",
  text,
  children,
  type = "button",
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-[4px] uppercase cursor-pointer text-[16px] text-body tracking-[6%] leading-[24px] transition disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      <span>{children ?? text}</span>
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;
