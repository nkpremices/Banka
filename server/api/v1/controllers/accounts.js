import accountsModel from '../models/accounts';
import verifyToken from '../../../helpers/v1/token.verification';
import accountVerification from '../../../helpers/v1/account.verification';

export default {
/**
 * POST - /auth/signup Create a new user
 */
    createAccount: async (req, res) => {
        // account creation part of the users controller
        const result = {};
        let resStatus = 200;

        // getting the body and the token
        const {
            accountName,
            currency,
            type,
            status,
        } = req.body;

        // Getting the token from the header
        // Verifying the token
        const tempUser = verifyToken(req.headers.token);
        if (tempUser) {
            // Verifying if the user is logged in
            if (tempUser.isLoggedIn) {
                // Verifying the availability of the given fields
                const verify = accountVerification(accountName);
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
};
