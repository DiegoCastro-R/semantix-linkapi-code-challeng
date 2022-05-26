import { Request, Response } from 'express'

import { DeleteFileUseCase } from './DeleteFileUseCase'
import Validator from './DeleteFileValidator'

export class DeleteFileController {
    async handle(req: Request, res: Response) {
        try {
            const { fileName, folderName } = req.body;
            const { error } = Validator.validate(req.body)
            if (error) {
                res.statusCode = 400;
                return res.json({ error: error.details[0].message })
            }
            const deleteFile = new DeleteFileUseCase()
            const response = await deleteFile.execute(fileName, folderName)
            if (response === "Folder does not exists") {
                throw new Error("Folder does not exists, please create it before use")
            }

            if (response === "File does not exists") {
                throw new Error("File with this name does not exists")
            }
            res.statusCode = 201
            return res.json({ message: response })
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
