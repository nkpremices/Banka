import usersModel from '../models/auth';
import createHash from '../../../helpers/generate.hash';
import createToken from '../../../helpers/generate.token';
import userVerification from '../../../helpers/v1/auth.verifications';
import register from '../../../helpers/v1/register.user';

export default {
/**
 * POST - /auth/signup Create a new user
 */
    signup: async (req, res) => {
        // sign up part of the users controller
        const result = {};
        let status = 200;

        // getting the body for joi validation
        const {
            email,
            firstName,
            lastName,
            password,
            type,
            isAdmin,
        } = req.body;

        // Verifying the availability of the given fields
        const verify = userVerification(email);
        if (!verify) {
            try {
                const hashedPass = await createHash(password);
                // trying to insert a user
                const tempUser = await usersModel.saveUser(email,
                    firstName, lastName, hashedPass, type, isAdmin, false);

                const token = createToken(tempUser);
                result.status = status;
                result.data = {
                    token,
                    id: tempUser.id,
                    firstName: tempUser.firstName,
                    lastName: tempUser.lastName,
                    email: tempUser.email,
                };
                res.status(status).json(result);
            } catch (error) {
                res.status(status = 400).json(`${error}`);
            }
        } else {
            result.status = 404;
            result.data = {
                error: 'Email address already in use',
            };
            res.status(400).json(result);
        }
    },
    signin: async (req, res) => {
        let result = {};// eslint-disable-line
        let status = 200;
        let tempUser;
        const { email, password } = req.body;

        try {
            tempUser = await usersModel.findUser(email, password);
        } catch (error) {
            res.status(status = 400).json(`${error}`);
        }
        if (tempUser.email) {
            const token = createToken(tempUser);
            register.loginUser(tempUser);
            result.status = status;
            result.data = {
                token,
                id: tempUser.id,
                firstName: tempUser.firstName,
                lastName: tempUser.lastName,
                email: tempUser.email,
            };
            res.status(status).json(result);
        }
            if (!tempUser.foundEmail) {
                result.status = 404;
                result.data = {
                    error: 'A user with that email doesn\'t exist',
                };
                res.status(404).json(result);
            }
            if (!tempUser.foundPassword) {
                if (tempUser.foundEmail){
                    result.status = 404;
                result.data = {
                    error: 'Incorect Password',
                };
                res.status(404).json(result);
                }
            }
        
        
    },
};
