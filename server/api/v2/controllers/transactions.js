import transactionsModel from '../models/transactions';
import accountsModel from '../models/accounts';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';

const makeTransaction = async (Req, Res, operation, ModelFunction) => {
    // account activation part of the users controller
    const result = {};
    const resStatus = 200;
    let error;

    // getting the body and the account number
    const { amount } = Req.body;
    const accountNumber = parseInt(Req.params.accountNumber, 10);
    // Getting the token from the header
    // Verifying the token
    const tempUser = await usersModel.verifyToken(Req.headers.token);
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

                const tempTransaction = await ModelFunction(tempAccount,
                    amount, tempUser);

                if (Verify) {
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
                sendError(404, result, Res, `${err}`.replace('Error', ''));
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

export default {
    creditAccount: async (req, res) => {
        await makeTransaction(req, res, 'credit', transactionsModel
            .saveTransaction.credit);
    },
    debitAccount: async (req, res) => {
        await makeTransaction(req, res, 'debit', transactionsModel
            .saveTransaction.debit);
    },
    getSpecificTransaction: async (req, res) => {
        // account activation part of the users controller
        const result = {};
        const resStatus = 200;
        let error;

        const transactionId = parseInt(req.params.transactionId, 10);
        // Getting the token from the header
        // Verifying the token
        const tempUser = await usersModel.verifyToken(req.headers.token);
        if (tempUser) {
            if (tempUser.isloggedin) {
                // trying to save an account
                try {
                    // Verify if the account exists
                    // if not, an exception will be catched up
                    const transaction = await transactionsModel
                        .findTransactions.specific(transactionId);


                    if (transaction.length === 0) {
                        error = 'No transactions found for this ID ';
                        sendError(404, result, res, error);
                    } else {
                        // Sending back the required object
                        result.status = resStatus;
                        result.data = transaction;
                        res.status(resStatus).json(result);
                    }
                } catch (err) {
                    sendError(404, result, res, `${err}`.replace('Error', ''));
                }
            } else {
                error = 'Only a logged in user can  get an transaction '
                    + ' record details';
                sendError(403, result, res, error);
            }
        } else {
            error = 'Invalid token provided or the user is not signed up';
            sendError(403, result, res, error);
        }
    },
};
