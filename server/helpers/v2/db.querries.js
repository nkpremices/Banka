/**
 * Here will be all the needed queries */

const insertUser = `INSERT INTO users (email, firstName, lastName,
    password, type, isAdmin, isLogedIn)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
const findUserByEmail = email => `SELECT * FROM users WHERE email = '${email}'`;
const findUserByEmailAndId = (id, email) => `SELECT * FROM users WHERE 
    (id = '${id}' AND email = '${email}')`;
const dropTables = 'DROP TABLE IF EXISTS users CASCADE;';

const queries = {
    insertUser,
    findUserByEmail,
    findUserByEmailAndId,
    dropTables,
};

export default queries;
