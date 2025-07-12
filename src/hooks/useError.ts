import { useState, useCallback } from "react";

interface UseErrorReturn {
  error: Error | null;
  setError: (error: Error | null) => void;
  clearError: () => void;
  handleError: (error: unknown) => void;
}

export const useError = (): UseErrorReturn => {
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setError(error);
    } else {
      setError(new Error(String(error)));
    }
  }, []);

  return {
    error,
    setError,
    clearError,
    handleError,
  };
};
