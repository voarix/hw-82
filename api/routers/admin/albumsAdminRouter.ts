import express from "express";
import { Error } from "mongoose";
import Album from "../../models/Album";

const albumsAdminRouter = express.Router();

albumsAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      res.status(404).send({error: "Album not found"});
      return;
    }

    res.send({message: "Album deleted successfully"});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id "});
      return;
    }

    next(error);
  }
});

export default albumsAdminRouter;