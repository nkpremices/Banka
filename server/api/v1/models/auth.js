import dataStructureDb from '../../../storage/data.structures';


let id = 0;

// a function to save a user when requested
const saveUser = (email, firstName,
    // eslint-disable-next-line no-unused-vars
    lastName, password) => new Promise((resolve, reject) => {
    // creating a temp user
    const tempUser = new dataStructureDb.schemas.UsersSchema(id += 1,
        email, firstName, lastName, password);

    // Storing the user
    dataStructureDb.storages.usersStorage.push(tempUser);
    resolve(tempUser);
});

const usersModel = {
    saveUser,
};

export default usersModel;
