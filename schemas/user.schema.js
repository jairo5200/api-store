const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).max(30).required();


const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
});


const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};
