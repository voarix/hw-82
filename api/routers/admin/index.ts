import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import artistsAdminRouter from "./artistsAdminRouter";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'))
adminRouter.use('/artists', artistsAdminRouter);

export default adminRouter;