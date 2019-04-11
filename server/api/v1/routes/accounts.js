import { Router } from 'express';
import accountsController from '../controllers/accounts';
import validate from '../../../middlewares/validation';

const accountsRouter = Router();
const {
    createAccount,
    activateDeactivateAccount,
} = accountsController;

accountsRouter
    .post('', validate(true, 'createBankAccount'), createAccount);
accountsRouter
    .patch('/:accountNumber', validate(true, 'activateDeactivateAccount'),
        activateDeactivateAccount);

export default accountsRouter;
