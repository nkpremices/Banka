import { Router } from 'express';
import transactionsController from '../controllers/transactions';
import validateBdy from '../../../middlewares/validate.body';

const transactionsRouter = Router();
const {
    creditAccount,
    debitAccount,
} = transactionsController;

transactionsRouter
    .post('/:accountNumber/credit',
        validateBdy(true, 'creditDebitAccount'), creditAccount);
transactionsRouter
    .post('/:accountNumber/debit',
        validateBdy(true, 'creditDebitAccount'), debitAccount);

export default transactionsRouter;
