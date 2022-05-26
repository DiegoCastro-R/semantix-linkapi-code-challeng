import { createOneFolder, findOneFolderFromName } from '../../../../repository/mongo'

import { GoFileCreateNewFolder } from '../../../../utils/GoFileApi';

export class CreateFolderUseCase {
    public async execute(folderName: string) {

        const folderNameAlreadyExists = await findOneFolderFromName(folderName);
        if (folderNameAlreadyExists) {
            return 'Folder already exists';
        }
        const { data } = await GoFileCreateNewFolder(folderName).catch(e => {
            throw new Error(e)
        });
        await createOneFolder({ folderId: data.id, folderName: data.name, parentFolderId: data.parentFolder });
        return 'Folder created';
    }
}