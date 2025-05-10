import Grid from "@mui/material/Grid2";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TrackMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackSchema } from "../../../zodSchemas/trackSchema.ts";
import { useForm } from "react-hook-form";
import { selectAlbums, selectAlbumsLoading } from "../../albums/albumsSlice.ts";
import { fetchAllAlbums } from "../../albums/albumsThunks.ts";
import {
  selectArtists,
  selectArtistsFetchError,
  selectFetchLoading,
} from "../../artists/artistsSlice.ts";
import { fetchAllArtists } from "../../artists/artistsThunks.ts";
import Typography from "@mui/material/Typography";

interface Props {
  onSubmitTrack: (track: TrackMutation) => void;
  loading: boolean;
}

const TrackForm: React.FC<Props> = ({ onSubmitTrack, loading }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const artistsLoading = useAppSelector(selectFetchLoading);
  const artistsError = useAppSelector(selectArtistsFetchError);
  const albums = useAppSelector(selectAlbums);
  const albumsLoading = useAppSelector(selectAlbumsLoading);
  const [oneArtist, setOneArtist] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      album: "",
      name: "",
      duration: "",
      youtubeLink: "",
    },
  });

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  useEffect(() => {
    if (oneArtist) {
      dispatch(fetchAllAlbums(oneArtist));
      setValue("album", "");
    }
  }, [dispatch, oneArtist, setValue]);

  const onSubmit = (data: TrackMutation) => {
    onSubmitTrack({ ...data });
  };

  const onArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOneArtist(e.target.value);
  };

  if (artistsError) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in artistsError ? artistsError.message : "Error"}
      </Typography>
    );
  }

  return (
    albums && (
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3,
          p: 3,
          boxShadow: 3,
          maxWidth: 600,
          mx: "auto",
          borderRadius: 1,
        }}
      >
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid size={{ sm: 12 }}>
            <TextField
              select
              disabled={artistsLoading || loading}
              style={{ width: "100%" }}
              id="artist-select"
              label="Artist"
              value={oneArtist}
              onChange={onArtistChange}
            >
              <MenuItem value="" disabled>
                Select artist
              </MenuItem>
              {artists.map((artist) => (
                <MenuItem value={artist._id} key={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ sm: 12 }}>
            <TextField
              select
              disabled={albumsLoading || loading || !oneArtist}
              style={{ width: "100%" }}
              id="album"
              label="Album"
              {...register("album")}
              error={!!errors.album}
              value={watch("album")}
              helperText={errors.album?.message}
            >
              <MenuItem value="" disabled>
                Select album
              </MenuItem>
              {albums.map((album) => (
                <MenuItem value={album._id} key={album._id}>
                  {album.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ sm: 12 }}>
            <TextField
              style={{ width: "100%" }}
              id="name"
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid size={{ sm: 12 }}>
            <TextField
              style={{ width: "100%" }}
              id="duration"
              label="Duration"
              {...register("duration")}
              error={!!errors.duration}
              helperText={errors.duration?.message}
            />
          </Grid>

          <Grid size={{ sm: 12 }}>
            <TextField
              style={{ width: "100%" }}
              id="youtubeLink"
              label="Youtube link"
              {...register("youtubeLink")}
              error={!!errors.youtubeLink}
              helperText={errors.youtubeLink?.message}
            />
          </Grid>

          <Grid size={{ sm: 12 }}>
            <Button
              style={{ width: "100%" }}
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default TrackForm;
