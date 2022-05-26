import { Request, Response } from 'express'

import { CreateFolderUseCase } from './CreateFolderUseCase'
import Validator from './CreateFolderValidator'
export class CreateFolderController {
    async handle(req: Request, res: Response) {
        try {
            const { folderName } = req.body
            const { error } = Validator.validate(req.body)
            if (error) {
                res.statusCode = 400;
                return res.json({ error: error.details[0].message })
            }
            const createFolder = new CreateFolderUseCase();
            const response = await createFolder.execute(folderName);
            if (response === "Folder already exists") {
                throw new Error("Folder already exists")
            }
            res.statusCode = 201
            return res.json({ message: 'Folder created' })
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}



