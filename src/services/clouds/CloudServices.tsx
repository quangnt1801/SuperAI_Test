import axios from "axios";
import { CloudConstants } from "./CloudConstants";

// var axios = require("axios");
// var MockAdapter = require("axios-mock-adapter");

const URL = "https://api.mysupership.vn";

// var mock = new MockAdapter(axios);

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

export const login = (config: LOGIN) => {
    // mock.onPost("/foo").reply(function (config) {
    //     return axios.get("/bar");
    //   });
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