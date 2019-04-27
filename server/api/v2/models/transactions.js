/**
 * The v2 transactions model file
 * @name transactionsModelV2
 */

import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';


/**
 * An obect to contain methods to save a
 * transaction wether it's credit or debit
 * @property {function} credit - The function
 * to credit an account
 * @property {function} debit - The function
 * to debit an account
 */
const saveTransaction = {
    /**
     * A fuction to credit an account
     *
     * @param {Object} tempAccount - The account to credit
     * @param {Number} amount - The amount of money to credit
     * @param {Number} cashier - The id of the cashier who
     * executes the transaction
     * @returns {Promise}
     */
    credit: (tempAccount,
        amount, cashier) => new Promise(async (resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // Credit the account
        const details = [
            Date.now(),
            'credit',
            tempAccount.accountnumber,
            cashier.id,
            amount,
            oldBalance,
            oldBalance + amount,
        ];
        // creating a temp transaction
        let tempTransaction;
        try {
            try {
                tempTransaction = await querryDb
                    .query(queries.setAccountBalance(oldBalance + amount,
                        tempAccount.accountnumber));
            } catch (error) {
                reject(new Error('Error on trying to update the balance'));
            }
            tempTransaction = await querryDb
                .query(queries.insertTransaction, details);
        } catch (error) {
            reject(new Error('Error on transaction creation'));
        }
        resolve(tempTransaction.rows[0]);
    }),
    /**
     * A fuction to debit an account
     *
     * @param {Object} tempAccount - The account to debit
     * @param {Number} amount - The amount of money to debit
     * @param {Number} cashier - The id of the cashier who
     * executes the transaction
     * @returns {Promise}
     */
    debit: (tempAccount,
        amount, cashier) => new Promise(async (resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // verify if the account has sufficient balance
        if (oldBalance < amount) {
            const errorMsg = 'Insufficient balance for this transaction';
            reject(new Error(errorMsg));
        } else {
            // Debit the account
            const details = [
                Date.now(),
                'debit',
                tempAccount.accountnumber,
                cashier.id,
                amount,
                oldBalance,
                oldBalance - amount,
            ];
            // creating a temp transaction
            let tempTransaction;
            try {
                try {
                    tempTransaction = await querryDb
                        .query(queries.setAccountBalance(oldBalance - amount,
                            tempAccount.accountnumber));
                } catch (error) {
                    reject(new Error('Error on trying to update the balance'));
                }
                tempTransaction = await querryDb
                    .query(queries.insertTransaction, details);
            } catch (error) {
                reject(new Error('Error on transaction creation'));
            }
            resolve(tempTransaction.rows[0]);
        }
    }),
};

/**
 * An object to contain all fuctions to find transactions records
 * @property {function} all - A function for geting all records
 * @property {function} specific - A function for geting a
 * specific reccord
 */
const findTransactions = {
    /**
     * A function for geting all records
     *
     * @param {String} accountNumber - The account mumber of the
     * requested account
     * @returns {Promise}
     */
    all: async accountNumber => new Promise(async (resolve, reject) => {
        try {
            const transactions = await querryDb
                .query(queries.findTransactionsByAcNumber(accountNumber));
            resolve(transactions.rows);
        } catch (error) {
            const err = 'Error on trying to find the transaction by Number';
            reject(new Error(err));
        }
    }),
    /**
     * A function for geting a specific transaction
     *
     * @param {String} transactionId - The Id of the
     * transaction
     * @returns {Promise}
     */
    specific: async transactionId => new Promise(async (resolve, reject) => {
        try {
            const transactions = await querryDb
                .query(queries.findTransactionById(transactionId));
            resolve(transactions.rows);
        } catch (error) {
            const err = 'Error on trying to find the transaction by Id';
            reject(new Error(err));
        }
    }),
};

const transactionsModel = {
    saveTransaction,
    findTransactions,
};

export default transactionsModel;
