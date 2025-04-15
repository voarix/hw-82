import express from "express";
import Artist from "../models/Artist";
import { Error } from "mongoose";
import { artistImage } from "../multer";
import { ArtistMutation } from "../types";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistRouter.post("/", artistImage.single("image"), async (req, res, next) => {
  try {
    const newArtist: ArtistMutation = {
      name: req.body.name,
      image: req.file ? "artists/" + req.file.filename : null,
      info: req.body.info ? req.body.info : undefined,
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

export default artistRouter;