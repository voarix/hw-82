import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import { useAppDispatch } from "../../../app/hooks.ts";
import { addTrackHistory } from "../../trackHistory/trackHistoryThunks.ts";
import { Box, Modal } from "@mui/material";

interface Props {
  trackId: string;
  name: string;
  number: string;
  duration: string;
  youtubeLink?: string;
}

const TrackCard: React.FC<Props> = ({name, number, duration, trackId, youtubeLink}) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [embLink, setEmbLink] = useState<string | undefined>(undefined);

  const handlePlay = async () => {
    await dispatch(addTrackHistory(trackId));

    if (youtubeLink) {
      const linkEmbed = youtubeLink.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
      setEmbLink(linkEmbed);
      setModal(true);
    }
  };

  return (
    <>
      <Grid size={{sm: 6, md: 4}} sx={{mb: 2}}>
        <Card>
          <CardActionArea onClick={handlePlay}>
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

      {youtubeLink && (
      <Modal open={modal} onClose={() => setModal(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 1,
          borderRadius: 2,
        }}>
          <iframe
            width="100%"
            style={{ borderRadius: 4}}
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
