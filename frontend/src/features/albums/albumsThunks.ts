import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AlbumMutation,
  GlobalError,
  IAlbum,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const fetchAllAlbums = createAsyncThunk<
  IAlbum[],
  string | undefined,
  { rejectValue: ValidationError; state: RootState }
>("artists/fetchAllAlbums", async (artistId, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const response = await axiosApi.get<IAlbum[]>(
      artistId ? `/albums?artist=${artistId}` : "/albums",
      {
        headers: { Authorization: token },
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
});

export const fetchAlbumById = createAsyncThunk<
  IAlbum,
  string,
  { rejectValue: ValidationError }
>("albums/fetchAlbumById", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IAlbum>(`/albums/${id}`);
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});

export const createAlbum = createAsyncThunk<
  IAlbum,
  AlbumMutation,
  { rejectValue: ValidationError | GlobalError; state: RootState }
>("albums/createAlbum", async (albumToAdd, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();
    const keys = Object.keys(albumToAdd) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = albumToAdd[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await axiosApi.post<IAlbum>("/albums", formData, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data);
      }
    }
    throw error;
  }
});

export const deleteAlbum = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError; state: RootState }
>("albums/deleteAlbum", async (albumId, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    await axiosApi.delete<IAlbum>(`/albums/${albumId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
