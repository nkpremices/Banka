import accountsModel from '../models/accounts';
import usersModel from '../models/auth';


export default {
/**
 * POST - /auth/signup Create a new user
 */
    createAccount: async (req, res) => {
        // account creation part of the users controller
        const result = {};
        let resStatus = 200;

        // getting the body
        const {
            accountName,
            currency,
            type,
            status,
        } = req.body;

        // Getting the token from the header
        // Verifying the token
        const tempUser = usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            // Verifying if the user is logged in
            if (tempUser.isLoggedIn) {
                // Verifying the availability of the given fields
                const verify = accountsModel.verifyAccount
                    .name(accountName, tempUser.id);
                if (!verify) {
                    try {
                        // trying to save an account
                        const tempAccount = await accountsModel
                            .saveAccount(accountName, currency,
                                type, status, tempUser);

                        // Sending back the required object
                        result.status = resStatus;
                        result.data = {
                            accountNumber: tempAccount.accountNumber,
                            firstName: tempUser.firstName,
                            lastName: tempUser.lastName,
                            email: tempUser.email,
                            type: tempAccount.type,
                            openingBalance: tempAccount.balance,
                        };
                        res.status(resStatus).json(result);
                    } catch (error) {
                        res.status(resStatus = 400).json(`${error}`);
                    }
                } else {
                    result.status = 400;
                    result.data = {
                        error: 'Account name already in use',
                    };
                    res.status(400).json(result);
                }
            } else {
                result.status = 400;
                result.data = {
                    error: 'The user is not logged in',
                };
                res.status(400).json(result);
            }
        } else {
            result.status = 404;
            result.data = {
                error: 'Invalid token provided or the user is not signed up',
            };
            res.status(404).json(result);
        }
    },
    activateDeactivateAccount: async (req, res) => {
        // account creation part of the users controller
        const result = {};
        const resStatus = 200;

        // getting the body and the account number
        const { status } = req.body;
        const accountNumber = parseInt(req.params.accountNumber, 10);
        // Getting the token from the header
        // Verifying the token
        const tempUser = usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            if (tempUser.isAdmin && tempUser.isLoggedIn) {
                // trying to save an account
                try {
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // Changing the status of the account
                    // if it's different
                    const verify = accountsModel
                        .verifyAccountStatus(tempAccount, status);

                    // Display a custom message if the
                    // status is the same
                    if (verify) {
                        result.status = 400;
                        result.data = {
                            error: 'Same status',
                        };
                        res.status(400).json(result);
                    } else {
                        // change the account status
                        accountsModel.changeAccountStatus(tempAccount, status);
                        // Sending back the required object
                        result.status = resStatus;
                        result.data = {
                            accountNumber: tempAccount.accountNumber,
                            status: tempAccount.status,
                        };
                        res.status(resStatus).json(result);
                    }
                } catch (error) {
                    result.status = 404;
                    result.data = {
                        error: `${error}`,
                    };
                    res.status(404).json(result);
                }
            } else {
                result.status = 404;
                result.data = {
                    error: 'Only a logged in admin can activate/deactivate '
                    + ' an account. Provide an admin token or login',
                };
                res.status(404).json(result);
            }
        } else {
            result.status = 404;
            result.data = {
                error: 'Invalid token provided or the admin is not signed up',
            };
            res.status(404).json(result);
        }
    },
    // eslint-disable-next-line no-unused-vars
    deleteAccount: async (req, res) => {

    },
};
