/**
 * Library for storing and creating data
 */

// a schema of all the users
class UsersSchema {
    constructor(id,
        email, firstName, lastName,
        password, type, isAdmin, isLoggedIn) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.type = type;
        this.isAdmin = isAdmin;
        this.isLoggedIn = isLoggedIn;
    }
}

// a schema of all the bank accounts
class AccountsSchema {
    constructor(id,
        accountName, accountNumber, createdOn, owner,
        type, status, balance) {
        this.id = id;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.createdOn = createdOn;
        this.owner = owner;
        this.type = type;
        this.status = status;
        this.balance = balance;
    }
}


const usersStorage = [];
const accountsStorage = [];

const dataStructureDb = {
    schemas: {
        UsersSchema,
        AccountsSchema,
    },
    storages: {
        usersStorage,
        accountsStorage,
    },
};

export default dataStructureDb;
