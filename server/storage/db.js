const usersTable = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(128) UNIQUE NOT NULL,
  firstname VARCHAR(128) NULL,
  lastname VARCHAR(128) NULL,  
  password VARCHAR(128) NOT NULL,
  type VARCHAR(128) NULL,
  isadmin BOOLEAN DEFAULT FALSE,
  islogedIn BOOLEAN DEFAULT FALSE
);`;

const tables = {
    usersTable,
};

export default tables;
