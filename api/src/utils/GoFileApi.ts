import FormData from 'form-data'
import axios from "axios";
import fs from 'fs'
require('dotenv').config();

const BASE_URL = "https://api.gofile.io";
const FOLDER = process.env.GOFILE_DEFAULT_FOLDER;
const GOFILE_API_SECRET = process.env.GOFILE_API_SECRET;


const GoFile = axios.create({
    baseURL: BASE_URL,
})



const GoFileGetServer = async () => {
    const response = await GoFile.get("/getServer");
    return response.data;
}

const GoFileCreateNewFolder = async (folderName: string) => {
    const response = await GoFile.put("/createFolder", { parentFolderId: FOLDER, token: GOFILE_API_SECRET, folderName })
    return response.data
}



const GoFileUploadFile = async (file: File, folderId: string) => {
    const server = await GoFileGetServer()
    const formData = new FormData();
    //@ts-ignore
    formData.append('file', fs.createReadStream(file.path));
    formData.append('token', GOFILE_API_SECRET);
    formData.append('folderId', folderId);
    const response = await axios.post(`https://${server.data.server}.gofile.io/uploadFile`, formData)
    //@ts-ignore
    fs.unlinkSync(file.path)
    return response.data;
}

const GoFileDeleteFile = async (fileId: string) => {
    const response = await GoFile.delete("/deleteContent", { data: { contentsId: fileId, token: GOFILE_API_SECRET } });
    return response.data;
}

export { GoFileCreateNewFolder, GoFileUploadFile, GoFileDeleteFile }