
import React from 'react'

export default function Loader() {
  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems : "center",
        height : "100vh",
        width : "100vw",
        position:"fixed",
        color:"white",
        top : 0,
        left:0,
        background:"rgba(0,0,0,0.3)"
    }}>
        <h3>Loading...</h3>
    </div>
  )
}
