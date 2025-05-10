import express from "express";
import Artist from "../models/Artist";
import { Error } from "mongoose";
import { artistImage } from "../middleware/multer";
import { ArtistMutation } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import User from "../models/User";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    let user = null;

    if (token) {
      user = await User.findOne({token});
      if (user) {
        const isPublishedArtists = await Artist.find({isPublished: true});
        const artists = await Artist.find({user: user._id, isPublished: false});
        artists.push(...isPublishedArtists);
        res.send(artists);
        return;
      }
    }

    const artists = await Artist.find({isPublished: true});
    res.send(artists);
  } catch (e) {
    next(e);
  }
});

artistsRouter.post("/", auth, artistImage.single("image"), async (req, res, next) => {
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

artistsRouter.delete("/:id", auth, artistImage.single("image"), async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = (req as RequestWithUser).user;

    const artist = await Artist.findById(id);
    if (!artist) {
      res.status(404).send({error: "Artist not found"});
      return;
    }

    if (String(artist.user) === String(user._id) && !artist.isPublished) {
      await Artist.findByIdAndDelete(id);
      res.send({message: "Artist deleted successfully"});
      return;
    }
    res.status(403).send({error: "You must delete your own artist"});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id"});
      return;
    }

    next(error);
  }
});


export default artistsRouter;