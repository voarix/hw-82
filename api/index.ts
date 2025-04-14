import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import artistRouter from "./routers/artists";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/artists", artistRouter);

const run = async () => {
  await mongoose.connect("mongodb://localhost/music-api");

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

