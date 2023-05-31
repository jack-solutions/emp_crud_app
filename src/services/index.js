import { AxiosClient } from "./AxiosClient";


export const signup = async ({headers, body}) => {
     
  const axiosClient = new AxiosClient();
  const res = await axiosClient.post("/signup", body)


  return res.data 
}


export const login = async ({headers, body}) => {
     
    const axiosClient = new AxiosClient();
    const res = await axiosClient.post("/login", body)
  
  
    return res.data 
  }

  export const fetchingUserProfile = async ({headers , body}) => {
     
    const axiosClient = new AxiosClient({headers});
    const res = await axiosClient.get("/getuser?_id="+body?._id)
  
  
    return res.data 
  }

  

export const fetchingDepartments = async ({access_token}) => {
    const axiosClient = new AxiosClient({access_token});
    const res = await axiosClient.get("/departments")
  
  
    return res.data 
}


export const updateUser = async ({headers , body}) => {
  const axiosClient = new AxiosClient({headers});
  const res = await axiosClient.put("/update-emp?_id="+body._id, body)


  return res.data 
}