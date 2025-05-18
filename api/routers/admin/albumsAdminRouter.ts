import express from "express";
import { Error } from "mongoose";
import Album from "../../models/Album";

const albumsAdminRouter = express.Router();

albumsAdminRouter.get("/", async (_req, res, next) => {
  try {
    const albums = await Album.find().populate("artist", "name");
    res.send(albums);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

albumsAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      res.status(404).send({ error: "Album not found" });
      return;
    }

    res.send({ message: "Album deleted successfully" });
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id " });
      return;
    }

    next(error);
  }
});

albumsAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ error: "Album id must be in req params" });
      return;
    }

    const album = await Album.findById(id);
    if (!album) {
      res.status(404).send({ error: "Album not found" });
      return;
    }

    const newAlbum = !album.isPublished;
    const updateAlbum = await Album.findByIdAndUpdate(
      id,
      { isPublished: newAlbum },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updateAlbum);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id " });
      return;
    }
    next(error);
  }
});

export default albumsAdminRouter;
