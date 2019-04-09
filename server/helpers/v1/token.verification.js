import jwt from 'jsonwebtoken';
import environment from '../../configs/environnements';
import dataStructureDb from '../../storage/data.structures';

// a function to decode the token
const decodeJwt = (token) => {
    let retObj;
    jwt.verify(token, environment.jwtKey, (err, decodedObj) => {
        if (!err) retObj = decodedObj;
    });
    return retObj;
};

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

export default verifyToken;
