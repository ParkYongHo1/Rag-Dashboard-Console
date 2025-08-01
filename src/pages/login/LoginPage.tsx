import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "@/stores/companyStore";
import axios from "axios";
import { authService } from "@/services/auth/api";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

interface FormData {
  companyId: string;
}

const LoginPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const login = useCompanyStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      companyId: "",
    },
  });

  const idValue = watch("companyId");

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const companyInfo = {
        company: response.company,
        tableNamesList: response.tableNamesList,
      };

      const tokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        accessTokenExpiresAt: response.accessTokenExpiresAt,
      };

      login(companyInfo, tokens);
      console.log(response);

      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          alert("일치하는 기업 정보가 없습니다.");
        } else if (status === 500) {
          alert("서버 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        } else {
          alert("로그인 중 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        }
      } else {
        alert("예상치 못한 오류가 발생했습니다.");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  const handleGuestLogin = () => {
    setValue("companyId", "test_id");
    mutate({ companyId: "test_id" });
  };
  if (isPending)
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="로그인중입니다...."
      />
    );

  return (
    <div className="min-h-[85vh] flex items-center bg-white justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-md">
        <div className="p-10 rounded-[5px] border border-gray-100 shadow-lg space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">로그인</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative">
              <input
                id="companyId"
                type="text"
                {...register("companyId", {
                  required: "회사 아이디를 입력해주세요",
                })}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isPending}
                className={`w-full px-6 py-4 pt-5 text-sm bg-white/5 backdrop-blur-sm border-2 ${
                  errors.companyId
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-gray-500/30 focus:border-gray-200"
                } rounded-[5px] text-sm focus:outline-none focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <label
                htmlFor="companyId"
                className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                  isFocused || idValue
                    ? "top-0 -translate-y-1/2 text-sm text-gray-500 bg-white z-10 px-2 rounded"
                    : "top-5 text-sm text-gray-400"
                }`}
              >
                로그인 ID
              </label>
              {errors.companyId && (
                <p className="text-red-300 mt-2 text-sm font-medium">
                  {errors.companyId.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 text-lg rounded-[5px] text-white font-semibold transition-all duration-300 transform ${
                isValid && !isPending
                  ? "bg-black hover:bg-gray-900 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-60"
              }`}
              disabled={!isValid || isPending}
            >
              로그인
            </button>
          </form>

          <div className="flex items-center justify-end space-x-4 pt-4 text-sm font-bold">
            <button
              onClick={handleGuestLogin}
              disabled={isPending}
              className="hover:underline cursor-pointer text-gray-400 hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              게스트 계정으로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
