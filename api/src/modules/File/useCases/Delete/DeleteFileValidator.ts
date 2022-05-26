import Joi from "joi";

const Schema = Joi.object({
    fileName: Joi.string().required(),
    folderName: Joi.string().required(),
})

export default Schema;