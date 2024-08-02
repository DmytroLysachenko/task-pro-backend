import HttpError from './HttpError.js';
const validateBody = (schema) => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error && error.message === '"value" must have at least 1 key') {
            next(HttpError(400, 'Body must have at least one field'));
        }
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};
export default validateBody;
