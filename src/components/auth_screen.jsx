import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Checkbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AuthScreen({handleChange ,handleSubmit, credential,login,  btnText, state}) {
  return (
    <form
     onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
     {!login && <TextField id="outlined-basic" label="Name" name="name" value={credential.name} onChange={handleChange} variant="outlined" />}
      <TextField id="outlined-basic" label="Email" name="email" value={credential.email} onChange={handleChange} variant="outlined" />
      <TextField id="outlined-basic" label="Password" name="password" value={credential.password} onChange={handleChange} variant="outlined" />
      {!login && <div>
        <Checkbox {...label} name="role" onChange={handleChange} />
        <span>
          want to ragister as a <strong>Manager</strong>
        </span>
      </div>}
      { state?.role == "Manager" &&
        <>
        <TextField id="outlined-basic" label="Category"  value={credential.category || "not available"}  variant="outlined" />
        <TextField id="outlined-basic" label="Department"  value={credential.department || "not available"} variant="outlined" />
       </>  
      }
      <Button variant="contained" type="submit" style={{marginTop : "10px"}}>{btnText}</Button>
    </form>
  );
}
