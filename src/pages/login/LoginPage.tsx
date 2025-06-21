import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  id: string;
};

const LoginPage = () => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
  });

  const idValue = watch("id");

  const onSubmit = (data: FormData) => {
    console.log("로그인 시도:", data);
  };

  return (
    <div className="min-h-[85vh] flex items-center bg-white justify-center px-4 relative">
      {/* Login form */}
      <div className="relative z-10 w-full max-w-md">
        <div className=" p-10 rounded-[5px] border border-gray-100 shadow-lg space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">로그인</h1>
          </div>

          <div className="relative ">
            <input
              id="id"
              type="text"
              {...register("id", {
                required: "회사 아이디를 입력해주세요",
              })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full px-6 py-4 pt-5 text-sm bg-white/5 backdrop-blur-sm border-2 ${
                errors.id
                  ? "border-red-400/60 focus:border-red-400"
                  : "border-gray-500/30 focus:border-gray-200"
              } rounded-[5px] text-sm focus:outline-none focus:ring-0 transition-all duration-300`}
            />
            <label
              htmlFor="id"
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                isFocused || idValue
                  ? "top-0 -translate-y-1/2 text-sm text-gray-500 bg-white z-10 px-2 rounded"
                  : "top-5 text-sm text-gray-400"
              }`}
            >
              로그인 ID
            </label>
            {errors.id && (
              <p className="text-red-300 mt-2 text-sm font-medium">
                {errors.id.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={`w-full py-3 text-lg rounded-[5px] text-white font-semibold transition-all duration-300 transform ${
              isValid
                ? "bg-black hover:bg-gray-900 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:cursor-pointer"
                : "bg-gray-400 cursor-not-allowed opacity-60"
            }`}
            disabled={!isValid}
          >
            로그인
          </button>

          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-500/50"></div>
            <div className="w-2 h-2 bg-gray-400/60 rounded-full"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-500/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
