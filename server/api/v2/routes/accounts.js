import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validateBody from '../../../middlewares/validation';
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
    .post('', validateBody(true, 'createBankAccount'), createAccount);
accountsRouter
    .patch('/:accountNumber', validateBody(true, 'activateDeactivateAccount'),
        validateRoute.checkAccountNumber, activateDeactivateAccount);
accountsRouter
    .delete('/:accountNumber', validateRoute.checkAccountNumber, deleteAccount);
accountsRouter
    .get('/:accountNumber/transactions', validateRoute.checkAccountNumber,
        getAccountTransactions);
accountsRouter
    .get('/:userEmail/accounts', getSpecificUserAccounts);
accountsRouter
    .get('/:accountNumber', validateRoute.checkAccountNumber,
        getSpecificAccount);
accountsRouter
    .get('', getAllAccounts);

export default accountsRouter;
