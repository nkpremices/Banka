import accountsModel from '../models/accounts';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';


export default {
/**
 * POST - / Create a new bank account
 */
    createAccount: async (req, res) => {
        // Initializing variables
        const result = {};
        const resStatus = 201;
        let error;

        // getting the body
        const {
            accountName,
            currency,
            type,
        } = req.body;

        // Getting the token from the header
        // Verifying the token
        const tempUser = usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            // Verifying if the user is logged in
            if (tempUser.isLoggedIn) {
                // Checking the availability of the given fields
                const verify = accountsModel.verifyAccount
                    .name(accountName, tempUser.id);
                if (!verify) {
                    try {
                        // Requesting to save the account
                        const tempAccount = await accountsModel
                            .saveAccount(accountName, currency,
                                type, 'draft', tempUser);

                        // Sending back the required object
                        result.status = resStatus;
                        result.message = 'Account created successfully';
                        result.data = {
                            accountNumber: tempAccount.accountNumber,
                            firstName: tempUser.firstName,
                            lastName: tempUser.lastName,
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
                    sendError(205, result, res, error);
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
    /**
        * PATCH - /<account-number> Create a new bank account
    */
        // Initializing variables
        const result = {};
        const resStatus = 200;
        let error;

        // getting the body and the account number
        const { status } = req.body;
        const accountNumber = parseInt(req.params.accountNumber, 10);
        // Getting the token from the header
        // Verifying the token
        const tempUser = usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            if ((tempUser.isAdmin || tempUser.type === 'staff')
            && tempUser.isLoggedIn) {
                // trying to save the status
                try {
                    // See first if the account exists
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // Veryfying the status first
                    const verify = accountsModel
                        .verifyAccountStatus(tempAccount, status);

                    // Display a custom message if the
                    // status is the same
                    if (verify) {
                        error = 'The provided status is the '
                        + 'same as the current';
                        sendError(205, result, res, error);
                    } else {
                        // changing the account status
                        accountsModel.changeAccountStatus(tempAccount, status);
                        // Sending back the required object
                        result.status = resStatus;
                        result.message = 'Account updated successfully';
                        result.data = {
                            accountNumber: tempAccount.accountNumber,
                            status: tempAccount.status,
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
        /**
            * DELETE- /<account-number> Delete a bank account
        */
        // Initializing variables
        const result = {};
        const resStatus = 200;
        let error;

        // getting the the account id
        const accountNumber = parseInt(req.params.accountNumber, 10);

        // Getting the token from the header
        // Verifying the token
        const tempUser = usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            if ((tempUser.isAdmin || tempUser.type === 'staff')
                && tempUser.isLoggedIn) {
                // trying to delete the account
                try {
                    // Trying to see if the account exists
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    // deleting the account
                    await accountsModel
                        .deleteAccount(tempAccount.accountNumber);

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
};
