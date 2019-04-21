import { Router } from 'express';
import transactionsController from '../controllers/transactions';
import validate from '../../../middlewares/validation';

const transactionsRouter = Router();
const {
    creditAccount,
    debitAccount,
} = transactionsController;

transactionsRouter
    .post('/:accountNumber/credit',
        validate(true, 'creditDebitAccount'), creditAccount);
transactionsRouter
    .post('/:accountNumber/debit',
        validate(true, 'creditDebitAccount'), debitAccount);

export default transactionsRouter;
