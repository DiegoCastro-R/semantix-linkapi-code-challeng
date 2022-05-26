import { CreateFolderController } from '../../../../modules/Folders/UseCases/CreateFolder'
import { Router } from 'express'

const createFolderController = new CreateFolderController()

const FolderRouter = Router();


FolderRouter.post("/create", createFolderController.handle);

export { FolderRouter }