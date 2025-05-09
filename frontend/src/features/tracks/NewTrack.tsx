import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectTrackCreateError,
  selectTrackCreateLoading,
} from "./tracksSlice.ts";
import { TrackMutation } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import TrackForm from "./components/TrackForm.tsx";
import { createTrack } from "./tracksThunks.ts";

const NewTrack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectTrackCreateLoading);
  const createError = useAppSelector(selectTrackCreateError);

  const onSubmitTrack = (trackData: TrackMutation) => {
    try {
      dispatch(createTrack(trackData)).unwrap();
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
        Create New Track
      </Typography>
      {createError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {"errors" in createError ? createError.message : createError.error}
        </Alert>
      )}
      <TrackForm onSubmitTrack={onSubmitTrack} loading={createLoading} />
    </Box>
  );
};

export default NewTrack;
