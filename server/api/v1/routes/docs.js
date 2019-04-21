import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../docs/v1/swagger.json';

const v1Docs = express();


// Swagger documentation
v1Docs.use('', swaggerUI.serve);
v1Docs.get('', swaggerUI.setup(swaggerDocument));

export default v1Docs;
