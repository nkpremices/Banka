import { Router } from 'express';
import transactionsController from '../controllers/transactions';
import validateBody from '../../../middlewares/validate.body';
import validateAuthRoutes from '../../../middlewares/validate.auth.routes';
import validateAccRoutes from '../../../middlewares/validate.accounts.routes';
import validTransRoutes from '../../../middlewares/validate.trans.routes';

const transactionsRouter = Router();
const {
    creditAccount,
    debitAccount,
    getSpecificTransaction,
} = transactionsController;

transactionsRouter
    .post('/:accountNumber/credit',
        validateBody(true, 'creditDebitAccount'),
        validateAccRoutes.checkAccountNumber,
        validateAuthRoutes.token('staff(cashier)'),
        validTransRoutes.creditDebitAccount('credit'),
        creditAccount);

transactionsRouter
    .post('/:accountNumber/debit',
        validateBody(true, 'creditDebitAccount'),
        validateAccRoutes.checkAccountNumber,
        validateAuthRoutes.token('staff(cashier)'),
        validTransRoutes.creditDebitAccount('credit'),
        debitAccount);

transactionsRouter
    .get('/:transactionId',
        validateAuthRoutes.token('user'),
        validateAuthRoutes.checkUserLogin('get a transaction record details'),
        getSpecificTransaction);

export default transactionsRouter;
