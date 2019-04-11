import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import v1 from './api/v1/routes/index';
import docs from './api/v1/routes/docs';
import home from './api/v1/routes/home';
import environement from './configs/environnements';
import registerMiddleware from './middlewares/register';
import createAdmin from './helpers/v1/create.admin';

dotenv.config();
const app = express();

// Register middleware
registerMiddleware(app);

// Creating the admin
createAdmin();

app.use('/api/v1', v1);
app.use('/docs/v1', docs);
app.use('/', home);

app.listen(`${environement.app.port}`, () => {
    // eslint-disable-next-line
    console.log(`Server now listening at localhost:${environement.app.port}`);
});

export default app;
