import jwt from 'jsonwebtoken';
import environment from '../configs/environnements';

const createToken = (tempUser) => {
    const playLoad = {
        id: tempUser.id,
        email: tempUser.email,
    };
    const options = {
        expiresIn: '30d',
    };
    const token = jwt.sign(playLoad, environment.jwtKey, options);
    return token;
};

export default createToken;
