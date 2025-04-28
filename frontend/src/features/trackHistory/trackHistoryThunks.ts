import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { TrackHistoryResponse, ValidationError } from "../../types";
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
      console.log(token);

      const response = await axiosApi.post<TrackHistoryResponse>(
        "/track_history",
        { track: trackId },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      console.log(response.data);
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
