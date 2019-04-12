import dataStructureDb from '../../../storage/data.structures';

let id = 0;

// a function to save a transaction when requested
const saveTransaction = {
    // eslint-disable-next-line no-unused-vars
    credit: (tempAccount, amount, cashier) => new Promise((resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // Credit the account
        const newBalance = tempAccount.credit(amount);
        // creating a temp transaction
        const tempTransaction = new dataStructureDb.schemas
            .TransactionsSchema(id += 1, Date.now(), 'credit',
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
