import axios from "axios";

export class AxiosClient{

    constructor(req){
        this.axiosInstance = axios.create({
            baseURL : "http://localhost:80",
            headers :  req?.headers
        }) 
    }

    post = async (...args) => {
        try {
            let res =  await this.axiosInstance.post(...args)
            return res
        } catch (e) {
            let {response : error} = e
            console.log("Error in post", error)
            let errObj = {}
            if(error && (error.status >= 400)){
                errObj.status = error.status;
                errObj.data = error.data
            }else{
                errObj.status = 500
                errObj.data = {
                    msg : "Internal Server Error or something went wrong."
                }
            }

            throw errObj
        }
    }

    get = async (...args) => {
        try {
            let res =  await this.axiosInstance.get(...args)
            return res
        } catch ({response : error}) {
            console.log("Error in get", error)
            let errObj = {}
            if(error && (error.status >= 400)){
                errObj.status = error.status;
                errObj.data = error.data
            }else{
                errObj.status = 500
                errObj.data = {
                    msg : "Internal Server Error or something went wrong."
                }
            }

            throw errObj
        }
    }

    put = async (...args) => {
        try {
            let res =  await this.axiosInstance.put(...args)
            return res
        } catch ({response : error}) {
            console.log("Error in put", error)
            let errObj = {}
            if(error && (error.status >= 400)){
                errObj.status = error.status;
                errObj.data = error.data
            }else{
                errObj.status = 500
                errObj.data = {
                    msg : "Internal Server Error or something went wrong."
                }
            }

            throw errObj
        }
    }

    delete = async (...args) => {
        console.log("args in del ",args)
        try {
            let res =  await this.axiosInstance.delete(args[0], { data : args[1] })
            return res
        } catch ({response : error}) {
            console.log("Error in put", error)
            let errObj = {}
            if(error && (error.status >= 400)){
                errObj.status = error.status;
                errObj.data = error.data
            }else{
                errObj.status = 500
                errObj.data = {
                    msg : "Internal Server Error or something went wrong."
                }
            }

            throw errObj
        }
    }
}

