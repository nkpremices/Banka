/**
 * Resgister midllemware file
 * @name validateROutes
 */

import checkNumber from '../helpers/check.number';
import sendError from '../helpers/send.error';

/**
 *
 *
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @param {function} next - the next call back
 */
const checkAccountNumber = (req, res, next) => {
    const result = {};
    let { accountNumber } = req.params;
    // Validate the accountNumber
    accountNumber = checkNumber(req.params
        .accountNumber) ? parseInt(accountNumber, 10) : false;
    if (accountNumber) {
        next();
    } else {
        const error = 'Invalid account number provided';
        sendError(400, result, res, error);
    }
};

export default {
    checkAccountNumber,
};
