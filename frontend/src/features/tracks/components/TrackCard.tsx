import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";

interface Props {
  name: string;
  number: string;
  duration: string;
}

const TrackCard: React.FC<Props> = ({ name, number, duration }) => {
  return (
    <Grid size={{ sm: 6, md: 4 }} sx={{ mb: 2 }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track number: {number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: {duration}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default TrackCard;
