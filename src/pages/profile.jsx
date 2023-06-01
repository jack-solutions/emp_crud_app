import React, { useContext, useEffect, useState } from "react";
import AuthScreen from "../components/auth_screen";
import { fetchingUserProfile, signup, updateUser } from "../services";
import { contextAPI } from "../store/context";
import { Navigate } from "react-router-dom";

function Profile() {
  const { state, setState } = useContext(contextAPI);

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    hobbies: "",
    access_by_manager : false
  });


  const handleChange = (e) => {
    setCredential({
      ...credential,
      [e.target.name]:
        e.target.name == "role"
          ? e.target.checked
            ? "Manager"
            : "Emp"
          : e.target.value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credential);
    let headers = {
      "x-access-token": state.access_token,
    };

    try {
      const res = await updateUser({headers, body: credential });
      await getUser()
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (user_id) => {
    let headers = {
      "x-access-token": state.access_token,
    };
    try {
      let res = await fetchingUserProfile({headers, body : {_id : user_id} });
      setCredential({ access_by_manager : user_id ? true : false , ...res });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("loc ", window.location)
    let {search} = window.location ;
    if(search){
      let searchArr =  search.split("=")
      getUser(searchArr[1]);
    }else{
      getUser();
    }
  }, []);

  if( !state.access_token){
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h3>Profile</h3>
      <AuthScreen credential={credential} handleSubmit={handleSubmit} handleChange={handleChange} btnText="Update" state={state}/>
    </div>
  );
}

export default Profile;
