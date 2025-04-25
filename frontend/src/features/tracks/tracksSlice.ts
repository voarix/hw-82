import { ITrack, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { fetchTracksByAlbum } from "./tracksThunks.ts";

interface TracksState {
  items: ITrack[];
  fetchLoading: boolean;
  error: ValidationError | null;
}

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchLoading;
export const selectTracksError = (state: RootState) => state.tracks.error;

const initialState: TracksState = {
  items: [],
  fetchLoading: false,
  error: null,
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
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
