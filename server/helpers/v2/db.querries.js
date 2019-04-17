/**
 * Here will be all the needed queries */

const insertUser = `INSERT INTO users (email, firstName, lastName,
    password, type, isAdmin, isLogedIn)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
const findUserByEmail = email => `SELECT * FROM users WHERE email = '${email}'`;

const queries = {
    insertUser,
    findUserByEmail,
};

export default queries;
