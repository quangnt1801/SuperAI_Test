import axios from "axios";
import { CloudConstants } from "./CloudConstants";

const URL = "https://api.mysupership.vn";
const LOCAL_URL = "http://192.168.250.174:3000"

interface LOGIN {
    email: string,
    password: string
}

export interface ParamArea {
    code: number,
    name: string,
    province?: string,
    district?: string
}

export const getProvince = () => {
    return new Promise((resolve, reject) => {
        ;
        axios.get(`${URL}${CloudConstants.PROVINCE}`, {}).then(async (response: any) => {
            resolve(response.data)

        }).catch((error: any) => {
            reject(error)
        })
    })
}

export const getDistrict = (code: number) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}${CloudConstants.DISTRICT}?province=${code}`).then(async (response: any) => {
            resolve(response.data)

        }).catch((error: any) => {
            reject(error)
        })
    })
}

export const getCommune = (code: number) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}${CloudConstants.COMMUNE}?district=${code}`).then(async (response: any) => {
            resolve(response.data)
        }).catch((error: any) => {
            reject(error)
        })
    })
}

export const login = (param: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${LOCAL_URL}${CloudConstants.LOGIN}`, param).then(async (response: any) => {
            resolve(response.data)
        }).catch((error: any) => {
            resolve(error)
        })
    })
}