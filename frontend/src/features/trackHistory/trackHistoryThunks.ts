import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {
  GlobalError,
  TrackHistoryResponse,
  ValidationError,
} from "../../types";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const addTrackHistory = createAsyncThunk<
  TrackHistoryResponse,
  string,
  { rejectValue: ValidationError; state: RootState }
>(
  "trackHistory/addTrackHistory",
  async (trackId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      const response = await axiosApi.post<TrackHistoryResponse>(
        "/track_history",
        { track: trackId },
        {
          headers: {
            Authorization: token,
          },
        },
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
  },
);

export const fetchTrackHistory = createAsyncThunk<
  TrackHistoryResponse[],
  void,
  { rejectValue: GlobalError; state: RootState }
>(
  "trackHistory/fetchTrackHistory",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      const response = await axiosApi.get<TrackHistoryResponse[]>(
        "/track_history",
        {
          headers: {
            Authorization: token,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);
