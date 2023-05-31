import React, { useContext, useEffect, useState } from 'react'
import DepartmentsList from '../components/departments_view'
import { fetchingDepartments } from '../services';
import {contextAPI} from "../store/context"
import { Navigate } from 'react-router-dom';


function Dashboard() {

  const {state, setState, setNotification, clearNotification} = useContext(contextAPI)


  const [departments, setDepartments] = useState([])

  const getDepartmentsList = async () => {
    setNotification()
         try {
          const res = await fetchingDepartments({access_token : state.access_token});
         setDepartments(res)
         clearNotification()
         } catch (error) {
            console.log(error)
            setNotification(true, "something went wrong")
            clearNotification()
         }
  }

  const handleEmpView = () => {
    alert("handleEmpView")
  }

  const handleEmpRemove = () => {
    alert("handleEmpRemove")
  }

  const handleCatView = () => {
    alert("handleEmpView")
  }

  const handleCatRemove = () => {
    alert("handleEmpRemove")
  }

  useEffect(()=>{
    getDepartmentsList()
  },[])

  if(state.role != "Manager" || !state.access_token){
    return <Navigate to="/login" />
  }

  return (
    <div>
      <DepartmentsList departments={departments} handleEmpRemove={handleEmpRemove} handleEmpView={handleEmpView} handleCatRemove={handleCatRemove} handleCatView={handleCatView} />
    </div>
  )
}

export default Dashboard