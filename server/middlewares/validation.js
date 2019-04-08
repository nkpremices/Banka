/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import Joi from 'joi';
import Schemas from '../helpers/validations.schemas';

export default (useJoiError = false, schema) => {
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    // Allowed http methods
    const _supportedMethods = ['get', 'post', 'put', 'delete'];

    // Joi validation options
    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    // validation middleware
    // eslint-disable-next-line consistent-return
    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && _.has(Schemas, schema)) {
        // get the schema for the route
            const _schema = _.get(Schemas, schema);

            if (_schema) {
            // Validation happens here
                return Joi
                    .validate(req
                        .body, _schema, _validationOptions, (err, data) => {
                        if (!err) {
                            req.body = data;
                            next();
                        } else {
                            // Build error object
                            const errorObj = {
                                status: 400,
                                error: {
                                    message: err.details[0].message
                                        .replace(/['"]/g, ''),
                                },
                            };

                            // Default error
                            const defaultErr = {
                                status: 400,
                                error: 'Invalid request data. Try again',
                            };

                            res.status(400)
                                .json(_useJoiError ? errorObj : defaultErr);
                        }
                    });
            }
        }

        next();
    };
};
