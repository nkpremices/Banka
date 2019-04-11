import dataStructureDb from '../../../storage/data.structures';
import generateRandomNumber from '../../../helpers/generate.random.number';


let id = 0;

// a function to save an account when requested
const saveAccount = (accountName, currency,
    // eslint-disable-next-line no-unused-vars
    type, status, user) => new Promise((resolve, reject) => {
    // creating a temp account
    const accountNumber = generateRandomNumber();
    const tempAccount = new dataStructureDb.schemas
        .AccountsSchema(id += 1, accountName, accountNumber,
            Date.now(), user.id, type, status, currency, 0);

    // Storing the account
    dataStructureDb.storages.accountsStorage.push(tempAccount);
    resolve(tempAccount);
});

const verifyAccount = {
    name: (name, owner) => dataStructureDb.storages
        .accountsStorage
        .find(el => el.accountName === name && el.owner === owner),
    number: number => dataStructureDb.storages
        .accountsStorage
        .find(el => el.accountNumber === number),

};

//  a function to activate/deactivate an account when requested
// eslint-disable-next-line no-unused-vars
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

// A function to change an accounts status
const changeAccountStatus = (account, status) => {
    const storage = dataStructureDb.storages.accountsStorage;
    storage[storage.indexOf(account)].status = status;
};

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

//  a function to delete an account when requested
const deleteAccount = accountNumber => new Promise((resolve, reject) => {
    const storage = dataStructureDb.storages.accountsStorage;

    // creating a temp account
    const tempAccount = verifyAccount.number(accountNumber);
    if (tempAccount) {
        storage.splice(storage.indexOf(tempAccount), 1);
        resolve(tempAccount);
    } else {
        const errorMsg = 'An account with the provided '
        + 'number was not found';
        reject(new Error(errorMsg));
    }
});


const usersModel = {
    saveAccount,
    findAccount,
    changeAccountStatus,
    deleteAccount,
    verifyAccount,
    verifyAccountStatus,
};

export default usersModel;
