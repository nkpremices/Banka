/**
 * Here will be all the needed queries */

// General queries
const dropTables = `DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS transactions CASCADE;`;

// Auth queries
const insertUser = `INSERT INTO users (email, firstname, lastname,
    password, type, isadmin, isloggedin)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

const findUserByEmail = email => `SELECT * FROM users WHERE email = '${email}'`;

const findUserByEmailAndId = (id, email) => `SELECT * FROM users WHERE 
    (id = '${id}' AND email = '${email}')`;

const insertAccount = `INSERT INTO accounts (accountname, accountnumber, 
    createdon, owner, type, status, currency, balance)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;

const setUserLogedIn = id => `UPDATE users SET 
    isloggedin = true WHERE id = ${id};`;

// Accounts queries
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

const deleteAccountByNumber = number => `DELETE FROM accounts
    WHERE accountnumber = '${number}'`;

const setAccountBalance = (balance, accountNumber) => `UPDATE accounts 
    SET balance =  '${balance}' 
    WHERE accountnumber = ${accountNumber} returning *;`;

// Transactions queries
const insertTransaction = `INSERT INTO transactions (createdon, type, 
    accountnumber, cashier, amount, oldbalance, newbalance)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

const findTransactionsByAcNumber = accountNumber => `SELECT * FROM transactions 
    WHERE accountnumber = '${accountNumber}'`;


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
    deleteAccountByNumber,
    insertTransaction,
    setAccountBalance,
    findTransactionsByAcNumber,
};

export default queries;
