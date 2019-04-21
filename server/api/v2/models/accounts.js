import generateRandomNumber from '../../../helpers/generate.random.number';
import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';

// a function to save an account when requested
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
        reject(new Error('Error on account saving'));
    }
});

// A function to verify if an account is already stored
const verifyAccount = {
    // By name
    name: (name, owner) => new Promise(async (resolve, reject) => {
        try {
            const tempAccount = await querryDb
                .query(queries.findAccountByNameAndOwner(name, owner));
            resolve(tempAccount.rows[0]);
        } catch (error) {
            reject(new Error('Error on account verification'));
        }
    }),
    // By account number
    number: number => new Promise(async (resolve, reject) => {
        try {
            const tempAccount = await querryDb
                .query(queries.findAccountByNumber(number));
            resolve(tempAccount.rows[0]);
        } catch (error) {
            reject(error);
        }
    }),
};

//  a function to activate/deactivate an account when requested
const findAccount = accountNumber => new Promise(async (resolve, reject) => {
    // creating a temp account
    try {
        const tempAccount = await verifyAccount.number(accountNumber);
        if (tempAccount) resolve(tempAccount);
        else {
            const errorMsg = 'An account with the provided '
            + 'number was not found';
            reject(new Error(errorMsg));
        }
    } catch (error) {
        reject(error);
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

//  a function to delete an account when requested
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

// A function to get a specific user accounts
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

// A function to fetch all accounts records
const getAllAccounts = () => new Promise(async (resolve, reject) => {
    try {
        const Accounts = await querryDb
            .query(queries.getAllAccounts);
        resolve(Accounts.rows);
    } catch (error) {
        reject(new Error('Error while trying to fetch all accounts'));
    }
});

// A function to get all accounts by status
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
