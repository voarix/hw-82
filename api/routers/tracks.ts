import express from "express";
import { Error } from "mongoose";
import { TrackMutation } from "../types";
import Track from "../models/Track";

const trackRouter = express.Router();

trackRouter.get("/", async (req, res, next) => {
  try {
    const artist_id = req.query.artist as string | undefined;
    const album_id = req.query.album as string | undefined;

    if (album_id) {
      const tracks = await Track.find({album: album_id}).populate("album", "name date");
      res.send(tracks);
      return;
    }

    if (artist_id) {
      const tracks = await Track.find()
        .populate({
          path: "album",
          match: {artist: artist_id},
          select: "name date"
        });

      const filteredTracks = tracks.filter(track => track.album !== null);

      res.send(filteredTracks);
      return;
    }

    const tracks = await Track.find().populate("album", "name date");
    res.send(tracks);
  } catch (e) {
    next(e);
  }
});

trackRouter.post("/", async (req, res, next) => {
  try {
    const newTrack: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Track(newTrack);
    await track.save();
    res.send(track);
  } catch (error) {
    if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

export default trackRouter;