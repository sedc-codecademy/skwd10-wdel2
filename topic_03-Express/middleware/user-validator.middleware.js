const Joi = require("joi");

// Creating a validation schema with joi
// Not the same as MongoDB schema. They are NOT related.
const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

const userValidator = (req, res, next) => {
  const userData = req.body;
  const validation = userSchema.validate(userData);

  if (validation?.error) {
    res.status(400).send({
      message: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = userValidator;