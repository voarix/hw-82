import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import { useAppDispatch } from "../../../app/hooks.ts";
import { addTrackHistory } from "../../trackHistory/trackHistoryThunks.ts";
import { Box, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { deleteTrack, fetchTracksByAlbum } from "../tracksThunks.ts";
import { toast } from "react-toastify";

interface Props {
  trackId: string;
  name: string;
  number: string;
  duration: string;
  youtubeLink?: string;
  isPublished?: boolean;
}

const TrackCard: React.FC<Props> = ({
  name,
  number,
  duration,
  trackId,
  youtubeLink,
  isPublished,
}) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [embLink, setEmbLink] = useState<string | undefined>(undefined);

  const { albumId } = useParams();

  const onDeleteClick = async () => {
    try {
      await dispatch(deleteTrack(trackId));
      if (albumId) await dispatch(fetchTracksByAlbum(albumId));
      toast.success("Artist is deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handlePlay = async () => {
    await dispatch(addTrackHistory(trackId));

    if (youtubeLink) {
      let linkEmbed = youtubeLink;

      if (youtubeLink.includes("youtube.com/watch?v=")) {
        linkEmbed = youtubeLink.replace(
          "youtube.com/watch?v=",
          "youtube.com/embed/",
        );
      } else if (youtubeLink.includes("youtu.be/")) {
        linkEmbed = youtubeLink.replace("youtu.be/", "youtube.com/embed/");
      }

      setEmbLink(linkEmbed);
      setModal(true);
    }
  };

  return (
    <>
      <Grid size={{ sm: 6, md: 4 }} sx={{ mb: 2 }}>
        <Card
          sx={{
            mb: 2,
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                color="blue"
              >
                Number: {number}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ mt: 2 }}
                color="purple"
              >
                Duration: {duration}
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
            <Button onClick={handlePlay}>Play</Button>

            {!isPublished && (
              <Button size="small" color="error" onClick={onDeleteClick}>
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>

      {youtubeLink && (
        <Modal open={modal} onClose={() => setModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 800,
              backgroundColor: "background.paper",
              boxShadow: 24,
              p: 1,
              borderRadius: 2,
            }}
          >
            <iframe
              width="100%"
              style={{ borderRadius: 4 }}
              height="450"
              src={`${embLink}?autoplay=1`}
              allowFullScreen
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default TrackCard;
