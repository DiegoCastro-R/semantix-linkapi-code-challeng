import { deleteOneFile, findFileFromName, findOneFolderFromName } from "../../../../repository/mongo";

import { GoFileDeleteFile } from "../../../../utils/GoFileApi";
import Validator from './DeleteFileValidator'

export class DeleteFileUseCase {
    public async execute(fileName: string, folderName: string) {
        const folder = await findOneFolderFromName(folderName);
        if (!folder) {
            return 'Folder does not exists';
        }
        const file = await findFileFromName(fileName);
        if (!file) {
            return 'File does not exists';
        }
        await GoFileDeleteFile(file.fileId)
        await deleteOneFile(file.fileId);
        return 'File deleted';
    }
}