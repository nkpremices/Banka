import transactionsModel from '../models/transactions';
import accountsModel from '../models/accounts';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';

export default {
    creditAccount: async (req, res) => {
        // account activation part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        // getting the body and the account number
        const amount = parseInt(req.body.amount, 10);
        const accountNumber = parseInt(req.params.accountNumber, 10);
        // Getting the token from the header
        // Verifying the token
        const tempUser = usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            if (tempUser.type === 'staff' && tempUser.isLoggedIn) {
                // trying to save an account
                try {
                    // Verify if the account exists
                    // if not, an exception will be catched up
                    const tempAccount = await accountsModel
                        .findAccount(accountNumber);

                    const tempTransaction = await transactionsModel
                        .saveTransaction.credit(tempAccount, amount, tempUser);

                    // Sending back the required object
                    result.status = resStatus;
                    result.data = {
                        transactionId: tempTransaction.id,
                        accountNumber: tempAccount.accountNumber,
                        amount,
                        cashier: tempUser.id,
                        transactionType: 'credit',
                        accountBalance: tempTransaction.newBalance,
                    };
                    res.status(resStatus).json(result);
                } catch (err) {
                    sendError(404, result, res, `${err}`);
                }
            } else {
                error = 'Only a logged in staff(cashier) can credit '
                    + ' an account. Provide a staff(cashier) token or login';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the staff is not signed up';
            sendError(403, result, res, error);
        }
    },
};
