import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import configs from './configs/configs';

dotenv.config();
const app = express();

const environment = process.env.NODE_ENV; // development
const stage = configs.development;

if (environment !== 'production') {
    app.use(logger('dev'));
}


app.get('/', (req, res) => {
    const status = 200;
    const result = {
        status,
        data: {
            message: 'Welcome on Banka',
        },
    };
    res.status(status).json(result);
});

app.listen(`${stage.port}`, () => {
    // eslint-disable-next-line
    console.log(`Server now listening at localhost:${stage.port}`);
});

export default app;
