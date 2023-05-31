import React, { useContext, useEffect, useState } from 'react'
import AuthScreen from '../components/auth_screen'
import { login } from '../services'
import {contextAPI} from "../store/context"
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {

  const {state, setState, setNotification, clearNotification } = useContext(contextAPI)

  const navigate = useNavigate()

  console.log(state)

  const [credential, setCredential] = useState({
    email : "",
    password : "",
  })

  const handleChange = e => {
     setCredential({
       ...credential,
       [e.target.name] :  e.target.value
     })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(credential)
    // setNotification(true)
    try {
      const res = await login({body : credential})
      console.log("res" , res)
       setState(res)
      setNotification(false)
      navigate("/profile")
    } catch (error) {
      setNotification(false, "Something went wrong")
      clearNotification()
      console.log(error)
    }
  }

  useEffect(()=>{
     setState({})
  },[])


  return (
    <div>
            <AuthScreen credential={credential} handleSubmit={handleSubmit} handleChange={handleChange} btnText="Login" login />
    </div>
  )
}

export default Login