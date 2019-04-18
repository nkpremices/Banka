/**
 * Here will be all the needed queries */

const insertUser = `INSERT INTO users (email, firstname, lastname,
    password, type, isadmin, isloggedin)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
const findUserByEmail = email => `SELECT * FROM users WHERE email = '${email}'`;
const findUserByEmailAndId = (id, email) => `SELECT * FROM users WHERE 
    (id = '${id}' AND email = '${email}')`;
const dropTables = 'DROP TABLE IF EXISTS users CASCADE;';
const setUserLogedIn = id => `UPDATE users SET 
    isloggedin = true WHERE id = ${id};`;

const queries = {
    insertUser,
    findUserByEmail,
    findUserByEmailAndId,
    dropTables,
    setUserLogedIn,
};

export default queries;
