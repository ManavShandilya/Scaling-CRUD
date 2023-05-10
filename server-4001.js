const express = require("express");
const Joi = require("joi");
const users = require("./db.js");
const bodyParser = require("body-parser");

const userSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  hobby: Joi.array().required(),
});

const app = express();

app.post("/", bodyParser.json(), (req, res) => {
  const { id, name, age, hobby } = req.body;

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const newUser = {
    id,
    name,
    age,
    hobby,
  };

  users.push(newUser);
  res.status(201).json({ msg: "Successfully added the user", users });
});

app.listen(4001, () => {
  console.log("Server 4001 listening on port 4001");
});
