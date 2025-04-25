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
}

const ArtistCard: React.FC<Props> = ({ name, image }) => {
  return (
    <Grid size={{ sm: 6, md: 4 }} sx={{ mb: 2 }}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea>
          <CardMedia component="img" height="350" image={image} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistCard;
