import { createOneFile, findFileFromName, findOneFolderFromName } from '../../../../repository/mongo'

import { GoFileUploadFile } from '../../../../utils/GoFileApi';

export class UploadFileUseCase {
    public async execute(file: File, folderName: string) {
        const folder = await findOneFolderFromName(folderName);
        if (!folder) {
            return 'Folder does not exists';
        }
        //@ts-ignore
        const fileAlreadyExists = await findFileFromName(file.originalname);
        if (fileAlreadyExists) {
            return 'File already exists';
        }

        const { data } = await GoFileUploadFile(file, folder.folderId).catch(e => {
            throw new Error(e)
        });

        await createOneFile({ fileName: data.fileName, fileId: data.fileId, folderId: data.parentFolder })

        return 'File uploaded';
    }
}