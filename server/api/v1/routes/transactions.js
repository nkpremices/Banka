import { Router } from 'express';
import transactionsController from '../controllers/transactions';
import validate from '../../../middlewares/validation';

const transactionsRouter = Router();
const {
    creditAccount,
} = transactionsController;

transactionsRouter
    .post('/:accountNumber/credit',
        validate(true, 'creditAccount'), creditAccount);

export default transactionsRouter;
