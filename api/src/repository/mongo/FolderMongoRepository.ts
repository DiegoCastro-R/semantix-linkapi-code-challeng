import { Folder } from '../../shared/infra/database/mongo/models'

interface Folder {
    folderName: string
    folderId: string
    parentFolderId: string
    createdAt: Date
    updatedAt: Date

}

const findOneFolderFromName = async (folderName: string): Promise<Folder | null> => {
    return await Folder.findOne().where({ folderName })
}

const createOneFolder = async ({ folderName, folderId, parentFolderId }: { folderName: string, folderId: string, parentFolderId: string }): Promise<Folder> => {
    console.log(folderName, folderId, parentFolderId)
    return await Folder.create({ folderName, folderId, parentFolderId, createdAt: new Date(), updatedAt: new Date() })
}

export { findOneFolderFromName, createOneFolder }
