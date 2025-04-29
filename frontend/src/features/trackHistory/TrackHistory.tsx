import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTrackHistory } from "./trackHistorySlice";
import { fetchTrackHistory } from "./trackHistoryThunks.ts";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import TrackHistoryItem from "./components/TrackHistoryItem.tsx";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  return (
    <Container sx={{ mb: 5, mt: 7 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Track History
      </Typography>
      {trackHistory.map((item) => (
        <TrackHistoryItem
          key={item._id}
          trackName={item.track.name}
          artistName={item.track.album.artist.name}
          datetime={item.datetime}
        />
      ))}
    </Container>
  );
};

export default TrackHistory;
