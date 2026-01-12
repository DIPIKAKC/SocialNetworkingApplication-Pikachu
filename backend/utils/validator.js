import joi from "joi";
import validate from "express-joi-validation";


export const validators = validate.createValidator({});


export const postSchema = joi.object({
  content: joi.string().required(),
});


export const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required(),
  bio: joi.string().required(),
});
