import jwt from 'jsonwebtoken';
import environment from '../configs/environnements';

// a function to decode the token
const decodeJwt = (token) => {
    let retObj;
    jwt.verify(token, environment.jwtKey, (err, decodedObj) => {
        if (!err) retObj = decodedObj;
    });
    return retObj;
};

export default decodeJwt;
