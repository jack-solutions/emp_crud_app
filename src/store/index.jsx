

import React, { useEffect, useState } from 'react'
import { Provider } from './context'
import Loader from '../components/Loader';

function ContextWrapper({children}) {
    const [state, setState] = useState({});
    const [status, setStatus] = useState({
      loading : false,
      msg : ""
    })

    const setNotification = (loading, msg) => {
      setStatus({
         ...status,         
          msg, loading
         
       })
    }

    const clearNotification = () => {
      setTimeout(()=>{
        setStatus({
          msg : "",
          loading : false
        })
      }, 5000)
    }

    useEffect(()=>{

    },[])


  return (
    <Provider value={{state, setState, clearNotification, setNotification}}>
       <div>{status?.msg}</div>
        {children}
        {status.loading && <Loader/>}
    </Provider>
  )
}

export default ContextWrapper