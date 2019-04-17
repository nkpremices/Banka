import dotenv from 'dotenv';
/**
 * Create and export environment variables
 */

dotenv.config();

const appPort = process.env.PORT;
const saltingRounds = process.env.SALTING_ROUNDS;
const jwtKey = process.env.JWT_KEY;
const accountNumberLength = process.env.ACCOUNT_NUMBER_LENGTH;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPasswor = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const envName = process.env.NODE_ENV;

const environments = {
    test: {
        name: envName,
        app: {
            port: appPort,
        },
        database: {
            user: dbUser,
            host: dbHost,
            name: dbName,
            password: dbPasswor,
            port: dbPort,
        },
        admin: {
            token: process.env.ADMIN_TOKEN,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        },
        saltingRounds,
        jwtKey,
        accountNumberLength,
    },

    development: {
        name: envName,
        app: {
            port: appPort,
        },
        database: {
            user: dbUser,
            host: dbHost,
            name: dbName,
            password: dbPasswor,
            port: dbPort,
        },
        saltingRounds,
        jwtKey,
        accountNumberLength,
    },

    staging: {
        name: envName,
        app: {
            port: appPort,
        },
        database: {
            user: dbUser,
            host: dbHost,
            name: dbName,
            password: dbPasswor,
            port: dbPort,
        },
        saltingRounds,
        jwtKey,
        accountNumberLength,
    },
};

// Determine which environment we are in
const currentEnvironment = typeof (envName) === 'string'
    ? process.env.NODE_ENV.toLowerCase() : '';

/* Check that the current environment is one the envs
   defined above, if not default to dev
*/
const environment = typeof (environments[currentEnvironment]) === 'object'
    ? environments[currentEnvironment] : environments.development;

// Export the module
export default environment;
