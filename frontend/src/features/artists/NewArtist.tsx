import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { ArtistMutation } from "../../types";
import { Box, CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArtistForm from "./components/ArtistForm.tsx";
import { selectCreateError, selectCreateLoading } from "./artistsSlice.ts";
import { createArtist } from "./artistsThunks.ts";
import { toast } from "react-toastify";

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectCreateLoading);
  const createError = useAppSelector(selectCreateError);

  const onSubmitArtist = async (artistData: ArtistMutation) => {
    try {
      await dispatch(createArtist(artistData)).unwrap();
      toast.success("Artist is created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Artist is not created");
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Create New Artist
      </Typography>
      {createLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <ArtistForm
        onSubmitArtist={onSubmitArtist}
        loading={createLoading}
        error={createError}
      />
    </Box>
  );
};

export default NewArtist;
