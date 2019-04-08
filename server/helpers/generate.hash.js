import bcrypt from 'bcrypt';
import environment from '../configs/environnements';


const createHash = password => new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(environment.saltingRounds, 10),
        (err, hash) => {
            if (err) return reject(err);
            resolve(hash);
            return hash;
        });
});

export default createHash;
