/**
 * The v2 accounts controller file
 * @name usersController
 */

import accountsModel from '../models/accounts';
import transactionsModel from '../models/transactions';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';

/**
 * An object to contain all the controllers functions
 * @property {function} createAccount - The controller used
 * for signup
 * @property {function} activateDeactivateAccount - The
 * controller used for updating an account's status
 * @property {function} deleteAccount - The
 * controller used for deleting an account's status
 * @property {function} getSpecificUserAccounts - The
 * controller used for getting a spacific user accounts
 * @property {function} getSpecificAccount - The
 * controller used for getting a spacific account's
 * detail
 * @property {function} getAllAccounts - The
 * controller used for getting all accounts
 */
export default {
/**
 * POST - / Create a new bank account
 * @param {object} req - the request object
 * @param {object} res - the result object
 * @returns {Promise}
 */
    createAccount: async (req, res) => {
        // Initializing variables
        const result = {};
        const resStatus = 201;
        const tempUser = req.user;

        // getting the body
        const {
            accountName,
            currency,
            type,
        } = req.body;

        try {
            // trying to save an account
            const tempAccount = await accountsModel
                .saveAccount(accountName, currency,
                    type, 'draft', tempUser);

            // Sending back the required object
            result.status = resStatus;
            result.message = 'Account created successfully';
            result.data = {
                accountNumber: tempAccount.accountnumber,
                firstName: tempUser.firstname,
                lastName: tempUser.lastname,
                email: tempUser.email,
                type: tempAccount.type,
                openingBalance: tempAccount.balance,
            };
            res.status(resStatus).json(result);
        } catch (err) {
            sendError(400, result, res, `${err}`
                .replace('Error:', ''));
        }
    },
    /**
        * PATCH - / change the status of a bank account
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    activateDeactivateAccount: async (req, res) => {
        // account activation part of the accounts controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the body and the account number
        const { status } = req.body;
        const { accountNumber } = req.params;

        // trying to find if the account exists
        try {
            const tempAccount = await accountsModel
                .findAccount(accountNumber);

            // Veryfying the status first
            const verify = await accountsModel
                .verifyAccountStatus(tempAccount, status);

            // Display a custom message if the
            // status is the same
            if (verify) {
                error = `Account ${tempAccount.accountnumber} `
                + `is already ${status}`;
                sendError(205, result, res, error);
            } else {
                // change the account status
                const updatedAccount = await accountsModel
                    .changeAccountStatus(tempAccount, status);
                // Sending back the required object
                result.status = resStatus;
                result.message = 'Account updated successfully';
                result.data = {
                    accountNumber: updatedAccount.accountnumber,
                    status: updatedAccount.status,
                };
                res.status(resStatus).json(result);
            }
        } catch (err) {
            sendError(404, result, res, `${err}`
                .replace('Error:', ''));
        }
    },
    /**
        * DELETE - /<account-number> delete a bank account
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    deleteAccount: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;

        // getting the the account number
        const { accountNumber } = req.params;
        // trying to find the account before to
        // delete
        try {
            const tempAccount = await accountsModel
                .findAccount(accountNumber);

            // deleting the account
            await accountsModel
                .deleteAccount(tempAccount.accountnumber);

            // Sending back the required object
            result.status = resStatus;
            result.data = {
                message: 'Account successfully deleted',
            };
            res.status(resStatus).json(result);
        } catch (err) {
            sendError(404, result, res, `${err}`
                .replace('Error:', ''));
        }
    },
    /**
        * Get - /<account-number>/transactions
        * get all transactions regarding to an account
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    getAccountTransactions: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;
        let tempUser;

        // getting the the account number
        const { accountNumber } = req.params;

        // Getting the token from headers
        const { authorization } = req.headers;
        // Verifying the token
        if (authorization) {
            tempUser = await usersModel
                .verifyToken(authorization.split(' ')[1]);
        }

        if (tempUser) {
            if (tempUser.isloggedin) {
                // trying to fetch data
                try {
                    // Finding the account
                    // eslint-disable-next-line
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);
                    if (tempUser.email === tempAccount.owneremail) {
                        // Getting the transactions
                        const transactions = await transactionsModel
                            .findTransactions.all(accountNumber);

                        if (transactions.length === 0) {
                            error = 'No transactions found for '
                            + 'this account ';
                            sendError(404, result, res, error);
                        } else {
                            // Sending back the
                            // required object
                            result.status = resStatus;
                            result.data = transactions.map((el) => {
                                const transaction = {
                                    transactionId: el.id,
                                    createdOn: new Date(el.createdon),
                                    type: el.type,
                                    accountNumber: el.accountnumber,
                                    amount: el.amount,
                                    oldBalance: el.oldbalance,
                                    newBalance: el.newbalance,
                                };
                                return transaction;
                            });
                            res.status(resStatus).json(result);
                        }
                    } else {
                        error = 'A user can view only the transactions '
                        + 'related to his own accounts';
                        sendError(403, result, res, error);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`
                        .replace('Error:', ''));
                }
            } else {
                error = 'Only a logged in user can get an account\'s '
                    + 'transaction history. Provide a user token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'user is not signed up';
            sendError(403, result, res, error);
        }
    },
    /**
        * Get - user/<email>/accounts
        * get all accounts of a specific user
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    getSpecificUserAccounts: async (req, res) => {
        // Initializing variables
        const result = {};
        const resStatus = 200;
        let error;
        let tempUser;

        // getting the the user email
        const { userEmail } = req.params;

        // Getting the token from headers
        const { authorization } = req.headers;
        // Verifying the token
        if (authorization) {
            tempUser = await usersModel
                .verifyToken(authorization.split(' ')[1]);
        }

        if (tempUser) {
            if (tempUser.isloggedin
                && (tempUser.isadmin || tempUser.type === 'staff')) {
                try {
                    // Trying to verify the email
                    const verify = await usersModel.VerifyUser(userEmail);
                    const tempClient = verify.tempUser;

                    // Accessing his accounts if he exists
                    if (verify.foundEmail) {
                        const clientAccounts = await accountsModel
                            .getSpecifiUsersAccounts(tempClient.id);

                        if (clientAccounts.length === 0) {
                            error = 'No accounts found for this client ';
                            sendError(404, result, res, error);
                        } else {
                            // Sending back the
                            // required object
                            result.status = resStatus;
                            result.data = clientAccounts.map((el) => {
                                const tempTransaction = {
                                    createdOn: new Date(el.createdon),
                                    accountNumber: el.accountnumber,
                                    type: el.type,
                                    status: el.status,
                                    balance: el.balance,
                                };
                                return tempTransaction;
                            });
                            res.status(resStatus).json(result);
                        }
                    } else {
                        error = 'A user with the provided '
                        + 'email was not found ';
                        sendError(404, result, res, error);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`
                        .replace('Error:', ''));
                }
            } else {
                error = 'Only a logged in Admin/staff can View all accounts '
                    + 'owned by a specific user. Provide a Admin/staff token '
                    + 'or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'Admin/staff is not signed up';
            sendError(403, result, res, error);
        }
    },
    /**
        * Get - /<account-number>
        * Get a specific account’s details
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    getSpecificAccount: async (req, res) => {
        // Initializing variables
        const result = {};
        const resStatus = 200;
        let error;
        let tempUser;

        // getting the the account id
        const { accountNumber } = req.params;

        // Getting the token from headers
        const { authorization } = req.headers;
        // Verifying the token
        if (authorization) {
            tempUser = await usersModel
                .verifyToken(authorization.split(' ')[1]);
        }

        if (tempUser) {
            if (tempUser.isloggedin) {
                // trying to find the account
                try {
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);
                    if (tempUser.email === tempAccount.owneremail) {
                        // Sending back the required object
                        result.status = resStatus;
                        result.data = {
                            createdOn: new Date(tempAccount.createdon),
                            accountNumber: tempAccount.accountnumber,
                            ownerEmail: tempAccount.owneremail,
                            type: tempAccount.type,
                            status: tempAccount.status,
                            balance: tempAccount.balance,
                        };
                        res.status(resStatus).json(result);
                    } else {
                        error = 'A user can view only his own acccounts';
                        sendError(403, result, res, error);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`
                        .replace('Error:', ''));
                }
            } else {
                error = 'Only a logged in user can get a specific account\'s '
                    + 'details. Login the user please';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'user is not signed up';
            sendError(403, result, res, error);
        }
    },
    /**
        * Get - / get all accounts records
        * Get - /?status get all accounts records by status
        * @param {object} req - the request object
        * @param {object} res - the result object
        * @returns {Promise}
    */
    getAllAccounts: async (req, res) => {
        // Initializing variables
        const result = {};
        const resStatus = 200;
        let error;
        let tempSuperUser;

        // Getting the token from headers
        const { authorization } = req.headers;
        // Verifying the token
        if (authorization) {
            tempSuperUser = await usersModel
                .verifyToken(authorization.split(' ')[1]);
        }
        // Getting the queries params
        const { status } = req.query;

        if (tempSuperUser) {
            if ((tempSuperUser.isadmin || tempSuperUser.type === 'staff')
            && tempSuperUser.isloggedin) {
                // trying to fetch data
                try {
                    let allAccounts;
                    if (status === 'active' || status === 'dormant') {
                        allAccounts = await accountsModel
                            .getAccountsByStatus(status);
                    } else if (Object.keys(req.query).length === 0) {
                        allAccounts = await accountsModel
                            .getAllAccounts();
                    }

                    if (allAccounts) {
                        if (allAccounts.length === 0) {
                            const queryParam = status === 'dormant'
                                ? 'dormant' : 'draft';
                            error = `There are no ${queryParam} `
                            + 'bank accounts for now';
                            sendError(404, result, res, error);
                        } else {
                            // Sending back the required object
                            result.status = resStatus;
                            result.data = allAccounts.map((el) => {
                                const account = {
                                    createdOn: new Date(el.createdon),
                                    accountNumber: el.accountnumber,
                                    ownerEmail: el.owneremail,
                                    type: el.type,
                                    status: el.status,
                                    balance: el.balance,
                                };
                                return account;
                            });
                            res.status(resStatus).json(result);
                        }
                    } else if ((status && Object.keys(req.query).length > 0)
                        || status === '') {
                        error = 'Invalid status provided';
                        sendError(403, result, res, error);
                    } else {
                        error = 'Invalid querry parameter';
                        sendError(403, result, res, error);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error:', ''));
                }
            } else {
                error = 'Only a logged in admin/staff can View all accounts '
                    + ' Provide a admin/staff token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'admin/staff is not signed up';
            sendError(403, result, res, error);
        }
    },
};
