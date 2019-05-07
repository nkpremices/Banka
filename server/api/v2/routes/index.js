import express from 'express';
import authRouter from './auth';
import accountsRouter from './accounts';
import transactionsRouter from './transactions';


const v2router = express();

v2router.use('/auth', authRouter);
v2router.use('/accounts', accountsRouter);
v2router.use('/transactions', transactionsRouter);
v2router.use('/user', accountsRouter);

export default v2router;
