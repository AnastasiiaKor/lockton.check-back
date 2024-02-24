const Joi = require("joi");

const idSchema = Joi.object({
  id: Joi.string()
    .regex(/^\d{9}$/)
    .required(),
});

module.exports = { idSchema };
