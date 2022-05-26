import '../../../../shared/infra/database/mongo';

import { CreateFolderUseCase } from './CreateFolderUseCase';
import { Folder } from '../../../../shared/infra/database/mongo/models'

jest.setTimeout(3000000);
describe("Should be able to create a new folder", () => {
    test('Create a new folder', async () => {
        const createFolderUseCase = new CreateFolderUseCase();
        const folderName = "Jest";
        const response = await createFolderUseCase.execute(folderName)

        expect(response).toBe("Folder created");
    })
    test('Create a folder that already exists', async () => {
        const createFolderUseCase = new CreateFolderUseCase();
        const folderName = "Jest";
        const response = await createFolderUseCase.execute(folderName)
        await Folder.deleteOne({ folderName: folderName });
        expect(response).toBe("Folder already exists");;
    })
})
