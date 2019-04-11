import dataStructureDb from '../../storage/data.structures';

const storage = dataStructureDb.storages.accountsStorage;

const changeAccountStatus = (account, status) => {
    let retObj = false;
    const tempAccount = storage
        .find(el => el.accountNumber === account.accountNumber
        && el.status === status);
    // See if the status is the same
    if (tempAccount) retObj = true;

    // If not, change the status
    else storage[storage.indexOf(account)].status = status;
    return retObj;
    // console.log(storage);
};

export default changeAccountStatus;
