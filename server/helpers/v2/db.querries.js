/**
 * Here will be all the needed queries */

const insertUser = `INSERT INTO users (email, firstname, lastname,
    password, type, isadmin, isloggedin)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;
const insertAccount = `INSERT INTO accounts (accountname, accountnumber, 
    createdon, owner, type, status, currency, balance)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
const findUserByEmail = email => `SELECT * FROM users WHERE email = '${email}'`;

const findUserByEmailAndId = (id, email) => `SELECT * FROM users WHERE 
    (id = '${id}' AND email = '${email}')`;

const findAccountByNameAndOwner = (accountname,
    owner) => `SELECT * FROM accounts WHERE 
    (accountname = '${accountname}' AND owner = '${owner}')`;

const findAccountByNumber = accountNumber => `SELECT * FROM 
    accounts WHERE accountnumber = '${accountNumber}'`;

const findAccountByNumberAndStatus = (accountnumber,
    status) => `SELECT * FROM accounts WHERE 
    (accountnumber = '${accountnumber}' AND status = '${status}')`;

const setAccountStatus = (status, accountNumber) => `UPDATE accounts 
    SET status =  '${status}' 
    WHERE accountnumber = ${accountNumber} returning *;`;

const dropTables = `DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;`;

const setUserLogedIn = id => `UPDATE users SET 
    isloggedin = true WHERE id = ${id};`;

const queries = {
    insertUser,
    findUserByEmail,
    findUserByEmailAndId,
    dropTables,
    setUserLogedIn,
    insertAccount,
    findAccountByNameAndOwner,
    findAccountByNumber,
    findAccountByNumberAndStatus,
    setAccountStatus,
};

export default queries;
