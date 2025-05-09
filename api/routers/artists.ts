import express from "express";
import Artist from "../models/Artist";
import { Error } from "mongoose";
import { artistImage } from "../middleware/multer";
import { ArtistMutation } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post("/", auth ,artistImage.single("image"), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const newArtist: ArtistMutation = {
      name: req.body.name,
      image: req.file ? "artists/" + req.file.filename : "/default.jpg",
      info: req.body.info ? req.body.info : undefined,
      user: String(user._id),
    };

    const artist = new Artist(newArtist);
    await artist.save();
    res.send(artist);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

export default artistsRouter;