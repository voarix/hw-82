import { GlobalError, IArtist, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createArtist,
  deleteArtist,
  fetchAllArtists,
} from "./artistsThunks.ts";
import { RootState } from "../../app/store.ts";

interface ArtistsState {
  items: IArtist[];
  fetchLoading: boolean;
  error: ValidationError | null;

  createLoading: boolean;
  createError: GlobalError | null | ValidationError;

  deleteLoading: boolean;
  deleteError: GlobalError | null;
}

export const selectArtists = (state: RootState) => state.artists.items;
export const selectFetchLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectArtistsFetchError = (state: RootState) =>
  state.artists.error;

export const selectCreateLoading = (state: RootState) =>
  state.artists.createLoading;
export const selectCreateError = (state: RootState) =>
  state.artists.createError;

export const selectDeleteLoading = (state: RootState) =>
  state.artists.deleteLoading;
export const selectDeleteError = (state: RootState) =>
  state.artists.deleteError;

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  error: null,

  createLoading: false,
  createError: null,

  deleteLoading: false,
  deleteError: null,
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
      })

      .addCase(deleteArtist.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteArtist.rejected, (state, { payload: error }) => {
        state.deleteLoading = false;
        state.deleteError = error || null;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
