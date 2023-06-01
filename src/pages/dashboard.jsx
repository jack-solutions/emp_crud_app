import React, { useContext, useEffect, useState } from "react";
import DepartmentsList from "../components/departments_view";
import { fetchingCategories, fetchingDepartments, fetchingEmployees, fetchingUserProfile, removeEmpFromDepartment } from "../services";
import { contextAPI } from "../store/context";
import { Navigate, useNavigate } from "react-router-dom";
import EmployeesLists from "../components/employees_view";

function Dashboard() {
  const { state, setState, setNotification, clearNotification } =
    useContext(contextAPI);

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);



  const navigate = useNavigate()
  
  const getDepartmentsList = async () => {

    if(state.departments && state.departments.length){
      setDepartments(state.departments)
      return
    }
    let headers = {
      "x-access-token": state.access_token,
    };

    setNotification();
    try {
      const res = await fetchingDepartments({ headers });
      setState({...state, departments : res});
      setDepartments(res)
      clearNotification();
    } catch (error) {
      console.log(error);
      setNotification(true, "something went wrong");
      clearNotification();
    }
  };

  const getEmployeesList = async () => {

    if(state.employees && state.employees.length){
      setEmployees(state.departments)
      return
    }
    let headers = {
      "x-access-token": state.access_token,
    };

    setNotification();
    try {
      const res = await fetchingEmployees({ headers });
      setState({...state, employees : res});
      setEmployees(res)
      clearNotification();
    } catch (error) {
      console.log(error);
      setNotification(true, "something went wrong");
      clearNotification();
    }
  };

 
 
  

  const handleEmpView = (_id) => {
    let departments_and_categories = departments?.map(dep => ({ dep_id : dep._id , name : dep.name, cats : dep?.categories?.map(cat => ({cat_id : cat._id, name : cat.name}))}))
     navigate("/profile?_id="+_id.toString()+"&dc="+JSON.stringify(departments_and_categories))
  };

  const handleEmpRemove = async (dep_id, emp_id) => {
    let headers = {
      "x-access-token": state.access_token,
    };

    try {
      const res = await removeEmpFromDepartment({ headers , body : {dep_id, emp_id}});
      getDepartmentsList();
      getEmployeesList()
      alert("Employee is successfuly removed")
    } catch (error) {
      console.log(error);
      setNotification(true, "something went wrong");
      clearNotification();
    }
  };

  const handleCatView = () => {
    alert("handleEmpView");
  };

  const handleCatRemove = (dep_id , cat_id) => {
    alert("handleEmpRemove");
  };

  useEffect(() => {
    getDepartmentsList();
    getEmployeesList()
  }, []);

  if (state.role != "Manager" || !state.access_token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Department Lists</h1>
      {
        departments && departments.length && <DepartmentsList
        departments={departments}
        handleEmpRemove={handleEmpRemove}
        handleEmpView={handleEmpView}
        handleCatRemove={handleCatRemove}
        handleCatView={handleCatView}
      />
      }

      <hr/>
      <h1>Employees Lists</h1>
      {
        employees && employees.length &&       <EmployeesLists employees={employees} />
      }
    </div>
  );
}

export default Dashboard;
