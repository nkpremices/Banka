/**
 * Library for storing and editing data
 */

// a schema of all the users
class UsersSchema {
    constructor(id,
        email, firstName, lastName,
        password) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
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
