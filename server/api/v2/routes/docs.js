import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../../docs/v2/swagger.json';

const v2Docs = express();


// Swagger documentation
v2Docs.use('', swaggerUI.serve);
v2Docs.get('', swaggerUI.setup(swaggerDocument));

export default v2Docs;
