import '@babel/polyfill';
import express from 'express';
import defaultErrorController from './api/v2/controllers/default';
import v1router from './api/v1/routes/index';
import v1Docs from './api/v1/routes/docs';
import v2router from './api/v2/routes/index';
import v2Docs from './api/v2/routes/docs';
import home from './api/v1/routes/home';
import environement from './configs/environnements';
import register from './middlewares/register';
import createAdmin from './helpers/v1/create.admin';
import initializeDb from './middlewares/initialize.db';


const app = express({ strict: true });

// Register middleware
register(app);

// Creating the admin v1
createAdmin();

// Initializing the db v2
if (environement.name === 'development') {
    initializeDb.dropTables().then(() => {
        initializeDb.createTables();
    });
} else initializeDb.createTables();


// App for v1
app.use('/api/v1', v1router);
app.use('/docs/v1', v1Docs);

// App for v2
app.use('/api/v2', v2router);
app.use('/docs/v2', v2Docs);

app.use('/', home);

// default error messages
app.get('*', defaultErrorController);
app.post('*', defaultErrorController);
app.delete('*', defaultErrorController);
app.patch('*', defaultErrorController);

app.listen(environement.app.port, () => {
    // eslint-disable-next-line
    console.log(`Server now listening at localhost:${environement.app.port}`);
});

export default app;
