import User from "../models/User";
import { Error } from "mongoose";
import express from "express";
import TrackHistory from "../models/TrackHistory";

const tracksHistoryRouter = express.Router();

tracksHistoryRouter.post("/", async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      res.status(401).send({error: "No token present"});
      return;
    }

    const user = await User.findOne({token});

    if (!user) {
      res.status(401).send({error: "Unauthorized"});
      return;
    }

    if (!req.body.track) {
      res.status(404).send({error: "track id is required"});
      return;
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
    });

    await trackHistory.save();

    res.send({
      message: "Track history recorded successfully",
      trackHistory,
    });
  } catch (error) {

    if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }

    next(error);
  }
});

tracksHistoryRouter.get("/", async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      res.status(401).send({error: "No token present"});
      return;
    }

    const user = await User.findOne({token});

    if (!user) {
      res.status(401).send({error: "Unauthorized"});
      return;
    }

    const tracks = await TrackHistory.find({ user: user._id })
      .populate({
        path: 'track',
        populate: {
          path: 'album',
          populate: {
            path: 'artist',
            select: 'name'
          },
          select: 'name'
        }
      })
      .sort({ datetime: -1 });

    res.send(tracks);
  } catch (error) {
    next(error);
  }
});

export default tracksHistoryRouter;