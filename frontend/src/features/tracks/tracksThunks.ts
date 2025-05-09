import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  ITrack,
  TrackMutation,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

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

export const createTrack = createAsyncThunk<
  ITrack,
  TrackMutation,
  { rejectValue: ValidationError | GlobalError; state: RootState }
>("tracks/createTrack", async (trackData, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const response = await axiosApi.post<ITrack>("/tracks", trackData, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data);
      }
    }
    throw error;
  }
});
