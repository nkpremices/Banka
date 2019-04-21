import express from 'express';
import authRouter from './auth';
import accountsRouter from './accounts';
import transactionsRouter from './transactions';

const v2 = express();


v2.use('/auth', authRouter);
v2.use('/accounts', accountsRouter);
v2.use('/transactions', transactionsRouter);

export default v2;
