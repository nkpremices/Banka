import transactionsModel from '../models/transactions';
import accountsModel from '../models/accounts';
import usersModel from '../models/auth';
import sendError from '../../../helpers/send.error';

/**
    * A function to execute a transactiion
    * whether it is credit or debit
*/
const makeTransaction = async (Req, Res, operation, ModelFunction) => {
    // Initializing variables
    const result = {};
    const resStatus = 200;
    let error;

    // getting the body and the account number
    const { amount } = Req.body;
    const accountNumber = parseInt(Req.params.accountNumber, 10);
    // Getting the token from the header
    // Verifying the token
    const tempUser = usersModel.verifyToken(Req.headers.token);
    if (tempUser) {
        if (tempUser.type === 'staff' && tempUser.isLoggedIn) {
            // trying to save the transaction
            try {
                // Verify if the account exists
                // if not, an exception will be catched up
                const tempAccount = await accountsModel
                    .findAccount(accountNumber);

                // Verify if the account is active
                const Verify = accountsModel
                    .verifyAccountStatus(tempAccount, 'active');

                const tempTransaction = await ModelFunction(tempAccount,
                    amount, tempUser);

                if (Verify) {
                    // Sending back the required object
                    result.status = resStatus;
                    result.message = `Account ${operation}ed successfully`;
                    result.data = {
                        transactionId: tempTransaction.id,
                        accountNumber: tempAccount.accountNumber,
                        amount,
                        cashier: tempUser.id,
                        transactionType: tempTransaction.type,
                        accountBalance: tempTransaction.newBalance,
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
    /**
        * POST - /<account-number>/credit Credit a bank account.
    */
        await makeTransaction(req, res, 'credit', transactionsModel
            .saveTransaction.credit);
    },
    debitAccount: async (req, res) => {
    /**
        * POST - /<account-number>/debit Debit a bank account.
    */
        await makeTransaction(req, res, 'debit', transactionsModel
            .saveTransaction.debit);
    },
};
