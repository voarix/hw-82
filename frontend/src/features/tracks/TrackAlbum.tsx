import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; // Добавляем useParams
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchTracksByAlbum } from "./tracksThunks.ts";
import { selectTracks, selectTracksLoading } from "./tracksSlice.ts";
import Grid from "@mui/material/Grid2";
import TrackCard from "./components/TrackCard.tsx";
import { CircularProgress, Typography } from "@mui/material";

const TrackAlbum: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksLoading);

  useEffect(() => {
    if (albumId) {
      dispatch(fetchTracksByAlbum(albumId));
    }
  }, [dispatch, albumId]);

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
      {tracks.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
          No tracks
        </Typography>
      ) : (
        tracks.map((track) => (
          <TrackCard
            key={track._id}
            name={track.name}
            duration={track.duration}
            number={String(track.number)}
          />
        ))
      )}
    </Grid>
  );
};

export default TrackAlbum;
