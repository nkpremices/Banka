/**
 * Library for storing and creating data
 * @name dataStructureDb
 */

/**
 * A class to generate a unique schema to all the users
 *
 * @class UsersSchema
 */
class UsersSchema {
    /**
     *Creates an instance of UsersSchema.
     * @param {Number} id - The id of the user
     * @param {String} email - The email of the user
     * @param {String} firstName - The first name of the user
     * @param {String} lastName - The last name of the user
     * @param {String} password - The password of the user
     * @param {String} type -The Type of the user
     * @param {boolean} isAdmin - The admin right of the user
     * @param {bolean} isLoggedIn - The login state of the user
     * @memberof UsersSchema
     */
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

    /**
     * A method to login a user
     *
     * @memberof UsersSchema
     */
    login() {
        this.isLoggedIn = true;
    }
}

/**
 * A class to give a unique schema to all the bank accounts
 *
 * @class AccountsSchema
 */
class AccountsSchema {
    /**
     *Creates an instance of AccountsSchema.
     * @param {number} id - The id of the account
     * @param {String} accountName - The acount name
     * @param {string} accountNumber - The account number
     * @param {Date} createdOn - The creation date
     * @param {Number} owner - The id of the owner of the account
     * @param {String} type - The type of the account
     * @param {String} status - The status of the account
     * @param {String} currency - The currency of the account
     * @param {Number} balance - The account balance
     * @memberof AccountsSchema
     */
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

    /**
     * A method to change the status of an account instance
     *
     * @param {String} status - The new status
     * @memberof AccountsSchema
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     * Amethod to increase the amount of an account
     *
     * @param {Number} amount - The new amount
     * @returns {Number} balance - The new balance of the
     * account instance
     * @memberof AccountsSchema
     */
    credit(amount) {
        this.balance += amount;
        return this.balance;
    }

    /**
     * Amethod to decrease the amount of an account
     *
     * @param {Number} amount - The new amount
     * @returns {Number} balance - The new balance of the
     * account instance
     * @memberof AccountsSchema
     */
    debit(amount) {
        this.balance -= amount;
        return this.balance;
    }
}

// a schema of all the transactions
/**
 * A class to give a unique schema to all transactions
 *
 * @class TransactionsSchema
 */
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
