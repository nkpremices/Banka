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

    login() {
        this.isLoggedIn = true;
    }
}

// a schema of all the bank accounts
class AccountsSchema {
    constructor(id,
        accountName, accountNumber, createdOn, owner,
        type, status, currency, balance) {
        this.id = id;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.createdOn = createdOn;
        this.owner = owner;
        this.type = type;
        this.status = status;
        this.currency = currency;
        this.balance = balance;
    }

    setStatus(status) {
        this.status = status;
    }

    credit(amount) {
        this.balance += amount;
        return this.balance;
    }

    debit(amount) {
        this.balance -= amount;
        return this.balance;
    }
}

// a schema of all the transactions
class TransactionsSchema {
    constructor(id, createdOn, type,
        accountNumber, cashier,
        amount, oldBalance, newBalance) {
        this.id = id;
        this.createdOn = createdOn;
        this.type = type;
        this.accountNumber = accountNumber;
        this.cashier = cashier;
        this.amount = amount;
        this.oldBalance = oldBalance;
        this.newBalance = newBalance;
    }
}


const usersStorage = [];
const accountsStorage = [];
const transactionsStorage = [];

const dataStructureDb = {
    schemas: {
        UsersSchema,
        AccountsSchema,
        TransactionsSchema,
    },
    storages: {
        usersStorage,
        accountsStorage,
        transactionsStorage,
    },
};

export default dataStructureDb;
