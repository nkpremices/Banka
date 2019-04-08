import express from 'express';
import authRouter from './auth';

const v1 = express();


v1.use('/auth', authRouter);

export default v1;
