import { createAsyncThunk } from "@reduxjs/toolkit";
import { IArtist, ValidationError } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";

export const fetchAllArtists = createAsyncThunk<
  IArtist[],
  void,
  { rejectValue: ValidationError }
>("artists/fetchAllArtists", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IArtist[]>("/artists");
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});
