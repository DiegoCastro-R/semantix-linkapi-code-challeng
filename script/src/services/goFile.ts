import axios from 'axios'

const BASEURL = process.env.NODE_GO_FILE_API_URL || ''

const goFileApi = axios.create({
    baseURL: BASEURL
})


const goFileCreateFolder = async (folderName: string) => {
    const response = await goFileApi.post(`/folder/create`, {
        folderName,
    }).catch(e => { return e })
    return response;
}


const goFileUploadFile = async (data: any) => {
    const response = await goFileApi.post(`/file/upload`, data).catch(e => { return e })
    return response;
}

export { goFileCreateFolder, goFileUploadFile }