import querryDb from '../../../helpers/v2/db.connector';
import queries from '../../../helpers/v2/db.querries';
import decodeJwt from '../../../helpers/decode.token';


// a function to save a user when requested
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

// A fuction to validate the decoded data
const verifyToken = token => new Promise(async (resolve, reject) => {
    const userInfo = decodeJwt(token);
    let tempUser;
    try {
        if (userInfo) {
            tempUser = await querryDb
                .query(queries
                    .findUserByEmailAndId(userInfo.id, userInfo.email));
        }
        resolve(tempUser.rows[0]);
    } catch (error) {
        reject(new Error('Error on token verification'));
    }
});

// A function to verify if a stored user is an admin
// on admin/staff account creation
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
                if (admin && admin.isAdmin && admin.isLoggedIn) {
                    retObj.foundAdmin = true;
                }
            }
        }
        resolve(retObj);
    } catch (error) {
        reject(new Error('Error on email verification'));
    }
});

const usersModel = {
    saveUser,
    VerifyUser,
};

export default usersModel;
