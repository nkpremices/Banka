/**
 * Validation Schemas description file
 * @name validationSchemas
 */

import Joi from 'joi';

const string = Joi.string();
const Bool = Joi.boolean();
const email = string.email()
    .regex(/^[a-z._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/).required();
const password = string
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).min(5).required();

/**
 * An object to define all the validation schemas
 * @property {object}  createUserAccount - The object  to
 * describe the validation for the signup endpoint
 * @property {object}  signin - The object  to describe the
 * validation for the signin endpoint.
 * @property {object}  createBankAccount - The object  to
 * describe the validation for the create bank Account endpoint.
 * @property {object}  activateDeactivateAccount- The object to
 * describe the validation for Account activation/deactivation
 *  endpoint.
 * @property {object}  creditDebitAccount - The object to
 * describe the validation for the Account transactions
 *  endpoint.
 */
export default {
    createUserAccount: Joi.object().keys({
        email,
        firstName: string.regex(/^[A-Za-z]+$/).min(3).max(30).required(),
        lastName: string.regex(/^[A-Za-z]+$/).min(3)
            .max(30)
            .required(),
        password,
        type: string.lowercase().valid('client', 'staff'),
        isAdmin: Bool,
    }),
    signin: Joi.object().keys({
        email,
        password,
    }),
    createBankAccount: Joi.object().keys({
        accountName: string.regex(/^[A-Za-z0-9 .-]+$/).min(3).max(30)
            .required(),
        currency: string.lowercase().valid('usd', 'eu', 'rwf', 'cdf')
            .required(),
        type: string.lowercase().valid('current', 'savings').required(),
    }),
    activateDeactivateAccount: Joi.object().keys({
        status: string.lowercase().valid('active', 'dormant')
            .required(),
    }),
    creditDebitAccount: Joi.object().keys({
        amount: Joi.number().positive().allow(0).required(),
    }),
};
