import querryDb from '../helpers/v2/db.connector';
import tables from '../storage/db';
import queries from '../helpers/v2/db.querries';

const admin = [
    'admin@gmail.com',
    'firstName',
    'lastName',
    'passWord1',
    'staff',
    'true',
    'false',
];

const initializeDb = async () => {
    try {
        await querryDb.query(tables.usersTable);
        const tempUser = await querryDb
            .query(queries.findUserByEmail(admin[0]));
        if (!tempUser.rows[0]) {
            await querryDb.query(queries.insertUser, admin);
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

export default initializeDb;
