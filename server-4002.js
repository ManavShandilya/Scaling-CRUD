const express = require("express");
const Joi = require("joi");
const users = require("./db.js");

const userSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  hobby: Joi.array().required(),
});

const app = express();

app.get("/", (req, res) => {
  console.log(users);
  if (users.length === 0) {
    res.status(404).json({ msg: "No Users" });
  }

  res.status(200).json(users);
});

app.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.status(200).json(user);
});

app.listen(4002, () => {
  console.log("Server 4002 listening on port 4002");
});
