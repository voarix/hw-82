import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ArtistMutation,
  GlobalError,
  IArtist,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";

export const fetchAllArtists = createAsyncThunk<
  IArtist[],
  void,
  { rejectValue: ValidationError }
>("artists/fetchAllArtists", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get<IArtist[]>("/artists", {
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

export const createArtist = createAsyncThunk<
  IArtist,
  ArtistMutation,
  { rejectValue: ValidationError | GlobalError }
>("userArtists/createArtist", async (artistToAdd, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(artistToAdd) as (keyof ArtistMutation)[];

    keys.forEach((key) => {
      const value = artistToAdd[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await axiosApi.post<IArtist>("/artists", formData, {
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

export const deleteArtist = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>("artists/deleteArtist", async (artistId, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/artists/${artistId}`, { withCredentials: true });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});
