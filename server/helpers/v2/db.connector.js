/**
 * The database connection file
 * @name dbConnector
 */
import { Pool } from 'pg';
import environment from '../../configs/environnements';

/**
 * Creating a pull instance to use to connect to
 * connect to the database
 */
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
    /**
     * A function to call every time a connection is needed
     *
     * @param {String} text - the query text
     * @param {String} params - The query parametres
     * @returns {Promise}
     */
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
