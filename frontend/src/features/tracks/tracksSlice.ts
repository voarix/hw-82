import { GlobalError, ITrack, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { createTrack, fetchTracksByAlbum } from "./tracksThunks.ts";

interface TracksState {
  items: ITrack[];
  fetchLoading: boolean;
  error: ValidationError | null;

  createLoading: boolean;
  createError: ValidationError | GlobalError | null;
}

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchLoading;
export const selectTracksError = (state: RootState) => state.tracks.error;

export const selectTrackCreateLoading = (state: RootState) =>
  state.tracks.createLoading;
export const selectTrackCreateError = (state: RootState) =>
  state.tracks.createError;

const initialState: TracksState = {
  items: [],
  fetchLoading: false,
  error: null,

  createLoading: false,
  createError: null,
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksByAlbum.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchTracksByAlbum.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchTracksByAlbum.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      })

      .addCase(createTrack.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
