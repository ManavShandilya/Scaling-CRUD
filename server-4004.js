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

app.delete("/", (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).send({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  res.status(200).send({ message: "User deleted successfully" });
});

app.listen(4004, () => {
  console.log("Server 4004 listening on port 4004");
});
