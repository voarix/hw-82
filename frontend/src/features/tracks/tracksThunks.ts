import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GlobalError,
  ITrack,
  TrackMutation,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";

export const fetchTracksByAlbum = createAsyncThunk<
  ITrack[],
  string,
  { rejectValue: ValidationError }
>("tracks/fetchTracksByAlbum", async (albumId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`, {
      withCredentials: true,
    });
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
  { rejectValue: ValidationError | GlobalError }
>("tracks/createTrack", async (trackData, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<ITrack>("/tracks", trackData, {
      withCredentials: true,
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

export const deleteTrack = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("tracks/deleteTrack", async (trackId, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/tracks/${trackId}`, { withCredentials: true });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
