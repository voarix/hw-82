import express from "express";
import Album from "../models/Album";
import { Error } from "mongoose";
import { AlbumMutation } from "../types";
import { albumImage } from "../multer";

const albumRouter = express.Router();

albumRouter.get("/", async (req, res, next) => {
  try {
    const artist_id = req.query.artist as string;
    const filter: { artist?: string } = {};

    if (artist_id) filter.artist = artist_id;

    const albums = await Album.find(filter).populate("artist", "name");
    res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const album = await Album.findById(id).populate("artist", "name");
    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumRouter.post("/", albumImage.single("image"), async (req, res, next) => {
  try {
    const newAlbum: AlbumMutation = {
      name: req.body.name,
      artist: req.body.artist,
      date: new Date(req.body.date),
      image: req.file ? "albums/" + req.file.filename : null,
    };

    const album = new Album(newAlbum);
    await album.save();
    res.send(album);
  } catch (error) {
    if (error instanceof Error.ValidationError || error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

export default albumRouter;
