import express from 'express';
import authRouter from './auth';
import accountsRouter from './accounts';
import transactionsRouter from './transactions';

const v1router = express();


v1router.use('/auth', authRouter);
v1router.use('/accounts', accountsRouter);
v1router.use('/transactions', transactionsRouter);

export default v1router;
