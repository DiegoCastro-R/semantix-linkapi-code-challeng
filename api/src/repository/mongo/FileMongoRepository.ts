import { File } from '../../shared/infra/database/mongo/models/FileModel'

interface IFile {
    fileName: string,
    fileId: string,
    folderId: string,
    deleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const createOneFile = async ({ fileName, fileId, folderId }: { fileName: string, fileId: string, folderId: string, }): Promise<IFile> => {
    return await File.create({ fileName, fileId, folderId, deleted: false, createdAt: new Date(), updatedAt: new Date() })
}

const findFileFromName = async (fileName: string): Promise<IFile> => {

    return await File.findOne({ fileName, deleted: false })
}

const deleteOneFile = async (fileId: string): Promise<IFile> => {
    return await File.findOneAndUpdate({ fileId }, { deleted: true })
}

export { createOneFile, findFileFromName, deleteOneFile }