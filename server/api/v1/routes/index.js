import express from 'express';
import authRouter from './auth';
import accountsRouter from './accounts';
import transactionsRouter from './transactions';

const v1 = express();


v1.use('/auth', authRouter);
v1.use('/accounts', accountsRouter);
v1.use('/transactions', transactionsRouter);

export default v1;
