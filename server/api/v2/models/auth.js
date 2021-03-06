/**
 * The v2 users model file
 * Conataining all the functions interacting with the users table
 * @name usersModelV2
 */
import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';
import decodeJwt from '../../../helpers/decode.token';
import comparePasswords from '../../../helpers/compare.passwords';


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
const saveUser = (email, firstName,
    lastName, password, type,
    isAdmin, isLoggedIn) => new Promise(async (resolve, reject) => {
    // an array to contain credetials
    const credentials = [
        email,
        firstName,
        lastName,
        password,
        type,
        isAdmin,
        isLoggedIn,
    ];

    // Storing the user

    try {
        const tempUser = await querryDb.query(queries.insertUser, credentials);
        resolve(tempUser.rows[0]);
    } catch (error) {
        reject(error);
    }
});

/**
 * A function to validate a token. It decodes it
 * then see if there is a user that matches in the database
 *
 * @param {String} token - The provided token
 * @returns {Object} tempUsr - The object containing the users
 * informations
 * @returns {Promise}
 */
const verifyToken = token => new Promise(async (resolve, reject) => {
    let tempUser;
    try {
        const userInfo = decodeJwt(token);
        if (userInfo) {
            tempUser = await querryDb
                .query(queries
                    .findUserByEmailAndId(userInfo.id, userInfo.email));
            resolve(tempUser.rows[0]);
        }
        resolve(userInfo);
    } catch (error) {
        reject(new Error('Error on token verification'));
    }
});

/**
 * A function to verify if a stored user is an admin
 * on admin/staff account creation
 * @param {String} email - The provided email from the client
 * @param {String} type - The provided type from the client
 * @param {Boolean} isAdmin - True if it's an admin
 * @param {String} AdminToken - The  token of the user
 * @returns {Promise}
 */
const VerifyUser = (email, type, isAdmin,
    AdminToken) => new Promise(async (resolve, reject) => {
    try {
        // trying to find the email
        const tempUser = await querryDb
            .query(queries.findUserByEmail(email));

        const retObj = {
            foundEmail: false,
            adminOrStaffReq: false,
            foundToken: false,
            foundAdmin: false,
            tempUser: tempUser.rows[0],
        };

        if (tempUser.rows[0]) {
            retObj.foundEmail = true;
        } else // Seing if the account desired to create is 'staff or admin'
        if (type === 'staff' || isAdmin === true) {
            retObj.adminOrStaffReq = true;
            // See if a token was provided
            if (AdminToken) {
                retObj.foundToken = true;
                const admin = await verifyToken(AdminToken);

                // See if the provided token is an admin token
                if (admin && admin.isadmin && admin.isloggedin) {
                    retObj.foundAdmin = true;
                }
            }
        }
        resolve(retObj);
    } catch (error) {
        reject(new Error('Error on email verification'));
    }
});

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

    try {
        // finding a user by his email
        const verify = await VerifyUser(email);
        if (verify.tempUser) {
            retObj.foundEmail = true;
            let passwordVerification;
            // verifying if the password matches
            try {
                passwordVerification = await comparePasswords(verify.tempUser,
                    password);
            } catch (error) {
                reject(new Error('Error on password comparison'));
            }
            if (passwordVerification) resolve(verify.tempUser);
            resolve(retObj);
        }
        resolve(retObj);
    } catch (error) {
        reject(new Error('Error on trying to find the user'));
    }
});

/**
 * A function to login a user
 *
 * @param {Object} user - The user to login
 * @returns {Promise}
 */
const loginUser = user => new Promise(async (resolve, reject) => {
    try {
        const tempUser = await querryDb
            .query(queries.setUserLogedIn(user.id));
        resolve(tempUser);
    } catch (error) {
        reject(new Error('Error on login the user'));
    }
});

const usersModel = {
    saveUser,
    VerifyUser,
    findUser,
    loginUser,
    verifyToken,
};

export default usersModel;
