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
                        result.data = {
                            accountNumber: updatedAccount.accountnumber,
                            status: updatedAccount.status,
                        };
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
    viewTransactions: async (req, res) => {
        // account deletion part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the the account id
        const accountNumber = parseInt(req.params.accountNumber, 10);

        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        // console.log(tempUser);
        if (tempUser) {
            if (tempUser.isloggedin) {
                // trying to save an account
                try {
                    // deleting the account
                    const transactions = await transactionsModel
                        .findTransactions.all(accountNumber);

                    // Sending back the required object
                    result.status = resStatus;
                    result.data = transactions;
                    res.status(resStatus).json(result);
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
};
