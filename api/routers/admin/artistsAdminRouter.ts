import { Error } from "mongoose";
import express from "express";
import Artist from "../../models/Artist";

const artistsAdminRouter = express.Router();

artistsAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      res.status(404).send({error: "Artist not found"});
      return;
    }

    res.send({message: "Artist deleted successfully"});
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).send({error: "Invalid id "});
      return;
    }

    next(error);
  }
});

export default artistsAdminRouter;