import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectArtists,
  selectArtistsFetchError,
  selectDeleteError,
  selectDeleteLoading,
  selectFetchLoading,
} from "../artistsSlice.ts";
import { fetchAllArtists } from "../artistsThunks.ts";
import { useEffect } from "react";
import ArtistCard from "./ArtistCard.tsx";
import { apiUrl } from "../../../globalConstants.ts";
import Grid from "@mui/material/Grid2";
import { CircularProgress, Typography } from "@mui/material";

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectFetchLoading);
  const error = useAppSelector(selectArtistsFetchError);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const deleteError = useAppSelector(selectDeleteError);

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  if (loading || deleteLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in error ? error.message : "Error"}
      </Typography>
    );
  }

  if (deleteError) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {deleteError.error}
      </Typography>
    );
  }
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {artists.map((artist) => (
          <ArtistCard
            key={artist._id}
            id={artist._id}
            name={artist.name}
            image={artist.image ? apiUrl + "/" + artist.image : "/default.jpg"}
            isPublished={artist.isPublished}
          />
        ))}
      </Grid>
    </>
  );
};

export default ArtistList;
