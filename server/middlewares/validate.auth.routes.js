/**
 * Resgister midllemware file
 * @name validateROutes
 */

import Joi from 'joi';
import validationSchemas from '../helpers/validations.schemas';
import sendError from '../helpers/send.error';
import usersModel from '../api/v2/models/auth';

/**
 * A function to validate the email if it's already used
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */

const signup = async (req, res, next) => {
    // Initializing variables
    const result = {};
    let error;

    let AdminToken;

    const { authorization } = req.headers;

    if (authorization) {
        // eslint-disable-next-line prefer-destructuring
        AdminToken = authorization.split(' ')[1];
    }
    // getting the body of the request
    const {
        email,
        type,
        isAdmin,
    } = req.body;

    // Verifying the availability of the given fields
    const verify = await usersModel
        .VerifyUser(email, type, isAdmin, AdminToken);
    // See the availability of the provided email
    if (!verify.foundEmail) {
        // see if it's an admin request
        if (verify.adminOrStaffReq) {
            if (verify.foundToken) {
                if (verify.foundAdmin) {
                    if (type && typeof (isAdmin) === 'boolean') {
                        req.reqType = 'admin';
                        next();
                    } else {
                        error = 'isAdmin and type are required';
                        sendError(400, result, res, error);
                    }
                } else {
                    error = 'Invalid token provided'
                    + ' or the admin is not logged in';
                    sendError(400, result, res, error);
                }
            } else {
                error = 'Only an admin can create admin or staff'
                + ' accounts.A token must be provided';
                sendError(403, result, res, error);
            }
        } else {
            req.reqType = 'client';
            next();
        }
    } else {
        error = 'Email address already in use';
        sendError(205, result, res, error);
    }
};


/**
 * A funtion to validate the token of a user
 *
 * @param {String} userType - The type of the user
 * @returns {Function}
 */
const token = (userType) => {
    // Initializing variables
    const result = {};
    let error;
    let tempUser;

    return async (req, res, next) => {
        // Getting the token from headers
        const { authorization } = req.headers;
        // Verifying the token
        if (authorization) {
            tempUser = await usersModel
                .verifyToken(authorization.split(' ')[1]);
        }

        if (tempUser) {
            req.user = tempUser;
            next();
        } else {
            error = 'Invalid token provided or the'
            + ` ${userType} is not signed up`;
            sendError(403, result, res, error);
        }
    };
};

/**
 * A function to validate the admin/staff authorization
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const adminStaffAuthorization = operation => async (req, res, next) => {
    // Inittializing variables
    const result = {};
    let error;
    const tempUser = req.user;

    if ((tempUser.isadmin || tempUser.type === 'staff')
    && tempUser.isloggedin) {
        next();
    } else {
        error = `Only a logged in admin/staff can ${operation} `
            + ' an account. Provide an admin/staff token or login';
        sendError(403, result, res, error);
    }
};

/**
 * A function to validate the email on the request path
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const checkEmail = (req, res, next) => {
    // initializing variables
    const result = {};

    // getting the the user email
    const { userEmail } = req.params;
    Joi.validate(userEmail, validationSchemas.email, (err) => {
        if (!err) next();
        else {
            const error = 'Invalid email provided';
            sendError(400, result, res, error);
        }
    });
};

/**
 * A function to validate the login of a user
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const checkUserLogin = (action) => {
    // initializing variables
    const result = {};

    return async (req, res, next) => {
        if (req.user.isloggedin) next();
        else {
            const error = `Only a logged in user can ${action}`
            + '. Login the user please';
            sendError(400, result, res, error);
        }
    };
};

export default {
    signup,
    token,
    adminStaffAuthorization,
    checkEmail,
    checkUserLogin,
};
