const Joi = require("joi");

//Creating a validation schema with joi
const userSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

//Creating the user validator middleware
const userValidator = (req, res, next) => {
  const userData = req.body;
  //Validating the user data
  const validation = userSchema.validate(userData);

  //Checking if there is a validation error
  if (validation?.error) {
    res.status(400).send({
      msg: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = userValidator;
