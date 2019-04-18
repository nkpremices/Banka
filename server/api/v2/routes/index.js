import express from 'express';
import authRouter from './auth';
import accountsRouter from './accounts';


const v2 = express();


v2.use('/auth', authRouter);
v2.use('/accounts', accountsRouter);

export default v2;
