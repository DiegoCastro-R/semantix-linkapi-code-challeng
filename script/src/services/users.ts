import 'dotenv/config'

import axios from 'axios'

const BASE_URL = "https://linkapi-desafio-tech.gateway.linkapi.solutions/v1"
const API_USER = process.env.API_USER || "";
const API_PASS = process.env.API_PASS || "";
const xml2js = require('xml2js');




const UsersApi = axios.create({ baseURL: BASE_URL, auth: { username: API_USER, password: API_PASS } })
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const getUsers = async (limit: string, page: string) => {
    const data = await UsersApi.get(`/users?limit=${limit}&page=${page}`).then(res => { return res.data }).catch(async e => {

        if (e.response.dataretryAfter) {
            await wait(e.response.dataretryAfter * 1000)
            const { data } = await UsersApi.get(`/users?limit=${limit}&page=${page}`)
            return data
        }
        else {
            return { error: true, message: e.response.data.message }
        }
    })

    if (data.error) {
        return data
    }
    const parsedData = await xml2js.parseStringPromise(data);
    return parsedData;
}

const getUserAddress = async (userId: string) => {
    const data = await UsersApi.get(`/users/${userId}/address`).then(res => { return res.data }).catch(async e => {
        if (e.response.data.retryAfter) {
            await wait(e.response.data.retryAfter * 1000)
            const { data } = await UsersApi.get(`/users/${userId}/address`)
            return data
        }
        else {
            return { error: true, message: e.response.data.message }
        }
    })
    if (data.error) {
        return data
    }
    const parsedData = await xml2js.parseStringPromise(data);
    return parsedData
}

const getUserContact = async (userId: string) => {
    const data = await UsersApi.get(`/users/${userId}/contacts`).then(res => { return res.data }).catch(async e => {
        if (e.response.data.retryAfter) {
            await wait(e.response.data.retryAfter * 1000)
            const { data } = await UsersApi.get(`/users/${userId}/contacts`)
            return data
        }
        else {
            return { error: true, message: e.response.data.message }
        }
    })
    if (data.error) {
        return data
    }
    const parsedData = await xml2js.parseStringPromise(data);
    return parsedData;
}

export { getUsers, getUserAddress, getUserContact }