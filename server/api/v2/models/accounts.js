import generateRandomNumber from '../../../helpers/generate.random.number';
import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';

// a function to save an account when requested
const saveAccount = (accountName, currency,
    // eslint-disable-next-line no-unused-vars
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
        reject(new Error('Error on account saving'));
    }
});

const verifyAccount = {
    name: (name, owner) => new Promise(async (resolve, reject) => {
        try {
            const tempAccount = await querryDb
                .query(queries.findAccountByNameAndOwner(name, owner));
            resolve(tempAccount.rows[0]);
        } catch (error) {
            reject(new Error('Error on account verification'));
        }
    }),
    number: number => new Promise(async (resolve, reject) => {
        try {
            const tempAccount = await querryDb
                .query(queries.findAccountByNumber(number));
            resolve(tempAccount.rows[0]);
        } catch (error) {
            reject(new Error('Error on account verification'));
        }
    }),
};

//  a function to activate/deactivate an account when requested
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

// A function to verify the account status
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

// A function to change an accounts status
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

const accountsModel = {
    saveAccount,
    verifyAccount,
    findAccount,
    verifyAccountStatus,
    changeAccountStatus,
};

export default accountsModel;