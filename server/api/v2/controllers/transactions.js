/**
 * The v1 transactions controller file
 * @name transactionsControllerV2
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
    * @param {function} ModelFunction - A function comming
    * from the model. it can be for crediting or for debiting
    * @returns {Promise}
*/

const makeTransaction = async (Req, Res, operation, ModelFunction) => {
    // initializing variables
    const result = {};
    const resStatus = 200;
    let error;
    let tempUser;

    // getting the body and the account number
    const { amount } = Req.body;
    const { accountNumber } = Req.params;

    // Getting the token from headers
    const { authorization } = Req.headers;
    // Verifying the token
    if (authorization) {
        tempUser = await usersModel
            .verifyToken(authorization.split(' ')[1]);
    }

    if (tempUser) {
        if (tempUser.type === 'staff' && tempUser.isloggedin) {
            // trying to save an account
            try {
                // Verify if the account exists
                // if not, an exception will be catched up
                const tempAccount = await accountsModel
                    .findAccount(accountNumber);

                // Verify if the account is active
                const Verify = await accountsModel
                    .verifyAccountStatus(tempAccount, 'active');

                if (Verify) {
                    const tempTransaction = await ModelFunction(tempAccount,
                        amount, tempUser);

                    // Sending back the required object
                    result.status = resStatus;
                    result.message = `Account ${operation}ed successfully`;
                    result.data = {
                        transactionId: tempTransaction.id,
                        accountNumber: tempAccount.accountnumber,
                        amount,
                        cashier: tempUser.id,
                        transactionType: tempTransaction.type,
                        accountBalance: tempTransaction.newbalance,
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
 * @property {function} debitAccount - The
 * controller used for for crediting bank accounts
 * @property {function} getSpecificTransaction - The
 * controller used for getting a specific transaction
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
    /**
        * GET - /<transactio-id>
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    getSpecificTransaction: async (req, res) => {
        // account activation part of the users controller
        const result = {};
        const resStatus = 200;
        let error;
        let tempUser;

        let { transactionId } = req.params;

        // Validate the accountNumber
        transactionId = checkNumber(req.params
            .transactionId) ? parseInt(transactionId, 10) : false;
        // Getting the token from headers
        const { authorization } = req.headers;
        // Verifying the token
        if (authorization) {
            tempUser = await usersModel
                .verifyToken(authorization.split(' ')[1]);
        }
        if (tempUser) {
            if (tempUser.isloggedin) {
                if (transactionId) {
                // trying to save the transaction
                    try {
                        // Verify if the account exists
                        // if not, an exception will be catched
                        // up
                        const transaction = await transactionsModel
                            .findTransactions.specific(transactionId);
                        /**
                         * A single function to send back a
                         * transaction
                         *
                         * @param {*} warning - A warning message
                         * if the account is already deleted
                         */
                        const sendTransaction = (warning) => {
                            // Sending back the required
                            // object
                            result.status = resStatus;
                            result.warning = warning;
                            result.data = transaction.map((el) => {
                                const tempTransaction = {
                                    transactionId: el.id,
                                    createdOn: new Date(el.createdon),
                                    type: el.type,
                                    accountNumber: el.accountnumber,
                                    amount: el.amount,
                                    oldBalance: el.oldbalance,
                                    newBalance: el.newbalance,
                                };
                                return tempTransaction;
                            });
                            res.status(resStatus).json(result);
                        };
                        if (!(transaction.length === 0)) {
                            // console.log(transaction);
                            try {
                                const tempAccount = await accountsModel
                                    .findAccount(transaction[0].accountnumber);
                                if (tempAccount.owneremail === tempUser.email) {
                                    sendTransaction();
                                } else {
                                    error = 'A user only see transactions '
                                    + 'related to his accounts';
                                    sendError(403, result, res, error);
                                }
                            } catch (Error) {
                                if (tempUser.type === 'client') {
                                    error = 'The account '
                                    + `${transaction[0].accountnumber} `
                                    + `related to transaction ${transactionId}`
                                    + ' is already deleted. Please, contact a'
                                    + ' staff member';
                                    sendError(403, result, res, error);
                                } else if (tempUser.type === 'staff'
                                || tempUser.isadmin) {
                                    const warning = 'The account '
                                    + `${transaction[0].accountnumber} related `
                                    + `to transaction ${transactionId} is`
                                    + ' already deleted';
                                    sendTransaction(warning);
                                }
                            }
                        } else {
                            error = 'No transactions found for ID '
                            + `${transactionId}`;
                            sendError(404, result, res, error);
                        }
                    } catch (err) {
                        sendError(404, result, res, `${err}`
                            .replace('Error:', ''));
                    }
                } else {
                    error = 'Invalid transaction Id provided';
                    sendError(400, result, res, error);
                }
            } else {
                error = 'Only a logged in user can  get a transaction '
                    + ' record details';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the user is not signed up';
            sendError(403, result, res, error);
        }
    },
};
