import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validateBody from '../../../middlewares/validate.body';
import validateAuthRoutes from '../../../middlewares/validate.auth.routes';
import validateAccRoutes from '../../../middlewares/validate.accounts.routes';

const accountsRouter = Router();
const {
    createAccount,
    activateDeactivateAccount,
    deleteAccount,
    getAccountTransactions,
    getSpecificUserAccounts,
    getSpecificAccount,
    getAllAccounts,
} = accountsController;

accountsRouter
    .post('',
        validateBody(true, 'createBankAccount'),
        validateAuthRoutes.token('user'),
        validateAccRoutes.accountCreation,
        createAccount);

accountsRouter
    .patch('/:accountNumber',
        validateBody(true, 'activateDeactivateAccount'),
        validateAccRoutes.checkAccountNumber,
        validateAuthRoutes.token('admin/staff'),
        validateAuthRoutes.adminStaffAuthorization('activate/deactivate'),
        activateDeactivateAccount);

accountsRouter
    .delete('/:accountNumber',
        validateAccRoutes.checkAccountNumber,
        validateAuthRoutes.token('admin/staff'),
        validateAuthRoutes.adminStaffAuthorization('delete'),
        deleteAccount);

accountsRouter
    .get('/:accountNumber/transactions',
        validateAccRoutes.checkAccountNumber,
        validateAuthRoutes.token('user'),
        validateAccRoutes.getAccountTransactions,
        getAccountTransactions);

accountsRouter
    .get('/:userEmail/accounts',
        validateAuthRoutes.checkEmail,
        validateAuthRoutes.token('admin/staff'),
        validateAuthRoutes.adminStaffAuthorization('View all accounts '
            + 'owned by a specific user'),
        getSpecificUserAccounts);

accountsRouter
    .get('/:accountNumber',
        validateAccRoutes.checkAccountNumber,
        validateAuthRoutes.token('user'),
        validateAuthRoutes.checkUserLogin('get a specific account\'s details'),
        validateAccRoutes.getSpecificAccount,
        getSpecificAccount);

accountsRouter
    .get('/own/:userEmail',
        validateAuthRoutes.checkEmail,
        validateAuthRoutes.token('user'),
        validateAuthRoutes.checkUserLogin('a list of his own accounts'),
        validateAccRoutes.getOwnAccounts,
        getSpecificUserAccounts);

accountsRouter
    .get('',
        validateAuthRoutes.token('admin/staff'),
        validateAuthRoutes.adminStaffAuthorization('View all accounts'),
        getAllAccounts);

export default accountsRouter;
