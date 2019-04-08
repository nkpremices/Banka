import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../docs/v1/swagger.json';

const docs = express();


// Swagger documentation
docs.use('', swaggerUI.serve);
docs.get('', swaggerUI.setup(swaggerDocument));

export default docs;
