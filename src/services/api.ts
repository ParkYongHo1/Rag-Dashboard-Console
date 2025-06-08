import axios from "axios";
import { BaseResponse } from "../types/api";

export const apiService = {
  fetchTest: async (): Promise<BaseResponse> => {
    const response = await axios.get<BaseResponse>("/api/test");
    return response.data;
  },
};
