/* eslint-disable */
const Joi = require('joi');

module.exports = () => {
  const environmentSchema = Joi.object({
    AUTH0_DOMAIN: Joi.string().required(),
    AUTH0_CLIENT_ID: Joi.string().required(),
    AUTH0_CLIENT_SECRET: Joi.string().required(),
    AUTH0_COOKIE_SECRET: Joi.string().min(32).required(),
    AUTH0_API_AUDIENCE: Joi.string().required(),

    NEXT_PUBLIC_CLIENT_BASE: Joi.string().required(),
    NEXT_PUBLIC_SERVER_BASE: Joi.string().required(),
  });

  const result = environmentSchema.validate(process.env, {
    allowUnknown: true,
  });

  if (result.error) {
    throw new Error(result.error);
  }

  return {};
};
