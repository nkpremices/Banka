/**
 * Library for all the tables of the database
 * @name db
 */
// The users table
const usersTable = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(128) UNIQUE NOT NULL,
  firstname VARCHAR(128) NOT NULL,
  lastname VARCHAR(128) NOT NULL,  
  password VARCHAR(128) NOT NULL,
  type VARCHAR(128) NOT NULL,
  isadmin BOOLEAN DEFAULT FALSE,
  isloggedin BOOLEAN DEFAULT FALSE
);`;

// The accounts table
const accountsTable = `CREATE TABLE IF NOT EXISTS
accounts(
  id SERIAL PRIMARY KEY,
  accountname VARCHAR(128) UNIQUE NOT NULL,
  accountnumber FLOAT UNIQUE NOT NULL,
  createdon FLOAT NOT NULL,  
  owner INTEGER REFERENCES users(id) NOT NULL,
  type VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  currency VARCHAR(128) NOT NULL,
  balance FLOAT NOT NULL
);`;

// The transactions table
const transactionsTable = `CREATE TABLE IF NOT EXISTS
transactions(
  id SERIAL PRIMARY KEY,
  createdon FLOAT NOT NULL,
  type VARCHAR(128) NOT NULL,
  accountnumber FLOAT NOT NULL,
  cashier INTEGER REFERENCES users(id) NOT NULL,
  amount FLOAT NOT NULL,
  oldbalance FLOAT NOT NULL,
  newbalance FLOAT NOT NULL
);`;

const tables = {
    usersTable,
    accountsTable,
    transactionsTable,
};

export default tables;
