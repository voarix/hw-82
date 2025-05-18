import { Error } from "mongoose";
import express from "express";
import Artist from "../../models/Artist";

const artistsAdminRouter = express.Router();

artistsAdminRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }

    next(error);
  }
});

artistsAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      res.status(404).send({ error: "Artist not found" });
      return;
    }

    res.send({ message: "Artist deleted successfully" });
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id " });
      return;
    }

    next(error);
  }
});

artistsAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ error: "Artist id must be in req params" });
      return;
    }

    const artist = await Artist.findById(id);
    if (!artist) {
      res.status(404).send({ error: "Artist not found" });
      return;
    }

    const newArtist = !artist.isPublished;
    const updateArtist = await Artist.findByIdAndUpdate(
      id,
      { isPublished: newArtist },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updateArtist);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({ error: "Invalid id " });
      return;
    }
    next(error);
  }
});

export default artistsAdminRouter;