import React, { useContext, useState } from 'react'
import AuthScreen from '../components/auth_screen'
import { signup } from '../services'
import { contextAPI } from '../store/context'

function Signup() {

  const {state, setState, setNotification, clearNotification} = useContext(contextAPI)


  const [credential, setCredential] = useState({
    name : "",
    email : "",
    password : "",
    role : ""
  })

  

  const handleChange = e => {
     setCredential({
       ...credential,
       [e.target.name] : e.target.name == "role" ? e.target.checked ? "Manager" : "Emp" : e.target.value
     })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(credential)
    setNotification(true)
    try {
      const res = await signup({body : credential})
      console.log(res)
      setNotification(false, "Successfuly Registered")
      clearNotification()
    } catch (error) {
      console.log(error)
      setNotification(false, "Something went wrong")
      clearNotification()
    }
  }

  

  return (
    <div>
           
              <AuthScreen credential={credential} handleSubmit={handleSubmit} handleChange={handleChange} btnText="Signup"/>
            
    </div>
  )
}

export default Signup