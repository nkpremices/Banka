/**
 * The v1 accounts model file
 * Conataining all the functions interacting with the accounts
 * table
 * @name acountsModelV1
 */

import dataStructureDb from '../../../storage/data.structures';
import generateRandomNumber from '../../../helpers/generate.random.number';


let id = 0;

/**
 * A function to save an account when requested by the controller
 * @param {String} accountName - the name of the account
 * @param {String} currency - the account currency
 * @param {String} type - the account type
 * @param {String} status - the account status
 * @param {Object} user - an object containing all information
 * @returns {Promise}
 *  about a user
 */
const saveAccount = (accountName, currency,
    type, status, user) => new Promise((resolve, reject) => {
    try {
        // creating a temp account
        const accountNumber = generateRandomNumber();
        const tempAccount = new dataStructureDb.schemas
            .AccountsSchema(id += 1, accountName, accountNumber,
                Date.now(), user.id, type, status, currency, 0);

        // Storing the account
        dataStructureDb.storages.accountsStorage.push(tempAccount);
        resolve(tempAccount);
    } catch (error) {
        reject(new Error('Error when trying to save the account'));
    }
});

/**
 * An object to contain fuctions to call to get a record from
 * the database to verify it exists
 * @property {function} name - A function to get an account from
 * the database by the account name
 * @property {function} number - A function to get an account
 * from the database by acount number
 * @returns {Promise}
 */

const verifyAccount = {
    /**
     * A function to get an account from the database
     * by the account name
     * @param {String} name - The account name of the account
     * @param {Number} owner - The Id of the owner
     */
    name: (name, owner) => dataStructureDb.storages
        .accountsStorage
        .find(el => el.accountName === name && el.owner === owner),
    /**
     * A function to get an account from the database
     * by acount number
     * @param {Number} number - The account number of
     * the account
     */
    number: number => dataStructureDb.storages
        .accountsStorage
        .find(el => el.accountNumber === number),

};

/**
 * A function to call to find an account for doing further
 * updates on it
 * @param {Number} accountNumber
 * @returns {Promise}
 */
const findAccount = accountNumber => new Promise((resolve, reject) => {
    // creating a temp account
    const tempAccount = verifyAccount.number(accountNumber);
    if (tempAccount) resolve(tempAccount);
    else {
        const errorMsg = 'An account with the provided '
        + 'number was not found';
        reject(new Error(errorMsg));
    }
});

/**
 * A function to change the satus of an account
 * @param {Object} account - the account whose status
 * is going to be changed
 * @param {String} status - The new status
 */
const changeAccountStatus = (account, status) => {
    account.setStatus(status);
};


/**
 * A function to verify the status of an account
 *
 * @param {Object} account - The account whose status is going
 * to be verified
 * @param {string} status - The status to check
 * @returns {boolean} retObj - True if the status is the same
 */
const verifyAccountStatus = (account, status) => {
    const storage = dataStructureDb.storages.accountsStorage;
    let retObj = false;
    const tempAccount = storage
        .find(el => el.accountNumber === account.accountNumber
        && el.status === status);
    // See if the status is the same
    if (tempAccount) retObj = true;
    return retObj;
};


/**
 * a function to delete an account when requested by
 * the controller
 * @param {Number} accountNumber - the account number
 * @returns {Promise}
 */
const deleteAccount = accountNumber => new Promise((resolve, reject) => {
    const storage = dataStructureDb.storages.accountsStorage;

    // creating a temp account
    const tempAccount = verifyAccount.number(accountNumber);
    if (tempAccount) {
        if (tempAccount.balance === 0) {
            storage.splice(storage.indexOf(tempAccount), 1);
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


const accountsModel = {
    saveAccount,
    findAccount,
    changeAccountStatus,
    deleteAccount,
    verifyAccount,
    verifyAccountStatus,
};

export default accountsModel;
