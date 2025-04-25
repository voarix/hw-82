import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import artistRouter from "./routers/artists";
import albumRouter from "./routers/albums";
import trackRouter from "./routers/tracks";
import userRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistory";
import config from "./config";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/users", userRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);
app.use("/tracks", trackRouter);
app.use("/track_history", trackHistoryRouter);


const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

