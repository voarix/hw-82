import { IArtist, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllArtists } from "./artistsThunks.ts";
import { RootState } from "../../app/store.ts";

interface ArtistsState {
  items: IArtist[];
  fetchLoading: boolean;
  error: ValidationError | null;
}

export const selectArtists = (state: RootState) => state.artists.items;
export const selectFetchLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectError = (state: RootState) => state.artists.error;

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  error: null,
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArtists.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchAllArtists.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllArtists.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
