import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import artistsAdminRouter from "./artistsAdminRouter";
import tracksAdminRouter from "./tracksAdminRouter";
import albumsAdminRouter from "./albumsAdminRouter";

const adminRouter = express.Router();

adminRouter.use(auth, permit("admin"));
adminRouter.use("/artists", artistsAdminRouter);
adminRouter.use("/tracks", tracksAdminRouter);
adminRouter.use("/albums", albumsAdminRouter);

export default adminRouter;
