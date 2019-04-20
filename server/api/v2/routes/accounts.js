import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validate from '../../../middlewares/validation';

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
    .post('', validate(true, 'createBankAccount'), createAccount);
accountsRouter
    .patch('/:accountNumber', validate(true, 'activateDeactivateAccount'),
        activateDeactivateAccount);
accountsRouter
    .delete('/:accountNumber', deleteAccount);
accountsRouter
    .get('/:accountNumber/transactions', getAccountTransactions);
accountsRouter
    .get('/:userEmail/accounts', getSpecificUserAccounts);
accountsRouter
    .get('/:accountNumber', getSpecificAccount);
accountsRouter
    .get('', getAllAccounts);

export default accountsRouter;
