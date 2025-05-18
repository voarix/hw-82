import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AlbumMutation,
  GlobalError,
  IAlbum,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";

export const fetchAllAlbums = createAsyncThunk<
  IAlbum[],
  string | undefined,
  { rejectValue: ValidationError }
>("artists/fetchAllAlbums", async (artistId, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IAlbum[]>(
      artistId ? `/albums?artist=${artistId}` : "/albums",
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
  { rejectValue: ValidationError | GlobalError }
>("albums/createAlbum", async (albumToAdd, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(albumToAdd) as (keyof AlbumMutation)[];

    keys.forEach((key) => {
      const value = albumToAdd[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await axiosApi.post<IAlbum>("/albums", formData, {
      withCredentials: true,
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
  { rejectValue: GlobalError }
>("albums/deleteAlbum", async (albumId, { rejectWithValue }) => {
  try {
    await axiosApi.delete<IAlbum>(`/albums/${albumId}`, {
      withCredentials: true,
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});
