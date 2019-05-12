/**
 * Resgister midllemware file
 * @name validateAccountsRoutes
 */

import Joi from 'joi';
import validationSchemas from '../helpers/validations.schemas';
import sendError from '../helpers/send.error';
import accountsModel from '../api/v2/models/accounts';

/**
 * A function to validate the account number on every
 * request where the account number is needed in the path
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const checkAccountNumber = (req, res, next) => {
    const result = {};
    const { accountNumber } = req.params;
    // Validate the accountNumber
    Joi.validate(accountNumber, validationSchemas.number, (err) => {
        if (!err) next();
        else {
            const error = 'Invalid account number provided';
            sendError(400, result, res, error);
        }
    });
};

/**
 * A function to validate the account creation
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const accountCreation = async (req, res, next) => {
    // Initializing variables
    const result = {};
    let error;
    const tempUser = req.user;

    // getting the body
    const {
        accountName,
    } = req.body;

    // Verifying if the user is logged in
    if (tempUser.isloggedin) {
        // Verifying the availability of the given fields
        const verify = await accountsModel.verifyAccount
            .name(accountName, tempUser.id);

        if (!verify) {
            next();
        } else {
            error = 'Account name already in use';
            sendError(205, result, res, error);
        }
    } else {
        error = 'The user is not logged in';
        sendError(403, result, res, error);
    }
};

/**
 * A function to validate the account transactions request
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const getAccountTransactions = async (req, res, next) => {
    // Initializing varialbles
    const result = {};
    let error;
    const tempUser = req.user;
    // getting the the account number
    const { accountNumber } = req.params;

    if (tempUser.isloggedin) {
        try {
        // Finding the account
        // eslint-disable-next-line
        const tempAccount = await accountsModel
                .findAccount(accountNumber);
            if (tempUser.email === tempAccount.owneremail) {
                next();
            } else {
                error = 'A user can view only the transactions '
                + 'related to his own accounts';
                sendError(403, result, res, error);
            }
        } catch (err) {
            sendError(400, result, res, err);
        }
    } else {
        error = 'Only a logged in user can get an account\'s '
            + 'transaction history. Provide a user token or login';
        sendError(403, result, res, error);
    }
};

/**
 * A function to validate the request of getting
 * a specific transaction
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const getSpecificAccount = async (req, res, next) => {
    // initializing variables
    const result = {};
    let tempAccount;

    // getting the the account id
    const { accountNumber } = req.params;
    try {
        tempAccount = await accountsModel
            .findAccount(accountNumber);
    } catch (err) {
        sendError(404, result, res, `${err}`
            .replace('Error:', ''));
    }
    if (req.user.email === tempAccount.owneremail) {
        next();
    } else {
        const error = 'A user can view only his own acccounts';
        sendError(403, result, res, error);
    }
};

/**
 * A function to validate the request of getting
 * one's accounts by a user
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const getOwnAccounts = (req, res, next) => {
    // initializing variables
    const result = {};

    if (req.user.email === req.params.userEmail) next();
    else {
        const error = 'A user can view only his own acccounts';
        sendError(403, result, res, error);
    }
};

export default {
    checkAccountNumber,
    accountCreation,
    getAccountTransactions,
    getSpecificAccount,
    getOwnAccounts,
};
