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

app.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { name, age, hobby } = req.body;

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const updatedUser = { name, age, hobby };
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).send({ error: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], ...updatedUser };
  res.status(200).send({ message: "User updated successfully" });
});

app.listen(4003, () => {
  console.log("Server 4003 listening on port 4003");
});
