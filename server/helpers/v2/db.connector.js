import { Pool } from 'pg';
import environment from '../../configs/environnements';

const pool = new Pool({
    user: environment.database.user,
    host: environment.database.host,
    database: environment.database.name,
    password: environment.database.password,
    port: environment.database.port,
});

pool.on('connect', () => {
    console.log('connected to the db');
});

const querryDb = {
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};

export default querryDb;
