import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectAlbumCreateError,
  selectAlbumCreateLoading,
} from "./albumsSlice.ts";
import { Alert, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createAlbum } from "./albumsThunks.ts";
import { AlbumMutation } from "../../types";
import AlbumForm from "./components/AlbumForm.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectAlbumCreateLoading);
  const createError = useAppSelector(selectAlbumCreateError);
  const navigate = useNavigate();

  const onSubmitAlbum = (albumData: AlbumMutation) => {
    try {
      dispatch(createAlbum(albumData)).unwrap();
      navigate("/");
      toast.success("Album is created successfully");
    } catch (error) {
      toast.error("Album is not created");
      console.error(error);
    }
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Create New Album
      </Typography>
      {createError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {"errors" in createError ? createError.message : createError.error}
        </Alert>
      )}
      <AlbumForm onSubmitAlbum={onSubmitAlbum} loading={createLoading} />
    </Box>
  );
};

export default NewAlbum;
