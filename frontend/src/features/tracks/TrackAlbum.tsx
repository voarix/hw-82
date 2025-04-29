import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Добавляем useParams
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchTracksByAlbum } from "./tracksThunks.ts";
import { selectTracks, selectTracksLoading } from "./tracksSlice.ts";
import Grid from "@mui/material/Grid2";
import TrackCard from "./components/TrackCard.tsx";
import { Box, CircularProgress, Typography } from "@mui/material";
import { selectAlbumsLoading, selectOneAlbum } from "../albums/albumsSlice.ts";
import { fetchAlbumById } from "../albums/albumsThunks.ts";
import Button from "@mui/material/Button";

const TrackAlbum: React.FC = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);
  const album = useAppSelector(selectOneAlbum);
  const albumLoading = useAppSelector(selectAlbumsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbumById(albumId));
      dispatch(fetchTracksByAlbum(albumId));
    }
  }, [dispatch, albumId]);

  if (loading || albumLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box>
      {album && (
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 4,
              fontWeight: "bold",
            }}
          >
            Artist: {album.artist.name}
          </Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {album.name}
          </Typography>
        </Grid>
      )}

      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }} variant="contained">
        Go back
      </Button>

      <Grid container spacing={2} sx={{ mt: 5 }}>
        {tracks.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
            No tracks
          </Typography>
        ) : (
          tracks.map((track) => (
            <TrackCard
              trackId={track._id}
              key={track._id}
              name={track.name}
              duration={track.duration}
              number={String(track.number)}
              youtubeLink={track.youtubeLink ? track.youtubeLink : undefined}
            />
          ))
        )}
      </Grid>
    </Box>
  );
};

export default TrackAlbum;
