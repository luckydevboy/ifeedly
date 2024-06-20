import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const button = cva(
  "relative flex items-center justify-center gap-x-2 transition-colors",
  {
    variants: {
      variant: {
        outlined: "",
        contained: "",
      },
      circular: {
        true: "rounded-full",
        false: "rounded-lg",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        danger: "",
      },
      size: {
        small: "",
        medium: "",
        large: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        class:
          "bg-cornflowerBlue disabled:bg-cornflowerBlue/30 text-white hover:bg-cornflowerBlue/90",
      },
      {
        circular: true,
        size: "medium",
        class: "p-2",
      },
      {
        circular: false,
        size: "medium",
        class: "py-2 px-4",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "medium",
      circular: false,
    },
  },
);

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof button> {
  isLoading?: boolean;
}

const Button = ({
  children,
  className,
  isLoading,
  variant,
  color,
  size,
  circular,
  ...props
}: Props) => {
  return (
    <button
      className={button({ variant, color, className, size, circular })}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
