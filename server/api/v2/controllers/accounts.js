import accountsModel from '../models/accounts';
import transactionsModel from '../models/transactions';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';


export default {
/**
 * POST - /auth/signup Create a new user
 */
    createAccount: async (req, res) => {
        // account creation part of the users controller
        const result = {};
        const resStatus = 201;
        let error;

        // getting the body
        const {
            accountName,
            currency,
            type,
            status,
        } = req.body;

        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            // Verifying if the user is logged in
            if (tempUser.isloggedin) {
                // Verifying the availability of the given fields
                const verify = await accountsModel.verifyAccount
                    .name(accountName, tempUser.id);
                // console.log(verify);
                if (!verify) {
                    try {
                        // trying to save an account
                        const tempAccount = await accountsModel
                            .saveAccount(accountName, currency,
                                type, status, tempUser);

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
                            .replace('Error', ''));
                    }
                } else {
                    error = 'Account name already in use';
                    sendError(400, result, res, error);
                }
            } else {
                error = 'The user is not logged in';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the user is not signed up';
            sendError(403, result, res, error);
        }
    },
    activateDeactivateAccount: async (req, res) => {
        // account activation part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the body and the account number
        const { status } = req.body;
        const accountNumber = parseInt(req.params.accountNumber, 10);
        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            if ((tempUser.isadmin || tempUser.type === 'staff')
            && tempUser.isloggedin) {
                // trying to save an account
                try {
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // Veryfying the status first
                    const verify = await accountsModel
                        .verifyAccountStatus(tempAccount, status);

                    // Display a custom message if the
                    // status is the same
                    if (verify) {
                        error = 'The provided status is the '
                        + 'same as the current';
                        sendError(205, result, res, error);
                    } else {
                        // change the account status
                        const updatedAccount = await accountsModel
                            .changeAccountStatus(tempAccount, status);
                        // Sending back the required object
                        result.status = resStatus;
                        result.message = 'Account updated successfully';
                        result.data = updatedAccount;
                        res.status(resStatus).json(result);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error', ''));
                }
            } else {
                error = 'Only a logged in admin/staff can activate/deactivate '
                    + ' an account. Provide an admin token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the admin is not signed up';
            sendError(403, result, res, error);
        }
    },
    deleteAccount: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the the account id
        const accountNumber = parseInt(req.params.accountNumber, 10);
        // console.log(accountNumber);
        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        // console.log(tempUser);
        if (tempUser) {
            if ((tempUser.isadmin || tempUser.type === 'staff')
                && tempUser.isloggedin) {
                // trying to save an account
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
                    sendError(404, result, res, `${err}`.replace('Error', ''));
                }
            } else {
                error = 'Only a logged in admin/staf can delete '
                    + ' an account. Provide an admin/staff token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'admin/staff is not signed up';
            sendError(403, result, res, error);
        }
    },
    getAccountTransactions: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the the account number
        const accountNumber = parseInt(req.params.accountNumber, 10);

        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        // console.log(tempUser);
        if (tempUser) {
            if (tempUser.isloggedin) {
                // trying to save an account
                try {
                    // Finding the account
                    // eslint-disable-next-line no-unused-vars
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // Getting the transactions
                    const transactions = await transactionsModel
                        .findTransactions.all(accountNumber);

                    if (transactions.length === 0) {
                        error = 'No transactions found for this account ';
                        sendError(404, result, res, error);
                    } else {
                        // Sending back the required object
                        result.status = resStatus;
                        result.data = transactions;
                        res.status(resStatus).json(result);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error', ''));
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
    getSpecificUserAccounts: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the the user email
        const { userEmail } = req.params;

        // Getting the token from the header
        // Verifying the token
        const tempSuperUser = await usersModel.verifyToken(req.headers.token);
        // console.log(tempUser);
        if (tempSuperUser) {
            if (tempSuperUser.isloggedin) {
                // trying to save an account
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
                            // Sending back the required object
                            result.status = resStatus;
                            result.data = clientAccounts;
                            res.status(resStatus).json(result);
                        }
                    } else {
                        error = 'A user with the provided email was not found ';
                        sendError(404, result, res, error);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error', ''));
                }
            } else {
                error = 'Only a logged in user can View all accounts '
                    + 'owned by a specific user. Provide a user token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'user is not signed up';
            sendError(403, result, res, error);
        }
    },
    getSpecificAccount: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the the account id
        const accountNumber = parseInt(req.params.accountNumber, 10);
        // console.log(accountNumber);
        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        // console.log(tempUser);
        if (tempUser) {
            if (tempUser.isloggedin) {
                // trying to save an account
                try {
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // Sending back the required object
                    result.status = resStatus;
                    result.data = tempAccount;
                    res.status(resStatus).json(result);
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error', ''));
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
    getAllAccounts: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;
        // Getting the token from the header
        // Verifying the token
        const tempSuperUser = await usersModel.verifyToken(req.headers.token);
        // Getting the queries params
        const { status } = req.query;

        if (tempSuperUser) {
            if ((tempSuperUser.isadmin || tempSuperUser.type === 'staff')
            && tempSuperUser.isloggedin) {
                // trying to save an account
                try {
                    // Accessing his accounts if he exists
                    let allAccounts;
                    if (status) {
                        allAccounts = await accountsModel
                            .getAccountsByStatus(status);
                    } else {
                        allAccounts = await accountsModel
                            .getAllAccounts();
                    }

                    if (allAccounts.length === 0) {
                        error = 'There are no bank accounts for now';
                        sendError(404, result, res, error);
                    } else {
                        // Sending back the required object
                        result.status = resStatus;
                        result.data = allAccounts;
                        res.status(resStatus).json(result);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error', ''));
                }
            } else {
                error = 'Only a logged in admin/staff can View all accounts '
                    + 'owned by a specific user. Provide a user token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the '
            + 'admin/staff is not signed up';
            sendError(403, result, res, error);
        }
    },
};
