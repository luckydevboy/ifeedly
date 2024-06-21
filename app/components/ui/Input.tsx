import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, className, ...props }: Props) => {
  return (
    <div className={className}>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-davysGray mb-2"
      >
        {label}
      </label>
      <input
        {...props}
        className="w-full outline-none rounded-lg border-0 px-4 py-2 text-davysGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-davysGray focus:ring-2 focus:ring-inset focus:ring-cornflowerBlue sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default Input;
