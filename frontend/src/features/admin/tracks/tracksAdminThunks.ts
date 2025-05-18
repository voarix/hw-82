import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../../axiosApi";
import { ITrack, ITrackAdmin, ValidationError } from "../../../types";

export const fetchAdminAllTracks = createAsyncThunk<
  ITrackAdmin[],
  void,
  { rejectValue: ValidationError }
>("admin/fetchAdminAllTracks", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<ITrackAdmin[]>("/admin/tracks", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const deleteAdminTrack = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>("admin/deleteAdminTrack", async (trackId, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/admin/tracks/${trackId}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const editAdminPublishTrack = createAsyncThunk<
  ITrack,
  string,
  { rejectValue: ValidationError }
>("admin/editAdminPublishTrack", async (trackId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.patch<ITrack>(
      `/admin/tracks/${trackId}/togglePublished`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
