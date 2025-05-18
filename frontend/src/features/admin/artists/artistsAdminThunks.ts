import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../../axiosApi";
import { IArtist, ValidationError } from "../../../types";

export const fetchAdminAllArtists = createAsyncThunk<
  IArtist[],
  void,
  { rejectValue: ValidationError }
>("admin/fetchAdminAllArtists", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IArtist[]>("/admin/artists", {
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

export const deleteAdminArtist = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>("admin/deleteAdminArtist", async (artistId, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/admin/artists/${artistId}`, {
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

export const editAdminPublishArtist = createAsyncThunk<
  IArtist,
  string,
  { rejectValue: ValidationError }
>("admin/editAdminPublishArtist", async (artistId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.patch<IArtist>(
      `/admin/artists/${artistId}/togglePublished`,
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
