import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAlbum, ValidationError } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";

export const fetchAlbumsByArtist = createAsyncThunk<
  IAlbum[],
  string,
  { rejectValue: ValidationError }
>("artists/fetchAll", async (artistId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${artistId}`);
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
