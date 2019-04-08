import usersModel from '../models/auth';
import createHash from '../../../helpers/generate.hash';
import createToken from '../../../helpers/generate.token';
import userVerification from '../../../helpers/v1/auth.verifications';

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
        const verifications = userVerification(email);
        if (!verifications) {
            try {
                const hashedPass = await createHash(password);
                // trying to insert a user
                const tempUser = await usersModel.saveUser(email,
                    firstName, lastName, hashedPass, type, isAdmin, false);

                const token = createToken(tempUser);
                result.status = status;
                result.data = {
                    token,
                    firstName: tempUser.firstName,
                    lastName: tempUser.lastName,
                    email: tempUser.email,
                };
                res.status(status).json(result);
            } catch (error) {
                res.status(status = 400).json(`${error}`);
            }
        } else {
            result.status = 400;
            result.data = {
                error: 'Email address already in use',
            };
            res.status(400).json(result);
        }
    },
};
