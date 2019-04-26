/**
 * The v1 users model file
 * Conataining all the functions interacting with the users table
 * @name usersModelV1
 */

import dataStructureDb from '../../../storage/data.structures';
import comparePasswords from '../../../helpers/compare.passwords';
import decodeJwt from '../../../helpers/decode.token';


let id = 0;

/**
 * A function to save a user when requested
 *
 * @param {String} email - The email of the user
 * @param {String} firstName - The first name of the user
 * @param {String} lastName - The last name of the user
 * @param {String} password - The password of the user
 * @param {String} type - The type of the user
 * @param {boolean} isAdmin - True if it's an admin user
 * @param {boolean} isLoggedIn - True if the user is logged in
 * @returns {Promise}
 */
const saveUser = (email, firstName, lastName, password, type,
    isAdmin, isLoggedIn) => new Promise((resolve, reject) => {
    try {
        // creating a temp user
        const tempUser = new dataStructureDb.schemas.UsersSchema(id += 1,
            email, firstName, lastName, password, type, isAdmin, isLoggedIn);

        // Storing the user
        dataStructureDb.storages.usersStorage.push(tempUser);

        resolve(tempUser);
    } catch (error) {
        reject(new Error('Error on trying to store the user'));
    }
});


/**
 * A function to validate a token. It decodes it
 * then see if there is a user that matches in the database
 *
 * @param {String} token - The provided token
 * @returns {Object} tempUsr - The object containing the users
 * informations
 */
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

/**
 * A function to verify if a stored user is an admin
 * on admin/staff account creation
 * @param {String} email - The provided email from the client
 * @param {String} type - The provided type from the client
 * @param {Boolean} isAdmin - True if it's an admin
 * @param {String} AdminToken - The  token of the user
 * @returns {object} retObj - An object to map the
 * verification process
 */
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

/**
 * A function to check users credentials on login
 *
 * @param {String} email - The providded email
 * @param {String} password - The provided password
 * @returns {Promise}
 */
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
            reject(new Error('Error when trying to compare passwords'));
        }
        if (passwordVerification) resolve(verify.tempUser);
        resolve(retObj);
    }
    resolve(retObj);
});


/**
 * A function to login a user
 *
 * @param {Object} user - The user to login
 */
const loginUser = (user) => {
    user.login();
};

const usersModel = {
    saveUser,
    findUser,
    loginUser,
    VerifiUser,
    verifyToken,
};

export default usersModel;
