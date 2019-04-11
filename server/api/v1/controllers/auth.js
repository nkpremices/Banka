import usersModel from '../models/auth';
import createHash from '../../../helpers/generate.hash';
import createToken from '../../../helpers/generate.token';

export default {
/**
 * POST - /auth/signup Create a new user
 */
    signup: async (req, res) => {
        // sign up part of the users controller
        const result = {};
        let status = 200;
        const AdminToken = req.headers.token;

        // getting the body of the request
        const {
            email,
            firstName,
            lastName,
            password,
            type,
            isAdmin,
        } = req.body;

        // A function to querry the users model to save a user
        const userRegister = async (Email, FirstName,
            LastName, Password, Type, IsAdmin) => {
            try {
                const hashedPass = await createHash(Password);
                // trying to insert a user
                const tempUser = await usersModel.saveUser(Email,
                    FirstName, LastName, hashedPass, Type, IsAdmin, false);

                // Creating a token for the user
                const token = createToken(tempUser);
                // Sending the result
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
        };

        // Verifying the availability of the given fields
        const verify = usersModel.VerifiUser(email, type, isAdmin, AdminToken);
        // See the availability of the provided email
        if (!verify.foundEmail) {
            // see if it's an admin request
            if (verify.adminOrStaffReq) {
                if (verify.foundToken) {
                    if (verify.foundAdmin) {
                        userRegister(email, firstName, lastName,
                            password, type, isAdmin);
                    } else {
                        result.status = 400;
                        result.data = {
                            error: 'Invalid token provided'
                            + ' or the admin is not logged in',
                        };
                        res.status(400).json(result);
                    }
                } else {
                    result.status = 400;
                    result.data = {
                        error: 'Only an admin can create admin or staff'
                        + ' accounts.A token must be provided',
                    };
                    res.status(400).json(result);
                }
            } else {
                userRegister(email, firstName, lastName,
                    password, 'client', false);
            }
        } else {
            result.status = 400;
            result.data = {
                error: 'Email address already in use',
            };
            res.status(400).json(result);
        }
    },
    signin: async (req, res) => {
        // Signin part of the users controller
        const result = {};
        let status = 200;
        let tempUser;
        const { email, password } = req.body;

        // Trying to fetch the user from the storage
        try {
            tempUser = await usersModel.findUser(email, password);
        } catch (error) {
            res.status(status = 400).json(`${error}`);
        }

        // Send the required object if the user is found
        if (tempUser.email) {
            // creating a token
            const token = createToken(tempUser);

            // Changing the state of the user to 'logged in'
            usersModel.loginUser(tempUser);

            // Sending back the required object
            result.status = status;
            result.data = {
                token,
                id: tempUser.id,
                firstName: tempUser.firstName,
                lastName: tempUser.lastName,
                email: tempUser.email,
            };
            res.status(status).json(result);
        } else {
            // Send a custom message if the email is not found
            if (!tempUser.foundEmail) {
                result.status = 400;
                result.data = {
                    error: 'A user with that email doesn\'t exist',
                };
                res.status(400).json(result);
            }

            // Send a custom message if the password is incorect
            if (!tempUser.foundPassword) {
                if (tempUser.foundEmail) {
                    result.status = 404;
                    result.data = {
                        error: 'Incorect Password',
                    };
                    res.status(404).json(result);
                }
            }
        }
    },
};
