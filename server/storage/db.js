const usersTable = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(128) UNIQUE NOT NULL,
  firstname VARCHAR(128) NULL,
  lastname VARCHAR(128) NULL,  
  password VARCHAR(128) NOT NULL,
  type VARCHAR(128) NULL,
  isadmin BOOLEAN DEFAULT FALSE,
  isloggedin BOOLEAN DEFAULT FALSE
);`;
const accountsTable = `CREATE TABLE IF NOT EXISTS
accounts(
  id SERIAL PRIMARY KEY,
  accountname VARCHAR(128) UNIQUE NOT NULL,
  accountnumber FLOAT NOT NULL,
  createdon FLOAT NOT NULL,  
  owner INTEGER REFERENCES users(id) NOT NULL,
  type VARCHAR(128) NOT NULL,
  status VARCHAR(128) NOT NULL,
  currency VARCHAR(128) NOT NULL,
  balance FLOAT NOT NULL
);`;

const tables = {
    usersTable,
    accountsTable,
};

export default tables;
