import { Request, Response } from 'express'

import { UploadFileUseCase } from './UploadFileUseCase'
import Validator from './UploadFileValidator'

export class CreateFileController {
    async handle(req: Request, res: Response) {
        try {
            const { file } = req
            const { folderName } = req.body;
            console.log({ file })
            const { error } = Validator.validate({ file, folderName })
            if (error) {
                res.statusCode = 400;
                return res.json({ error: error.details[0].message })
            }

            const uploadFile = new UploadFileUseCase();
            const data = await uploadFile.execute(file, folderName)
            if (data === "Folder does not exists") {
                throw new Error("Folder does not exists, please create it before use")
            }

            if (data === "File already exists") {
                throw new Error("File with this name already exists")
            }
            res.statusCode = 201
            console.log(data)
            return res.json({ message: data })
        } catch (err) {
            console.log(err.message)
            return res.status(400).json({ error: err.message });
        }
    }
}



