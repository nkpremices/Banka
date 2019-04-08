import jwt from 'jsonwebtoken';

const createToken = (tempUser) => {
    const playLoad = {
        id: tempUser.id,
        email: tempUser.email,
    };
    const secretKey = process.env.JWT_KEY;
    const options = {
        expiresIn: '30d',
    };
    const token = jwt.sign(playLoad, secretKey, options);
    return token;
};

export default createToken;
