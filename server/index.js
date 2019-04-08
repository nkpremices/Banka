import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import v1 from './api/v1/routes';
import home from './api/v1/routes/home';
import environement from './configs/environnements';
import registerMiddleware from './middlewares/register';

dotenv.config();
const app = express();

// Register middleware
registerMiddleware(app);

app.use('/api/v1', v1);
app.use('/', home);

app.listen(`${environement.app.port}`, () => {
    // eslint-disable-next-line
    console.log(`Server now listening at localhost:${environement.app.port}`);
});

export default app;
