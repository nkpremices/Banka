/**
 * Library for storing and editing data
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

const usersStorage = [];

const dataStructureDb = {
    schemas: {
        UsersSchema,
    },
    storages: {
        usersStorage,
    },
};

export default dataStructureDb;
