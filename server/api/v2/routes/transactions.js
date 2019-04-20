import { Router } from 'express';
import transactionsController from '../controllers/transactions';
import validate from '../../../middlewares/validation';

const transactionsRouter = Router();
const {
    creditAccount,
    debitAccount,
    getSpecificTransaction,
} = transactionsController;

transactionsRouter
    .post('/:accountNumber/credit',
        validate(true, 'creditDebitAccount'), creditAccount);
transactionsRouter
    .post('/:accountNumber/debit',
        validate(true, 'creditDebitAccount'), debitAccount);
transactionsRouter
    .get('/:transactionId', getSpecificTransaction);

export default transactionsRouter;
