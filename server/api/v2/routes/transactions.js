import { Router } from 'express';
import transactionsController from '../controllers/transactions';
import validateBody from '../../../middlewares/validate.body';
import validateRoute from '../../../middlewares/validate.routes';

const transactionsRouter = Router();
const {
    creditAccount,
    debitAccount,
    getSpecificTransaction,
} = transactionsController;

transactionsRouter
    .post('/:accountNumber/credit',
        validateBody(true, 'creditDebitAccount'),
        validateRoute.checkAccountNumber, creditAccount);
transactionsRouter
    .post('/:accountNumber/debit',
        validateBody(true, 'creditDebitAccount'),
        validateRoute.checkAccountNumber, debitAccount);
transactionsRouter
    .get('/:transactionId', getSpecificTransaction);

export default transactionsRouter;
