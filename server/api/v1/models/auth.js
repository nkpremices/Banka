import dataStructureDb from '../../../storage/data.structures';
import comparePasswords from '../../../helpers/compare.passwords';
import decodeJwt from '../../../helpers/decode.token';


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

// A fuction to validate the decoded data
const verifyToken = (token) => {
    const userInfo = decodeJwt(token);
    let tempUser;
    if (userInfo) {
        tempUser = dataStructureDb.storages.usersStorage
            .find(el => (el.id === userInfo.id)
            && (el.email === userInfo.email));
    }
    return tempUser;
};

const VerifiUser = (email, type, isAdmin, AdminToken) => {
    const tempUser = dataStructureDb
        .storages.usersStorage
        .find(el => el.email === email);
    const retObj = {
        foundEmail: false,
        adminOrStaffReq: false,
        foundToken: false,
        foundAdmin: false,
        tempUser,
    };

    if (tempUser) {
        retObj.foundEmail = true;
    } else // Seing if the account desired to create is 'staff or admin'
    if (type === 'staff' || isAdmin === true) {
        retObj.adminOrStaffReq = true;
        // See if a token was provided
        if (AdminToken) {
            retObj.foundToken = true;
            const admin = verifyToken(AdminToken);
            // See if the provided token is an admin token
            if (admin && admin.isAdmin && admin.isLoggedIn) {
                retObj.foundAdmin = true;
            }
        }
    }
    return retObj;
};

// A function to find if a user is stored
// eslint-disable-next-line no-unused-vars
const findUser = (email, password) => new Promise(async (resolve, reject) => {
    // An object to return
    const retObj = {
        foundEmail: false,
        foundPassword: false,
    };
    // finding a user by his email
    const verify = VerifiUser(email);
    if (verify.tempUser) {
        retObj.foundEmail = true;
        let passwordVerification;
        // verifying if the password matches
        try {
            passwordVerification = await comparePasswords(verify.tempUser,
                password);
        } catch (error) {
            reject(error);
        }
        if (passwordVerification) resolve(verify.tempUser);
        resolve(retObj);
    }
    resolve(retObj);
});

// A function to login a user
const loginUser = (user) => {
    const storage = dataStructureDb.storages.usersStorage;
    storage[storage.indexOf(user)].isLoggedIn = true;
    // console.log(storage);
};

const usersModel = {
    saveUser,
    findUser,
    loginUser,
    VerifiUser,
    verifyToken,
};

export default usersModel;
