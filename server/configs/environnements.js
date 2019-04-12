import dotenv from 'dotenv';
/**
 * Create and export environment variables
 */

dotenv.config();

const appPort = process.env.PORT;
const saltingRounds = process.env.SALTING_ROUNDS;
const jwtKey = process.env.JWT_KEY;
const accountNumberLength = process.env.ACCOUNT_NUMBER_LENGTH;
const environments = {
    test: {
        app: {
            port: appPort,
        },
        saltingRounds,
        jwtKey,
        accountNumberLength,
        adminToken: process.env.ADMIN_TOKEN,
        adminEmail: process.env.ADMIN_EMAIL,
        adminPassword: process.env.ADMIN_PASSWORD,
    },

    development: {
        app: {
            port: appPort,
        },
        saltingRounds,
        jwtKey,
        accountNumberLength,
    },

    staging: {
        app: {
            port: appPort,
        },
        saltingRounds,
        jwtKey,
        accountNumberLength,
    },
};

// Determine which environment we are in
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string'
    ? process.env.NODE_ENV.toLowerCase() : '';

/* Check that the current environment is one the envs
   defined above, if not default to dev
*/
const environment = typeof (environments[currentEnvironment]) === 'object'
    ? environments[currentEnvironment] : environments.development;

// Export the module
export default environment;
