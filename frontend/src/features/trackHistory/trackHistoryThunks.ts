import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {
  GlobalError,
  TrackHistoryResponse,
  ValidationError,
} from "../../types";
import { isAxiosError } from "axios";

export const addTrackHistory = createAsyncThunk<
  TrackHistoryResponse,
  string,
  { rejectValue: ValidationError }
>("trackHistory/addTrackHistory", async (trackId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<TrackHistoryResponse>(
      "/track_history",
      { track: trackId },
      { withCredentials: true },
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

export const fetchTrackHistory = createAsyncThunk<
  TrackHistoryResponse[],
  void,
  { rejectValue: GlobalError }
>("trackHistory/fetchTrackHistory", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<TrackHistoryResponse[]>(
      "/track_history",
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
