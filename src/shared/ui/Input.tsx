import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const Input = ({ register, error, ...rest }: InputProps) => {
  return (
    <>
      <div>
        <input
          {...register}
          {...rest}
          className={`w-full text-sm h-[40px] p-3 border-b  disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
          } focus:outline-none`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  );
};
