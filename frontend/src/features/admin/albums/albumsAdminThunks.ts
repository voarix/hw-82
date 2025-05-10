import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../../../axiosApi";
import { IAlbum, ValidationError } from "../../../types";
import { RootState } from "../../../app/store.ts";

export const fetchAdminAllAlbums = createAsyncThunk<
  IAlbum[],
  void,
  { rejectValue: ValidationError; state: RootState }
>("admin/fetchAdminAllAlbums", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const response = await axiosApi.get<IAlbum[]>("/admin/albums", {
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

export const deleteAdminAlbum = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError; state: RootState }
>("admin/deleteAdminAlbum", async (albumId, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    await axiosApi.delete(`/admin/albums/${albumId}`, {
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

export const editAdminPublishAlbum = createAsyncThunk<
  IAlbum,
  string,
  { rejectValue: ValidationError; state: RootState }
>(
  "admin/editAdminPublishAlbum",
  async (albumId, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      const response = await axiosApi.patch<IAlbum>(
        `/admin/albums/${albumId}/togglePublished`,
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
