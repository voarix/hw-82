import express from "express";
import { Error } from "mongoose";
import { TrackMutation } from "../types";
import Track from "../models/Track";

const trackRouter = express.Router();

trackRouter.get("/", async (req, res, next) => {
  try {
    const album_id = req.query.album as string;
    const filter: { album?: string } = {};

    if (album_id) filter.album = album_id;

    const tracks = await Track.find(filter).populate("album", "name date");
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