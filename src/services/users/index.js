import express from "express";
import UsersModel from "./schema.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Error!", err);
    console.log(err);
  }
});

route.post("/", async (req, res, next) => {
  try {
    const newUser = new UsersModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send("Error!", err);
    console.log(err);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const user = await UsersModel.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send({ id: user._id });
    } else {
      const error = new Error(`User with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      res.send(error);
    }
  } catch (err) {
    res.status(500).send("Error!", err);
    console.log(err);
  }
});

export default route;
