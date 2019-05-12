/**
 * Resgister midllemware file
 * @name validateRansactions
 */

import sendError from '../helpers/send.error';

/**
 * A function to validate the `credit/debit account` operations
 *
 * @param {String} operation - the operation to validate
 * @returns {Function} - A callback function
 */
const creditDebitAccount = (operation) => {
    // initialize variables
    const result = {};

    return (req, res, next) => {
        if (req.user.type === 'staff' && req.user.isloggedin) {
            next();
        } else {
            const error = `Only a logged in staff(cashier) can  ${operation} `
                + ' an account. Provide a staff(cashier) token or login';
            sendError(403, result, res, error);
        }
    };
};

export default {
    creditDebitAccount,
};
