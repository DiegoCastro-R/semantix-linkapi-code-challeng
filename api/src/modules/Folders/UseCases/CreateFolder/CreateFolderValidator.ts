import Joi from 'joi';

const Schema = Joi.object({
    folderName: Joi.string().required(),
})

export default Schema;