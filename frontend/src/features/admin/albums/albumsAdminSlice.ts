import { GlobalError, IAlbum, ValidationError } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store.ts";
import {
  deleteAdminAlbum,
  editAdminPublishAlbum,
  fetchAdminAllAlbums,
} from "./albumsAdminThunks.ts";

interface AlbumsState {
  items: IAlbum[];
  fetchLoading: boolean;
  fetchError: ValidationError | null;

  deleteLoading: boolean;
  deleteError: GlobalError | null | ValidationError;

  editPublishLoading: boolean;
  editPublishError: GlobalError | null | ValidationError;
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,

  deleteLoading: false,
  deleteError: null,

  editPublishLoading: false,
  editPublishError: null,
};

export const selectAdminAlbums = (state: RootState) => state.adminAlbums.items;
export const selectAdminAlbumsFetchLoading = (state: RootState) =>
  state.adminAlbums.fetchLoading;

export const selectAdminAlbumDeleteLoading = (state: RootState) =>
  state.adminAlbums.deleteLoading;
export const selectAdminAlbumDeleteError = (state: RootState) =>
  state.adminAlbums.deleteError;

export const selectAdminAlbumTogglePublishLoading = (state: RootState) =>
  state.adminAlbums.editPublishLoading;
export const selectAdminAlbumTogglePublishError = (state: RootState) =>
  state.adminAlbums.editPublishError;

const adminAlbumsSlice = createSlice({
  name: "adminAlbums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAllAlbums.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchAdminAllAlbums.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAdminAllAlbums.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.fetchError = error || null;
      })

      .addCase(deleteAdminAlbum.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteAdminAlbum.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAdminAlbum.rejected, (state, { payload: error }) => {
        state.deleteLoading = false;
        state.deleteError = error || null;
      })

      .addCase(editAdminPublishAlbum.pending, (state) => {
        state.editPublishLoading = true;
        state.editPublishError = null;
      })
      .addCase(editAdminPublishAlbum.fulfilled, (state) => {
        state.editPublishLoading = false;
      })
      .addCase(editAdminPublishAlbum.rejected, (state, { payload: error }) => {
        state.editPublishLoading = false;
        state.editPublishError = error || null;
      });
  },
});

export const adminAlbumsReducer = adminAlbumsSlice.reducer;
