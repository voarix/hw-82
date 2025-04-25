import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectArtists } from "../artistsSlice.ts";
import { fetchAllArtists } from "../artistsThunks.ts";
import { useEffect } from "react";
import ArtistCard from "./ArtistCard.tsx";
import { Container } from "@mui/material";
import { apiUrl } from "../../../globalConstants.ts";
import Grid from "@mui/material/Grid2";

const ArtistList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              name={artist.name}
              image={
                artist.image ? apiUrl + "/" + artist.image : "/default.jpg"
              }
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ArtistList;
