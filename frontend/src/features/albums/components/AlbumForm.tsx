import Grid from "@mui/material/Grid2";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import {
  selectArtists,
  selectArtistsFetchError,
  selectFetchLoading,
} from "../../artists/artistsSlice.ts";
import { fetchAllArtists } from "../../artists/artistsThunks.ts";
import { AlbumMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { albumSchema } from "../../../zodSchemas/albumSchema.ts";
import { useForm } from "react-hook-form";
import FileInput from "../../../components/UI/FileInput.tsx";
import Typography from "@mui/material/Typography";

interface Props {
  onSubmitAlbum: (album: AlbumMutation) => void;
  loading: boolean;
}

const AlbumForm: React.FC<Props> = ({ onSubmitAlbum, loading }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const artistsLoading = useAppSelector(selectFetchLoading);
  const artistsError = useAppSelector(selectArtistsFetchError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      artist: "",
      name: "",
      info: "",
      date: "0",
      image: null,
    },
  });

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  const onSubmit = (data: AlbumMutation) => {
    onSubmitAlbum({ ...data });
  };

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = eFile.target;

    if (files) {
      setValue("image", files[0]);
    }
  };

  if (artistsError) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in artistsError ? artistsError.message : "Error"}
      </Typography>
    );
  }

  return (
    artists.length > 0 && (
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
              fullWidth
              select
              disabled={artistsLoading || loading}
              style={{ width: "100%" }}
              id="artist"
              label="Artist"
              {...register("artist")}
              error={!!errors.artist}
              value={watch("artist")}
              helperText={errors.artist?.message}
            >
              <MenuItem defaultValue="" disabled>
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
              type={"number"}
              id="date"
              label="Date"
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Grid>

          <Grid size={{ sm: 12 }}>
            <TextField
              style={{ width: "100%" }}
              multiline
              rows={3}
              id="info"
              label="Info"
              {...register("info")}
              error={!!errors.info}
              helperText={errors.info?.message}
            />
          </Grid>

          <Grid size={{ sm: 12 }}>
            <FileInput
              name="image"
              label="Image"
              onChange={fileInputChangeHandler}
              errors={!!errors.image}
              helperText={errors.image?.message}
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

export default AlbumForm;
