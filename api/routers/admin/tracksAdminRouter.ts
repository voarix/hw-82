import express from "express";
import Track from "../../models/Track";
import { Error } from "mongoose";

const tracksAdminRouter = express.Router();

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

export default tracksAdminRouter;