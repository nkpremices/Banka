import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import environment from '../configs/environnements';

export default (app) => {
    app
    // Parse req object and make data available on req.body
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
    // Allow cross origin requests
        .use(cors());

    if (process.env.NODE_ENV !== 'test' && environment !== 'production') {
    // Logging http requests
        app.use(logger('dev'));
    }
};
