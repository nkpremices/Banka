import dotenv from 'dotenv';
/**
 * Create and export environment variables
 */

dotenv.config();

const appPort = process.env.PORT;
const saltingRounds = process.env.SALTING_ROUNDS;
const jwtKey = process.env.JWT_KEY;

const environments = {
    test: {
        app: {
            port: appPort || 3000,
        },
        saltingRounds,
        jwtKey,
    },

    development: {
        app: {
            port: appPort || 3000,
        },
        saltingRounds,
        jwtKey,
    },

    staging: {
        app: {
            port: appPort || 3000,
        },
        saltingRounds,
        jwtKey,
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
