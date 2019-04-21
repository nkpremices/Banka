import accountsModel from '../models/accounts';
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
                        sendError(400, result, res, `${err}`);
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
};
