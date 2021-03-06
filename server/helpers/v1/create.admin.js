/**
 * Create the first admin of v1
 * @name createAdminV1
 */

import usersModel from '../../api/v1/models/auth';
import createHash from '../generate.hash';

/**
 * A function to create the first v1 admin
 * @returns {Promise}
 */
export default async () => {
    const admin = {
        email: 'admin@gmail.com',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'passWord1',
        type: 'staff',
        isAdmin: 'true',
    };
    const hashedPass = await createHash(admin.password);
    // trying to insert a user
    // eslint-disable-next-line no-unused-vars
    const tempUser = await usersModel.saveUser(admin.email,
        admin.firstName, admin.lastName, hashedPass,
        admin.type, admin.isAdmin, false);
};
