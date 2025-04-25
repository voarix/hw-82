import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectArtists, selectFetchLoading } from "../artistsSlice.ts";
import { fetchAllArtists } from "../artistsThunks.ts";
import { useEffect } from "react";
import ArtistCard from "./ArtistCard.tsx";
import { apiUrl } from "../../../globalConstants.ts";
import Grid from "@mui/material/Grid2";
import { CircularProgress } from "@mui/material";

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectFetchLoading);

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 2}}>
        <CircularProgress />
      </Grid>
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
              image={
                artist.image ? apiUrl + "/" + artist.image : "/default.jpg"
              }
            />
          ))}
        </Grid>
    </>
  );
};

export default ArtistList;
