import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validateBody from '../../../middlewares/validate.body';

const accountsRouter = Router();
const {
    createAccount,
    activateDeactivateAccount,
    deleteAccount,
} = accountsController;

accountsRouter
    .post('', validateBody(true, 'createBankAccount'), createAccount);
accountsRouter
    .patch('/:accountNumber', validateBody(true, 'activateDeactivateAccount'),
        activateDeactivateAccount);
accountsRouter
    .delete('/:accountNumber', deleteAccount);
export default accountsRouter;
