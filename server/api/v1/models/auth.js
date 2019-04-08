import dataStructureDb from '../../../storage/data.structures';
import userVerification from '../../../helpers/v1/auth.verifications';
import verifyPassword from '../../../helpers/v1/password.verification';


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

// A function to find if a user is stored
// eslint-disable-next-line no-unused-vars
const findUser = (email, password) => new Promise(async (resolve, reject) => {
    // finding a user by his email
    const tempUser = userVerification(email);
    if (tempUser) {
        // verifying if the password matches
        try {
            if (await verifyPassword(tempUser, password)) resolve(tempUser);
        } catch (error) {
            reject(error);
        }
    }
    resolve(false);
});

const usersModel = {
    saveUser,
    findUser,
};

export default usersModel;
