/**
 * The v1 transactions controller file
 * @name transactionsControllerV1
 */

import transactionsModel from '../models/transactions';
import accountsModel from '../models/accounts';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';
import checkNumber from '../../../helpers/check.number';

/**
    * A function to execute a transactiion
    * whether it is credit or debit
    * @param {object} Req - the request object
    * @param {object} Res - the result object
    * @param {function} A function comming from the model
    * it can be for crediting or for debiting
    * @returns {Promise}
*/
const makeTransaction = async (Req, Res, operation, ModelFunction) => {
    // Initializing variables
    const result = {};
    const resStatus = 200;
    let error;
    let tempUser;

    // getting the body and the account number
    const { amount } = Req.body;
    let { accountNumber } = Req.params;

    // Validate the accountNumber
    accountNumber = checkNumber(Req.params
        .accountNumber) ? parseInt(accountNumber, 10) : false;
    const { authorization } = Req.headers;
    // Verifying the token
    if (authorization) {
        tempUser = await usersModel
            .verifyToken(authorization.split(' ')[1]);
    }
    if (tempUser) {
        if (tempUser.type === 'staff' && tempUser.isLoggedIn) {
            if (accountNumber) {
            // trying to save the transaction
                try {
                // Verify if the account exists
                // if not, an exception will be catched up
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // Verify if the account is active
                    const Verify = accountsModel
                        .verifyAccountStatus(tempAccount, 'active');

                    const tempTransaction = await ModelFunction(tempAccount,
                        amount, tempUser);

                    if (Verify) {
                        // Sending back the required object
                        result.status = resStatus;
                        result.message = `Account ${operation}ed successfully`;
                        result.data = {
                            transactionId: tempTransaction.id,
                            accountNumber: tempAccount.accountNumber,
                            amount,
                            cashier: tempUser.id,
                            transactionType: tempTransaction.type,
                            accountBalance: tempTransaction.newBalance,
                        };
                        Res.status(resStatus).json(result);
                    } else {
                        error = `Only an active account can be  ${operation}ed`;
                        sendError(403, result, Res, error);
                    }
                } catch (err) {
                    sendError(404, result, Res, `${err}`.replace('Error:', ''));
                }
            } else {
                error = 'Invalid account number provided';
                sendError(400, result, Res, error);
            }
        } else {
            error = `Only a logged in staff(cashier) can  ${operation} `
                + ' an account. Provide a staff(cashier) token or login';
            sendError(403, result, Res, error);
        }
    } else {
        error = 'Invalid token provided or the staff is not signed up';
        sendError(403, result, Res, error);
    }
};

/**
 * An object to contain all the controllers functions
 * @property {function} creditAccount - The controller used
 * for crediting bank accounts
 * @property {function} debitAccount - The
 * controller used for for crediting bank accounts
 */

export default {
    /**
        * POST - /<account-number>/credit Credit a bank account.
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    creditAccount: async (req, res) => {
        await makeTransaction(req, res, 'credit', transactionsModel
            .saveTransaction.credit);
    },
    /**
        * POST - /<account-number>/debit Debit a bank account.
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    debitAccount: async (req, res) => {
        await makeTransaction(req, res, 'debit', transactionsModel
            .saveTransaction.debit);
    },
};
