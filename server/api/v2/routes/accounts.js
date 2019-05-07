import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validateBody from '../../../middlewares/validate.body';
import validateRoute from '../../../middlewares/validate.routes';

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
        validateRoute.token('user'),
        validateRoute.accountCreation,
        createAccount);

accountsRouter
    .patch('/:accountNumber',
        validateBody(true, 'activateDeactivateAccount'),
        validateRoute.checkAccountNumber,
        validateRoute.token('admin/staff'),
        validateRoute.adminStaffAuthorization('activate/deactivate'),
        activateDeactivateAccount);

accountsRouter
    .delete('/:accountNumber',
        validateRoute.checkAccountNumber,
        validateRoute.token('admin/staff'),
        validateRoute.adminStaffAuthorization('activate/deactivate'),
        deleteAccount);

accountsRouter
    .get('/:accountNumber/transactions',
        validateRoute.checkAccountNumber,
        getAccountTransactions);

accountsRouter
    .get('/:userEmail/accounts',
        getSpecificUserAccounts);

accountsRouter
    .get('/:accountNumber',
        validateRoute.checkAccountNumber,
        getSpecificAccount);

accountsRouter
    .get('',
        getAllAccounts);

export default accountsRouter;
