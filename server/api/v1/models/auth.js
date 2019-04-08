import dataStructureDb from '../../../storage/data.structures';


let id = 0;

// a function to save a user when requested
const saveUser = (email, firstName,
    lastName, password, type, // eslint-disable-next-line no-unused-vars
    isAdmin, isLoggedIn) => new Promise((resolve, reject) => {
    // creating a temp user
    const tempUser = new dataStructureDb.schemas.UsersSchema(id += 1,
        email, firstName, lastName, password, type, isAdmin, isLoggedIn);

    // Storing the user
    dataStructureDb.storages.usersStorage.push(tempUser);
    // console.log(dataStructureDb.storages.usersStorage);
    resolve(tempUser);
});

const usersModel = {
    saveUser,
};

export default usersModel;
