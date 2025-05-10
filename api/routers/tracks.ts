import express from "express";
import { Error } from "mongoose";
import { TrackMutation } from "../types";
import Track from "../models/Track";
import auth, { RequestWithUser } from "../middleware/auth";
import User from "../models/User";

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res, next) => {
  try {
    const artist_id = req.query.artist as string | undefined;
    const album_id = req.query.album as string | undefined;
    let user = null;

    const token = req.get("Authorization");

    if (token) {
      user = await User.findOne({token});
    }

    if (user) {
      if (artist_id) {
        const isPublishedTracks = await Track.find({
          artist: artist_id,
          isPublished: true
        }).populate("artist", "name");

        const tracks = await Track.find({
          artist: artist_id,
          user: user._id,
          isPublished: false
        }).populate("artist", "name");

        const allTracks = [...isPublishedTracks, ...tracks];
        allTracks.sort((a, b) => b.number - a.number);
        res.send(allTracks);
        return;
      } else if (album_id) {
        const isPublishedTracks = await Track.find({
          album: album_id,
          isPublished: true
        }).populate("album", "name date");

        const tracks = await Track.find({
          album: album_id,
          user: user._id,
          isPublished: false
        }).populate("album", "name date");


        const allTracks = [...isPublishedTracks, ...tracks];
        allTracks.sort((a, b) => b.number - a.number);
        res.send(allTracks);
        return;
      }
    }

    if (album_id) {
      const tracks = await Track.find({album: album_id, isPublished: true})
        .populate("album", "name date").sort({number: -1});
      res.send(tracks);
      return;
    }

    if (artist_id) {
      const tracks = await Track.find({isPublished: true})
        .populate({
          path: "album",
          match: {artist: artist_id},
          select: "name date"
        })
        .sort({number: -1});

      const filteredTracks = tracks.filter(track => track.album !== null);
      res.send(filteredTracks);
      return;
    }
  } catch (e) {
    next(e);
  }
});

tracksRouter.post("/", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const trackLast = await Track.findOne({album: req.body.album}).sort({number: -1}).select("number");
    const trackNumber = trackLast ? trackLast.number + 1 : 1;

    const newTrack: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      number: trackNumber,
      youtubeLink: req.body.youtubeLink ? req.body.youtubeLink : undefined,
      user: String(user._id),
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

tracksRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = (req as RequestWithUser).user;

    const track = await Track.findById(id);
    if (!track) {
      res.status(404).send({error: "Track not found"});
      return;
    }

    if (String(track.user) === String(user._id) && !track.isPublished) {
      await Track.findByIdAndDelete(id);
      res.send({message: "Track deleted successfully"});
      return;
    }
    res.status(403).send({error: "You must delete your own track"});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id"});
      return;
    }

    next(error);
  }
});

export default tracksRouter;