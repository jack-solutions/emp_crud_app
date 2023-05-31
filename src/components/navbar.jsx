import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { contextAPI } from '../store/context'

function Navbar() {
  const {state } = useContext(contextAPI)

  return (
    <Box>
      <ul style={{display : "flex" , justifyContent : "flex-end" , padding : "20px 30px", listStyleType : "none"}}>
        {
          state.role == "Manager" && <li style={{ marginRight : "8px"}}>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        }
        {
          state.access_token ?
          
          <> <li style={{ marginRight : "8px"}}>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>          <NavLink to="/login">Logout</NavLink>
        </li></>
        :
        <>
        <li style={{ marginRight : "8px"}}>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li style={{ marginRight : "8px"}}>
          <NavLink to="/signup">Signup</NavLink>
        </li></>
        }
      </ul>
    </Box>
  )
}

export default Navbar