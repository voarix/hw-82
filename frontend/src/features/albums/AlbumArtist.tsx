import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectAlbumDeleteError,
  selectAlbumDeleteLoading,
  selectAlbums,
  selectAlbumsError,
  selectAlbumsLoading,
} from "./albumsSlice.ts";
import { fetchAllAlbums } from "./albumsThunks.ts";
import Grid from "@mui/material/Grid2";
import AlbumCard from "./components/AlbumCard.tsx";
import { apiUrl } from "../../globalConstants.ts";
import { Box, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AlbumArtist = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsLoading);
  const deleteLoading = useAppSelector(selectAlbumDeleteLoading);
  const error = useAppSelector(selectAlbumsError);
  const errorDelete = useAppSelector(selectAlbumDeleteError);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchAllAlbums(id));
    }
  }, [dispatch, id]);

  if (loading || deleteLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in error ? error.message : "Error"}
      </Typography>
    );
  }

  if (errorDelete) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {errorDelete.error}
      </Typography>
    );
  }

  const artistName = albums[0]?.artist?.name || null;

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 4,
          mt: 2,
          fontWeight: "bold",
        }}
      >
        {artistName}
      </Typography>

      <Button onClick={() => navigate("/")} variant="contained">
        Go home
      </Button>

      <Grid container spacing={2} sx={{ mt: 5 }}>
        {albums.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
            No albums
          </Typography>
        ) : (
          albums.map((album) => (
            <AlbumCard
              key={album._id}
              name={album.name}
              image={album.image ? apiUrl + "/" + album.image : "/default.jpg"}
              date={album.date}
              isPublished={album.isPublished}
              id={album._id}
              artistId={id}
            />
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AlbumArtist;
