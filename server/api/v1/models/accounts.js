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
            Date.now(), user.id, type, status, 0);

    // Storing the account
    dataStructureDb.storages.accountsStorage.push(tempAccount);
    // console.log(dataStructureDb.storages.accountsStorage);
    resolve(tempAccount);
});


const usersModel = {
    saveAccount,
};

export default usersModel;
