import express from "express";
import { Error } from "mongoose";
import User from "../models/User";
import auth, { RequestWithUser } from "../middleware/auth";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { userImage } from "../middleware/multer";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/google", async (req, res, next) => {
  try {
    if (!req.body.credential) {
      res.status(400).send({ error: "Google login Error!" });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).send({ error: "Google login Error!" });
      return;
    }

    const email = payload["email"];
    const googleId = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      res.status(400).send({ error: "Google login Error!" });
      return;
    }

    let user = await User.findOne({ googleId: googleId });
    let genPassword = crypto.randomUUID();

    if (!user) {
      user = new User({
        username: email,
        password: genPassword,
        confirmPassword: genPassword,
        displayName,
        googleId,
        avatar,
      });
    } else {
      user.avatar = avatar;
    }

    user.generateToken();
    await user.save();

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const safeUser = {
      _id: user._id,
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      avatar: user.avatar,
    };

    res.send({ user: safeUser, message: "Login with google successfully." });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", userImage.single("avatar"), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      confirmPassword: req.body.confirmPassword,
      avatar: req.file ? "users/" + req.file.filename : "/default.jpg",
    });

    user.generateToken();
    await user.save();

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const safeUser = {
      _id: user._id,
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      avatar: user.avatar,
    };

    res.send({ user: safeUser, message: "User registered successfully." });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }

    next(error);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res
        .status(400)
        .send({ error: "Username or password or display name must be in req" });
      return;
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send({ error: "Username not found" });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      res.status(400).send({ error: "Password is incorrect" });
      return;
    }

    user.generateToken();
    await user.save();

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const safeUser = {
      _id: user._id,
      username: user.username,
      displayName: user.displayName,
      role: user.role,
    };

    res.send({ user: safeUser, message: "Username and password is correct" });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/sessions", async (req, res, next) => {
  const reqCook = req as RequestWithUser;
  const token = reqCook.cookies.token;

  if (!token) {
    res.clearCookie("token");
    res.send({ message: "Success logout" });
    return;
  }

  try {
    const user = await User.findOne({ token });

    if (user) {
      user.generateToken();
      await user.save();
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.send({ message: "Success logout" });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/secret", auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  res.send({
    message: "Secret message",
    user: user,
  });
});

export default usersRouter;
