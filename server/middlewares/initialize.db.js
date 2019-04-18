import querryDb from '../helpers/v2/db.connector';
import tables from '../storage/db';
import queries from '../helpers/v2/db.querries';
import createHash from '../helpers/generate.hash';

const admin = [
    'admin@gmail.com',
    'firstName',
    'lastName',
    'passWord1',
    'staff',
    'true',
    'false',
];

const createTables = () => new Promise(async (resolve, reject) => {
    try {
        await querryDb.query(tables.usersTable);
        await querryDb.query(tables.accountsTable);
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
