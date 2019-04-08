import Joi from 'joi';

const string = Joi.string();
const email = string.email().lowercase().required();
const password = string
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required();

export default {
    createUserAccount: Joi.object().keys({
        email,
        firstName: string.alphanum().min(3).max(30)
            .required(),
        lastName: string.alphanum().min(3)
            .max(30)
            .required(),
        password,
    }),
};