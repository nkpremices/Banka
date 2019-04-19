import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';


// a function to save a transaction when requested
const saveTransaction = {
    credit: (tempAccount,
        amount, cashier) => new Promise(async (resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // Credit the account
        const details = [
            Date.now(),
            'credit',
            tempAccount.accountnumber,
            cashier.id,
            amount,
            oldBalance,
            oldBalance + amount,
        ];
        // creating a temp transaction
        let tempTransaction;
        try {
            try {
                tempTransaction = await querryDb
                    .query(queries.setAccountBalance(oldBalance + amount,
                        tempAccount.accountnumber));
            } catch (error) {
                reject(new Error('Error on trying to update the balance'));
            }
            tempTransaction = await querryDb
                .query(queries.insertTransaction, details);
        } catch (error) {
            reject(new Error('Error on transaction creation'));
        }
        resolve(tempTransaction.rows[0]);
    }),
    debit: (tempAccount,
        amount, cashier) => new Promise(async (resolve, reject) => {
        // get the old balance of the account
        const oldBalance = tempAccount.balance;
        // verify if the account has sufficient balance
        if (oldBalance < amount) {
            const errorMsg = 'Insufficient balance for this transaction';
            reject(new Error(errorMsg));
        } else {
            // Debit the account
            const details = [
                Date.now(),
                'debit',
                tempAccount.accountnumber,
                cashier.id,
                amount,
                oldBalance,
                oldBalance - amount,
            ];
            // creating a temp transaction
            let tempTransaction;
            try {
                try {
                    tempTransaction = await querryDb
                        .query(queries.setAccountBalance(oldBalance - amount,
                            tempAccount.accountnumber));
                } catch (error) {
                    reject(new Error('Error on trying to update the balance'));
                }
                tempTransaction = await querryDb
                    .query(queries.insertTransaction, details);
            } catch (error) {
                reject(new Error('Error on transaction creation'));
            }
            resolve(tempTransaction.rows[0]);
        }
    }),
};


const transactionsModel = {
    saveTransaction,
};

export default transactionsModel;
