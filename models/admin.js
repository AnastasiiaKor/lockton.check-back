const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const adminSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    login: {
      type: String,
      required: [true, "Login is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

const registerSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().min(8).max(64).required(),
});

adminSchema.post("save", HandleMongooseError);

const Admin = model("admin", adminSchema);

module.exports = { Admin, registerSchema };
