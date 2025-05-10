import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../../axiosApi";
import { ITrack, ITrackAdmin, ValidationError } from "../../../types";
import { RootState } from "../../../app/store.ts";

export const fetchAdminAllTracks = createAsyncThunk<
  ITrackAdmin[],
  void,
  { rejectValue: ValidationError; state: RootState }
>("admin/fetchAdminAllTracks", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const response = await axiosApi.get<ITrackAdmin[]>("/admin/tracks", {
      headers: { Authorization: token },
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
  { rejectValue: ValidationError; state: RootState }
>("admin/deleteAdminTrack", async (trackId, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    await axiosApi.delete(`/admin/tracks/${trackId}`, {
      headers: {
        Authorization: token,
      },
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
  { rejectValue: ValidationError; state: RootState }
>(
  "admin/editAdminPublishTrack",
  async (trackId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      const response = await axiosApi.patch<ITrack>(
        `/admin/tracks/${trackId}/togglePublished`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
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
  },
);
