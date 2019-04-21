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
    const tempAccount = await querryDb.query(queries.insertAccount, details);
    resolve(tempAccount.rows[0]);
});

const verifyAccount = {
    name: (name, owner) => new Promise(async (resolve, reject) => {
        try {
            const tempAccount = await querryDb
                .query(queries.findAccountByNameAndOwner(name, owner));
            // console.log(tempAccount.rows[0]);
            resolve(tempAccount.rows[0]);
        } catch (error) {
            reject(new Error('Error on account verification'));
        }
    }),
};


const accountsModel = {
    saveAccount,
    verifyAccount,
};

export default accountsModel;
