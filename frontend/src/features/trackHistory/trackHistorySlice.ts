import {
  GlobalError,
  TrackHistory,
  TrackHistoryResponse,
  ValidationError,
} from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { addTrackHistory, fetchTrackHistory } from "./trackHistoryThunks.ts";
import { RootState } from "../../app/store.ts";

interface trackHistoryState {
  items: TrackHistoryResponse[];
  track: TrackHistory | null;
  isLoading: boolean;
  error: ValidationError | null;
  errorFetch: GlobalError | null;
}

export const selectTrackHistory = (state: RootState) =>
  state.trackHistory.items;
export const selectTrackHistoryLoading = (state: RootState) =>
  state.trackHistory.isLoading;

const initialState: trackHistoryState = {
  items: [],
  track: null,
  isLoading: false,
  error: null,
  errorFetch: null,
};

const trackHistorySlice = createSlice({
  name: "trackHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTrackHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.track = payload.trackHistory;
      })
      .addCase(addTrackHistory.rejected, (state, { payload: error }) => {
        state.isLoading = false;
        state.error = error || null;
      })

      .addCase(fetchTrackHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchTrackHistory.rejected, (state, { payload: error }) => {
        state.isLoading = false;
        state.errorFetch = error || null;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
