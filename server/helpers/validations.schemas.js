import Joi from 'joi';

const string = Joi.string();
const Bool = Joi.boolean();
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
        type: string.valid('client', 'staff').required(),
        isAdmin: Bool.required(),
    }),
    signin: Joi.object().keys({
        email,
        password,
    }),
    createBankAccount: Joi.object().keys({
        accountName: string.alphanum().min(3).max(30)
            .required(),
        currency: string.valid('usd', 'eu', 'rwf', 'cdf').required(),
        type: string.valid('curent', 'savings').required(),
        status: string.valid('draft', 'active', 'dormant').required(),
    }),
};
