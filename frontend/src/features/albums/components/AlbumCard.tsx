import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";

interface Props {
  name: string;
  image: string;
  date: number;
}

const AlbumCard: React.FC<Props> = ({ name, image, date}) => {
  return (
    <Grid size={{ sm: 6, md: 4 }} sx={{ mb: 2 }}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="350" image={image} alt={name} />
          <CardContent>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Year: {date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button>
            Share
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumCard;
