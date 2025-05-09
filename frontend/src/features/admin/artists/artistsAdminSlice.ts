import { GlobalError, IArtist, ValidationError } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAdminArtist,
  editAdminPublishArtist,
  fetchAdminAllArtists,
} from "./artistsAdminThunks.ts";
import { RootState } from "../../../app/store.ts";

interface ArtistsState {
  items: IArtist[];
  fetchLoading: boolean;
  fetchError: ValidationError | null;

  deleteLoading: boolean | string;
  deleteError: GlobalError | null | ValidationError;

  editPublishLoading: boolean | string;
  editPublishError: GlobalError | null | ValidationError;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,

  deleteLoading: false,
  deleteError: null,

  editPublishLoading: false,
  editPublishError: null,
};

export const selectAdminArtists = (state: RootState) => state.adminArtist.items;
export const selectAdminFetchLoading = (state: RootState) =>
  state.adminArtist.fetchLoading;

export const selectAdminDeleteLoading = (state: RootState) =>
  state.adminArtist.deleteLoading;
export const selectAdminDeleteError = (state: RootState) =>
  state.adminArtist.deleteError;

export const selectAdminTogglePublishLoading = (state: RootState) =>
  state.adminArtist.editPublishLoading;
export const selectAdminTogglePublishError = (state: RootState) =>
  state.adminArtist.editPublishError;

const adminArtistsSlice = createSlice({
  name: "adminArtists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAllArtists.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchAdminAllArtists.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAdminAllArtists.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.fetchError = error || null;
      })

      .addCase(deleteAdminArtist.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteAdminArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAdminArtist.rejected, (state, { payload: error }) => {
        state.deleteLoading = false;
        state.deleteError = error || null;
      })

      .addCase(editAdminPublishArtist.pending, (state) => {
        state.editPublishLoading = true;
        state.editPublishError = null;
      })
      .addCase(editAdminPublishArtist.fulfilled, (state) => {
        state.editPublishLoading = false;
      })
      .addCase(editAdminPublishArtist.rejected, (state, { payload: error }) => {
        state.editPublishLoading = false;
        state.editPublishError = error || null;
      });
  },
});

export const adminArtistsReducer = adminArtistsSlice.reducer;
