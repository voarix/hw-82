import { GlobalError, ITrackAdmin, ValidationError } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store.ts";
import {
  deleteAdminTrack,
  editAdminPublishTrack,
  fetchAdminAllTracks,
} from "./tracksAdminThunks.ts";

interface TracksState {
  items: ITrackAdmin[];
  fetchLoading: boolean;
  fetchError: ValidationError | null;

  deleteLoading: boolean;
  deleteError: GlobalError | null | ValidationError;

  editPublishLoading: boolean;
  editPublishError: GlobalError | null | ValidationError;
}

const initialState: TracksState = {
  items: [],
  fetchLoading: false,
  fetchError: null,

  deleteLoading: false,
  deleteError: null,

  editPublishLoading: false,
  editPublishError: null,
};

export const selectAdminTracks = (state: RootState) => state.adminTracks.items;
export const selectAdminTracksFetchLoading = (state: RootState) =>
  state.adminTracks.fetchLoading;
export const selectAdminTracksFetchError = (state: RootState) =>
  state.adminTracks.fetchError;

export const selectAdminTrackDeleteLoading = (state: RootState) =>
  state.adminTracks.deleteLoading;
export const selectAdminTrackDeleteError = (state: RootState) =>
  state.adminTracks.deleteError;

export const selectAdminTrackTogglePublishLoading = (state: RootState) =>
  state.adminTracks.editPublishLoading;
export const selectAdminTrackTogglePublishError = (state: RootState) =>
  state.adminTracks.editPublishError;

const adminTracksSlice = createSlice({
  name: "adminTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAllTracks.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchAdminAllTracks.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.items = payload;
      })
      .addCase(fetchAdminAllTracks.rejected, (state, { payload: error }) => {
        state.fetchLoading = false;
        state.fetchError = error || null;
      })

      .addCase(deleteAdminTrack.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteAdminTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAdminTrack.rejected, (state, { payload: error }) => {
        state.deleteLoading = false;
        state.deleteError = error || null;
      })

      .addCase(editAdminPublishTrack.pending, (state) => {
        state.editPublishLoading = true;
        state.editPublishError = null;
      })
      .addCase(editAdminPublishTrack.fulfilled, (state) => {
        state.editPublishLoading = false;
      })
      .addCase(editAdminPublishTrack.rejected, (state, { payload: error }) => {
        state.editPublishLoading = false;
        state.editPublishError = error || null;
      });
  },
});

export const adminTracksReducer = adminTracksSlice.reducer;
