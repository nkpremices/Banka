/**
 * The v1 users model file
 * @name usersModelV1
 */

import generateRandomNumber from '../../../helpers/generate.random.number';
import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';

/**
 * A function to save an account when requested by the controller
 * @param {String} accountName - the name of the account
 * @param {String} currency - the account currency
 * @param {String} type - the account type
 * @param {String} status - the account status
 * @param {Object} user - an object containing all information
 *  about a user
 * @returns {Promise}
 */
const saveAccount = (accountName, currency,
    type, status, user) => new Promise(async (resolve, reject) => {
    // creating a temp account
    const accountNumber = generateRandomNumber();
    // an array to contain credetials
    const details = [
        accountName,
        accountNumber,
        Date.now(),
        user.id,
        type,
        status,
        currency,
        0,
    ];

    // Saving the account
    try {
        const tempAccount = await querryDb
            .query(queries.insertAccount, details);
        resolve(tempAccount.rows[0]);
    } catch (error) {
        reject(error);
    }
});

/**
 * An object to contain fuctions to call to get a record from
 * the database to verify it exists
 * @property {function} name - A function to get an account from
 * the database by the account name
 * @property {function} number - A function to get an account
 * from the database by acount number
 */
const verifyAccount = {
    /**
     * A function to get an account from the database
     * by the account name
     * @param {String} name - The account name of the account
     * @param {Number} owner - The Id of the owner
     * @returns {Promise}
     */
    name: (name, owner) => new Promise(async (resolve, reject) => {
        try {
            const tempAccount = await querryDb
                .query(queries.findAccountByNameAndOwner(name, owner));
            resolve(tempAccount.rows[0]);
        } catch (error) {
            reject(new Error('Error on account verification'));
        }
    }),
    /**
     * A function to get an account from the database
     * by acount number
     * @param {Number} number - The account number of
     * the account
     * @returns {Promise}
     */
    number: number => new Promise(async (resolve, reject) => {
        if (parseInt(number, 10)) {
            try {
                const tempAccount = await querryDb
                    .query(queries.findAccountByNumber(number));
                resolve(tempAccount.rows[0]);
            } catch (error) {
                reject(new Error('Error on account verification'));
            }
        } else {
            reject(new Error('Sorry, Error occured'));
        }
    }),
};

/**
 * A function to call to find an account for doing further
 * updates on it
 * @param {Number} accountNumber
 * @returns {Promise}
 */
const findAccount = accountNumber => new Promise(async (resolve, reject) => {
    // creating a temp account
    try {
        const tempAccount = await verifyAccount.number(accountNumber);
        if (tempAccount) resolve(tempAccount);
        else {
            const errorMsg = 'An account with number '
            + `${accountNumber} was not found`;
            reject(new Error(errorMsg));
        }
    } catch (error) {
        reject(error);
    }
});

/**
 * A function to verify the status of an account
 *
 * @param {Object} account - The account whose status is going
 * to be verified
 * @param {string} status - The status to check
 * @returns {boolean} retObj - True if the status is the same
 */
const verifyAccountStatus = (account,
    status) => new Promise(async (resolve, reject) => {
    try {
        const tempAccount = await querryDb
            .query(queries
                .findAccountByNumberAndStatus(account.accountnumber, status));
        resolve(tempAccount.rows[0]);
    } catch (error) {
        reject(new Error('Error on account status verification'));
    }
});

/**
 * A function to change the satus of an account
 * @param {Object} account - the account whose status
 * is going to be changed
 * @param {String} status - The new status
 * @returns {Promise}
 */
const changeAccountStatus = (account,
    status) => new Promise(async (resolve, reject) => {
    try {
        const tempAccount = await querryDb
            .query(queries.setAccountStatus(status, account.accountnumber));
        resolve(tempAccount.rows[0]);
    } catch (error) {
        reject(new Error('Error on trying to change the status'));
    }
});

/**
 * a function to delete an account when requested by
 * the controller
 * @param {Number} accountNumber
 * @returns {Promise}
 */
const deleteAccount = accountNumber => new Promise(async (resolve, reject) => {
    // creating a temp account
    const tempAccount = await verifyAccount.number(accountNumber);
    if (tempAccount) {
        if (tempAccount.balance === 0) {
            await querryDb
                .query(queries.deleteAccountByNumber(accountNumber));
            resolve(tempAccount);
        } else {
            const errorMsg = 'The account has a non zero balance: '
            + `${tempAccount.balance}. Please, debit it first`;
            reject(new Error(errorMsg));
        }
    } else {
        const errorMsg = 'An account with the provided '
        + 'number was not found';
        reject(new Error(errorMsg));
    }
});

/**
 * A function to get  all the accounts of a
 * specific user
 * @param {owner} owner - the owner of the accounts
 * @returns {Promise}
 */
const getSpecifiUsersAccounts = owner => new Promise(async (resolve,
    reject) => {
    try {
        const clientAccounts = await querryDb
            .query(queries.findAccountsByOwner(owner));
        resolve(clientAccounts.rows);
    } catch (error) {
        reject(error);
    }
});


/**
 * A function to fetch all accounts records
 * @returns {Promise}
 */
const getAllAccounts = () => new Promise(async (resolve, reject) => {
    try {
        const Accounts = await querryDb
            .query(queries.getAllAccounts);
        resolve(Accounts.rows);
    } catch (error) {
        reject(new Error('Error while trying to fetch all accounts'));
    }
});
/**
 * A function to get all accounts by status
 * @param {String} status - the status of the accounts
 * @returns {Promise}
 */
const getAccountsByStatus = status => new Promise(async (resolve, reject) => {
    try {
        const Accounts = await querryDb
            .query(queries.getAccountsBySttatus(status));
        resolve(Accounts.rows);
    } catch (error) {
        reject(new Error('Error while trying to fetch all accounts'));
    }
});

const accountsModel = {
    saveAccount,
    verifyAccount,
    findAccount,
    verifyAccountStatus,
    changeAccountStatus,
    deleteAccount,
    getSpecifiUsersAccounts,
    getAllAccounts,
    getAccountsByStatus,
};

export default accountsModel;
