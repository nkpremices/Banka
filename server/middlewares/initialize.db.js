/**
 * A module to initialize the database every time it's needed
 * @name initializeDb
 */
import querryDb from '../helpers/v2/db.connector';
import tables from '../storage/db';
import queries from '../helpers/v2/db.querries';
import createHash from '../helpers/generate.hash';

// The first admin credentials
const admin = [
    'admin@gmail.com',
    'firstName',
    'lastName',
    'passWord1',
    'staff',
    'true',
    'false',
];

/**
 * A function to create tables and insert the first admin
 * every time it's needed
 * @returns {Promise}
 *
 */
const createTables = () => new Promise(async (resolve, reject) => {
    try {
        await querryDb.query(tables.usersTable);
        await querryDb.query(tables.accountsTable);
        await querryDb.query(tables.transactionsTable);
        const tempUser = await querryDb
            .query(queries.findUserByEmail(admin[0]));
        if (!tempUser.rows[0]) {
            const hashedPass = await createHash(admin[3]);
            admin[3] = hashedPass;
            await querryDb.query(queries.insertUser, admin);
        }
        resolve();
    } catch (error) {
        // eslint-disable-next-line no-console
        reject(error);
    }
});

/**
 * A function to drop all the tables from the database
 * every time it's needed
 * @returns {Promise}
 *
 */
const dropTables = () => new Promise(async (resolve, reject) => {
    try {
        await querryDb
            .query(queries.dropTables);
        resolve();
    } catch (error) {
        reject(error);
    }
});

const initializeDb = {
    createTables,
    dropTables,

};

export default initializeDb;
