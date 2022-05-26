import { CreateFileController } from '../../../../modules/File/useCases/Upload';
import { DeleteFileController } from '../../../../modules/File/useCases/Delete'
import { Router } from 'express'
import upload from '../middlewares/multer';

const FileRouter = Router();

const createFileController = new CreateFileController();
const deleteFileController = new DeleteFileController();

FileRouter.post('/upload', upload.single('file'), createFileController.handle);
FileRouter.delete('/', deleteFileController.handle);

export { FileRouter }