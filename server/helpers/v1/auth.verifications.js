import dataStructureDb from '../../storage/data.structures';
import verifyToken from './token.verification';

const userVerification = (email, type, isAdmin, AdminToken) => {
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

export default userVerification;
