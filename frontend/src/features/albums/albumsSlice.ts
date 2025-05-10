import { GlobalError, IAlbum, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createAlbum,
  deleteAlbum,
  fetchAlbumById,
  fetchAllAlbums,
} from "./albumsThunks.ts";
import { RootState } from "../../app/store.ts";

interface AlbumsState {
  items: IAlbum[];
  album: IAlbum | null;

  fetchLoading: boolean;
  error: ValidationError | null;

  createLoading: boolean;
  createError: ValidationError | GlobalError | null;

  deleteLoading: boolean;
  deleteError: GlobalError | null;
}

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) =>
  state.albums.fetchLoading;

export const selectOneAlbum = (state: RootState) => state.albums.album;
export const selectAlbumsError = (state: RootState) => state.albums.error;

export const selectAlbumCreateLoading = (state: RootState) =>
  state.albums.createLoading;
export const selectAlbumCreateError = (state: RootState) =>
  state.albums.createError;

export const selectAlbumDeleteLoading = (state: RootState) =>
  state.albums.deleteLoading;
export const selectAlbumDeleteError = (state: RootState) =>
  state.albums.deleteError;

const initialState: AlbumsState = {
  items: [],
  album: null,

  fetchLoading: false,
  error: null,

  createLoading: false,
  createError: null,

  deleteLoading: false,
  deleteError: null,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAlbums.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchAllAlbums.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllAlbums.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      })

      .addCase(fetchAlbumById.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchAlbumById.fulfilled, (state, { payload: album }) => {
        state.fetchLoading = false;
        state.album = album;
      })
      .addCase(fetchAlbumById.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.error = error || null;
      })

      .addCase(createAlbum.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      })

      .addCase(deleteAlbum.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state, { payload: error }) => {
        state.deleteLoading = false;
        state.deleteError = error || null;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
