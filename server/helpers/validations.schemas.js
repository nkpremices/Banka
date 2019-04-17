import Joi from 'joi';

const string = Joi.string();
const Bool = Joi.boolean();
const email = string.email().lowercase().required();
const password = string
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required();

export default {
    createUserAccount: Joi.object().keys({
        email,
        firstName: string.regex(/^[A-Za-z]+$/).min(3).max(30).required(),
        lastName: string.regex(/^[A-Za-z]+$/).min(3)
            .max(30)
            .required(),
        password,
        type: string.valid('client', 'staff'),
        isAdmin: Bool,
    }),
    signin: Joi.object().keys({
        email,
        password,
    }),
    createBankAccount: Joi.object().keys({
        accountName: string.alphanum().min(3).max(30)
            .required(),
        currency: string.valid('usd', 'eu', 'rwf', 'cdf').required(),
        type: string.valid('current', 'savings').required(),
        status: string.valid('draft', 'active', 'dormant').required(),
    }),
    activateDeactivateAccount: Joi.object().keys({
        status: string.valid('draft', 'active', 'dormant').required(),
    }),
    creditDebitAccount: Joi.object().keys({
        amount: Joi.number().positive().allow(0).required(),
    }),
};
