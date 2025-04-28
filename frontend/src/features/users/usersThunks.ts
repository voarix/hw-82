import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterMutation, User, ValidationError } from "../../types";
import { isAxiosError } from "axios";
import AxiosApi from "../../axiosApi.ts";

export interface RegisterAndLoginResponse {
  user: User;
  message: string;
}

export const register = createAsyncThunk<
  RegisterAndLoginResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>("users/register", async (registerForm, { rejectWithValue }) => {
  try {
    const response = await AxiosApi.post<RegisterAndLoginResponse>(
      "/users",
      registerForm,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
