import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ArtistMutation,
  GlobalError,
  IArtist,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const fetchAllArtists = createAsyncThunk<
  IArtist[],
  void,
  { rejectValue: ValidationError; state: RootState }
>("artists/fetchAllArtists", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.user?.token;

    const response = await axiosApi.get<IArtist[]>("/artists", {
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

export const createArtist = createAsyncThunk<
  IArtist,
  ArtistMutation,
  { rejectValue: ValidationError | GlobalError; state: RootState }
>(
  "userArtists/createArtist",
  async (artistToAdd, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.user?.token;

      const formData = new FormData();
      const keys = Object.keys(artistToAdd) as (keyof ArtistMutation)[];

      keys.forEach((key) => {
        const value = artistToAdd[key];
        if (value !== null) {
          formData.append(key, value as string | Blob);
        }
      });

      const response = await axiosApi.post<IArtist>("/artists", formData, {
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
  },
);
