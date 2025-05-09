import { GlobalError, IArtist, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createArtist, fetchAllArtists } from "./artistsThunks.ts";
import { RootState } from "../../app/store.ts";

interface ArtistsState {
  items: IArtist[];
  fetchLoading: boolean;
  error: ValidationError | null;

  createLoading: boolean;
  createError: GlobalError | null | ValidationError;
}

export const selectArtists = (state: RootState) => state.artists.items;
export const selectFetchLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectError = (state: RootState) => state.artists.error;

export const selectUserCreateLoading = (state: RootState) =>
  state.artists.createLoading;
export const selectUserCreateError = (state: RootState) =>
  state.artists.createError;

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  error: null,

  createLoading: false,
  createError: null,
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
      })

      .addCase(createArtist.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
