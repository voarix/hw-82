import { TrackHistory, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { addTrackHistory } from "./trackHistoryThunks.ts";

interface trackHistoryState {
  track: TrackHistory | null;
  isLoading: boolean;
  error: ValidationError | null;
}

const initialState: trackHistoryState = {
  track: null,
  isLoading: false,
  error: null,
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
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
