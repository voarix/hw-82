import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import { toast } from "react-toastify";
import { deleteAlbum, fetchAllAlbums } from "../albumsThunks.ts";

interface Props {
  name: string;
  image: string;
  date: number;
  id: string;
  isPublished: boolean;
  artistId: string | undefined;
}

const AlbumCard: React.FC<Props> = ({
  name,
  image,
  date,
  id,
  isPublished,
  artistId,
}) => {
  const dispatch = useAppDispatch();

  const onDeleteClick = async () => {
    try {
      await dispatch(deleteAlbum(id));
      await dispatch(fetchAllAlbums(artistId));
      toast.success("Album is deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <Grid size={{ sm: 6, md: 4 }} sx={{ mb: 2 }}>
      <Card
        sx={{
          mb: 2,
          minHeight: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea component={Link} to={`/albums/${id}/tracks`}>
          <CardMedia component="img" height="350" image={image} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              Year: {date}
            </Typography>
            {!isPublished && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 2,
                  mb: 0,
                }}
              >
                Not published
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={"/artists/" + id}
          >
            Share
          </Button>

          {!isPublished && (
            <Button size="small" color="error" onClick={onDeleteClick}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumCard;
