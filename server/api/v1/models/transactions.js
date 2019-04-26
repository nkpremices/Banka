/**
 * The v1 transactions model file
 * @name transactionsModelV1
 */

import dataStructureDb from '../../../storage/data.structures';

let id = 0;

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
    credit: (tempAccount, amount, cashier) => new Promise((resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // Credit the account
        const newBalance = tempAccount.credit(amount);
        // creating a temp transaction
        try {
            const tempTransaction = new dataStructureDb.schemas
                .TransactionsSchema(id += 1, Date.now(), 'credit',
                    tempAccount.accountNumber, cashier.id, amount,
                    oldBalance, newBalance);
            // Storing the transaction
            dataStructureDb.storages.transactionsStorage.push(tempTransaction);
            resolve(tempTransaction);
        } catch (error) {
            reject(new Error('Error when trying to save the transaction'));
        }
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
    debit: (tempAccount, amount, cashier) => new Promise((resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // verify if the account has sufficient balance
        if (oldBalance < amount) {
            const errorMsg = 'Insufficient balance for this transaction';
            reject(new Error(errorMsg));
        }
        // Debit the account
        const newBalance = tempAccount.debit(amount);
        // creating a temp transaction
        const tempTransaction = new dataStructureDb.schemas
            .TransactionsSchema(id += 1, Date.now(), 'debit',
                tempAccount.accountNumber, cashier.id, amount,
                oldBalance, newBalance);
        // Storing the transaction
        dataStructureDb.storages.transactionsStorage.push(tempTransaction);
        resolve(tempTransaction);
    }),
};


const transactionsModel = {
    saveTransaction,
};

export default transactionsModel;
