import express from 'express';
import authRouter from './auth';
import accountsRouter from './accounts';

const v1 = express();


v1.use('/auth', authRouter);
v1.use('/accounts', accountsRouter);

export default v1;
