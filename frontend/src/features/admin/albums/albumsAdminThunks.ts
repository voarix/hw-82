import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../../axiosApi";
import { IAlbum, ValidationError } from "../../../types";

export const fetchAdminAllAlbums = createAsyncThunk<
  IAlbum[],
  void,
  { rejectValue: ValidationError }
>("admin/fetchAdminAllAlbums", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IAlbum[]>("/admin/albums", {
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

export const deleteAdminAlbum = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>("admin/deleteAdminAlbum", async (albumId, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/admin/albums/${albumId}`, {
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

export const editAdminPublishAlbum = createAsyncThunk<
  IAlbum,
  string,
  { rejectValue: ValidationError }
>("admin/editAdminPublishAlbum", async (albumId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.patch<IAlbum>(
      `/admin/albums/${albumId}/togglePublished`,
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
