import express from "express";
import Track from "../../models/Track";
import { Error } from "mongoose";

const tracksAdminRouter = express.Router();

tracksAdminRouter.get("/", async (_req, res, next) => {
  try {
    const tracks = await Track.find().populate({
      path: "album",
      select: "name artist",
      populate: {
        path: "artist",
        select: "name"
      }
    });
    res.send(tracks);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send(error);
      return;
    }

    next(error);
  }
})

tracksAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const track = await Track.findByIdAndDelete(id);
    if (!track) {
      res.status(404).send({error: "Track not found"});
      return;
    }

    res.send({message: "Track deleted successfully"});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id "});
      return;
    }

    next(error);
  }
});

tracksAdminRouter.patch("/:id/togglePublished", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({error: "Track id must be in req params"});
      return;
    }

    const track = await Track.findById(id);
    if (!track) {
      res.status(404).send({error: "Track not found"});
      return;
    }

    const newTrack = !track.isPublished;
    const updateTrack = await Track.findByIdAndUpdate(id, {isPublished: newTrack}, {
      new: true,
      runValidators: true
    }).populate("album", "name date");
    res.send(updateTrack);
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id "});
      return;
    }
    next(error);
  }
});


export default tracksAdminRouter;