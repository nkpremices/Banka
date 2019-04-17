const usersTable = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(128) UNIQUE NOT NULL,
  firstName VARCHAR(128) NULL,
  lastName VARCHAR(128) NULL,  
  password VARCHAR(128) NOT NULL,
  type VARCHAR(128) NULL,
  isAdmin BOOLEAN DEFAULT FALSE,
  isLogedIn BOOLEAN DEFAULT FALSE
);`;

const tables = {
    usersTable,
};

export default tables;
