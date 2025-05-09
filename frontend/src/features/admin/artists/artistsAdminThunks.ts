import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../../axiosApi";
import { IArtist, ValidationError } from "../../../types";
import { RootState } from "../../../app/store.ts";

export const fetchAdminAllArtists = createAsyncThunk<
  IArtist[],
  void,
  { rejectValue: ValidationError }
>("admin/fetchAdminAllArtists", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IArtist[]>("/artists");
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

export const deleteAdminArtist = createAsyncThunk<
  string,
  string,
  { rejectValue: ValidationError; state: RootState }
>(
  "admin/deleteAdminArtist",
  async (artistId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      await axiosApi.delete(`/admin/artists/${artistId}`, {
        headers: {
          Authorization: token,
        },
      });
      return artistId;
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

export const editAdminPublishArtist = createAsyncThunk<
  IArtist,
  string,
  { rejectValue: ValidationError; state: RootState }
>(
  "admin/editAdminPublishArtist",
  async (artistId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      const response = await axiosApi.patch<IArtist>(
        `/admin/artists/${artistId}/togglePublished`,
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
