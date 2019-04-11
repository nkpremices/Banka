import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validate from '../../../middlewares/validation';

const accountsRouter = Router();
const {
    createAccount,
    activateDeactivateAccount,
    deleteAccount,
} = accountsController;

accountsRouter
    .post('', validate(true, 'createBankAccount'), createAccount);
accountsRouter
    .patch('/:accountNumber', validate(true, 'activateDeactivateAccount'),
        activateDeactivateAccount);
accountsRouter
    .delete('/:accountNumber', deleteAccount);
export default accountsRouter;
