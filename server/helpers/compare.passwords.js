import bcrypt from 'bcrypt';

const comparePasswords = (tempUser,
    password) => new Promise((resolve, reject) => {
    try {
        bcrypt.compare(password, tempUser.password).then((match) => {
            if (match) resolve(true);
            else resolve(false);
        });
    } catch (error) {
        reject(error);
    }
});

export default comparePasswords;
