import Joi from 'joi';

const Schema = Joi.object({
    file: Joi.object({
        filename: Joi.string().required(),
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        size: Joi.number().required(),
        destination: Joi.string().required(),
        path: Joi.string().required(),
    }),
    folderName: Joi.string().required(),
})

export default Schema;