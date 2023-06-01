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

  

export const fetchingDepartments = async ({headers}) => {
    const axiosClient = new AxiosClient({headers});
    const res = await axiosClient.get("/departments")
    return res.data 
}

export const fetchingEmployees = async ({headers}) => {
  const axiosClient = new AxiosClient({headers});
  const res = await axiosClient.get("/getallusers")
  return res.data 
}



export const updateUser = async ({headers , body}) => {
  const axiosClient = new AxiosClient({headers});
  const res = await axiosClient.put("/update-user/"+body._id, body)


  return res.data 
}

export const removeEmpFromDepartment = async ({headers , body}) => {
  const axiosClient = new AxiosClient({headers});
  const res = await axiosClient.put("/department/remove_emp", body)
  return res.data 
}

