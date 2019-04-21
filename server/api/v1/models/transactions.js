import dataStructureDb from '../../../storage/data.structures';

let id = 0;

// a function to save a transaction when requested
const saveTransaction = {
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
