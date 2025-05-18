import express from "express";
import Album from "../models/Album";
import { Error } from "mongoose";
import { AlbumMutation } from "../types";
import { albumImage } from "../middleware/multer";
import auth, { RequestWithUser } from "../middleware/auth";
import User, { JWT_SECRET } from "../models/User";
import jwt from "jsonwebtoken";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
  try {
    const artist_id = req.query.artist as string;
    let user = null;

    const reqCook = req as RequestWithUser;
    const token = reqCook.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
      user = await User.findOne({ _id: decoded._id, token });
    }

    if (user) {
      if (artist_id) {
        const isPublishedAlbums = await Album.find({
          artist: artist_id,
          isPublished: true,
        }).populate("artist", "name");

        const userAlbums = await Album.find({
          artist: artist_id,
          user: user._id,
          isPublished: false,
        }).populate("artist", "name");

        const albums = [...userAlbums, ...isPublishedAlbums];
        albums.sort((a, b) => b.date - a.date);
        res.send(albums);
        return;
      } else {
        const isPublishedAlbums = await Album.find({
          isPublished: true,
        }).populate("artist", "name");

        const userAlbums = await Album.find({
          user: user._id,
          isPublished: false,
        }).populate("artist", "name");

        const albums = [...userAlbums, ...isPublishedAlbums];
        albums.sort((a, b) => b.date - a.date);
        res.send(albums);
        return;
      }
    }

    const filter: { artist?: string; isPublished: boolean } = {
      isPublished: true,
    };

    if (artist_id) {
      filter.artist = artist_id;
    }

    const albums = await Album.find(filter)
      .populate("artist", "name")
      .sort({ date: -1 });

    res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const album = await Album.findById(id).populate("artist", "name");
    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.post(
  "/",
  auth,
  albumImage.single("image"),
  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;

      const newAlbum: AlbumMutation = {
        name: req.body.name,
        artist: req.body.artist,
        date: req.body.date,
        image: req.file ? "albums/" + req.file.filename : "/default.jpg",
        user: String(user._id),
      };

      const album = new Album(newAlbum);
      await album.save();
      res.send(album);
    } catch (error) {
      if (
        error instanceof Error.ValidationError ||
        error instanceof Error.CastError
      ) {
        res.status(400).send(error);
        return;
      }
      next(error);
    }
  },
);

albumsRouter.delete(
  "/:id",
  auth,
  albumImage.single("image"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = (req as RequestWithUser).user;

      const album = await Album.findById(id);
      if (!album) {
        res.status(404).send({ error: "Album not found" });
        return;
      }

      if (String(album.user) === String(user._id) && !album.isPublished) {
        await Album.findByIdAndDelete(id);
        res.send({ message: "Album deleted successfully" });
        return;
      }
      res.status(403).send({ error: "You must delete your own album" });
    } catch (error) {
      if (error instanceof Error.CastError) {
        res.status(400).send({ error: "Invalid id" });
        return;
      }

      next(error);
    }
  },
);

export default albumsRouter;
