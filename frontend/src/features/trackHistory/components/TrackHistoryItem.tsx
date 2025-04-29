import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface TrackHistoryItemProps {
  trackName: string;
  artistName: string;
  datetime: string;
}

const TrackHistoryItem: React.FC<TrackHistoryItemProps> = ({
  trackName,
  artistName,
  datetime,
}) => {
  return (
    <Card
      sx={{
        mt: 2,
        boxShadow: 4,
        borderRadius: 2,
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <CardContent>
        <Box mb={1}>
          <Typography variant="body2" color="text.secondary">
            Artist:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {artistName}
          </Typography>
        </Box>

        <hr />

        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Track name:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {trackName}
          </Typography>
        </Box>

        <Typography color="text.secondary">
          Listened in: {new Date(datetime).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrackHistoryItem;
