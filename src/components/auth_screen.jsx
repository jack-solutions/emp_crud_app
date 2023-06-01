import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AuthScreen({
  handleChange,
  handleSubmit,
  credential,
  login,
  btnText,
  state,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!login && (
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          value={credential.name}
          onChange={handleChange}
          variant="outlined"
        />
      )}
      <TextField
        id="outlined-basic"
        label="Email"
        name="email"
        value={credential.email}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        name="password"
        value={credential.password}
        onChange={handleChange}
        variant="outlined"
      />
     { credential.department && credential.category && <><TextField
        id="outlined-basic"
        label="Department"
        name="department1"
        value={credential.department?.name || "NA"}
        variant="outlined"
      />
      <TextField
        id="outlined-basic"
        label="Category"
        name="category"
        value={credential.category?.name || "NA"}
        variant="outlined"
      /></>}
      {!login && (
        <div>
          <Checkbox {...label} name="role" onChange={handleChange} />
          <span>
            want to ragister as a <strong>Manager</strong>
          </span>
        </div>
      )}
      {state?.role == "Manager" && (
        <>
         <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="category"
          value={credential.category?.name || "not available"}
          label="Category"
          onChange={(e) => credential.access_by_manager && handleChange(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            state.departments?.map(dep => dep.categories?.map(cat =>  <MenuItem value={cat}>{cat.name}</MenuItem>))
          }
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-standard"
          label="Department"
          name = "department"
          onChange={(e) => credential.access_by_manager && handleChange(e)}
          value={credential.department?.name || "not available"}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            state.departments?.map(dep => <MenuItem value={dep}>{dep.name}</MenuItem>)
          }
        </Select>
      </FormControl>

        </>
      )}
      <Button variant="contained" type="submit" style={{ marginTop: "10px" }}>
        {btnText}
      </Button>
    </form>
  );
}
