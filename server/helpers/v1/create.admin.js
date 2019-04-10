import usersModel from '../../api/v1/models/auth';
import createHash from '../generate.hash';

export default async () => {
    const admin = {
        email: 'premices@gmail.com',
        firstName: 'premices',
        lastName: 'tuverer',
        password: 'dddddd4U',
        type: 'staff',
        isAdmin: 'true',
    };
    const hashedPass = await createHash(admin.password);
    // trying to insert a user
    // eslint-disable-next-line no-unused-vars
    const tempUser = await usersModel.saveUser(admin.email,
        admin.firstName, admin.lastName, hashedPass,
        admin.type, admin.isAdmin, false);
    console.log('admin created...', tempUser.id);
};
