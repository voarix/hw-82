import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack, ValidationError } from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";

export const fetchTracksByAlbum = createAsyncThunk<
  ITrack[],
  string,
  { rejectValue: ValidationError }
>("tracks/fetchTracksByAlbum", async (albumId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`);
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
