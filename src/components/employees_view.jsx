import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

export default function EmployeesLists({
  employees,
  handleEmpRemove,
  handleEmpView,
  handleCatRemove,
  handleCatView,
}) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 300,
    },
    {
      field: "department",
      headerName: "Department",
      width: 300,
    },
  ];

  const rows = employees?.map(
    ({ _id, name, email, role, category, department }) => ({
      id: _id,
      name,
      email,
      role,
      category : category?.name,
      department : department?.name,
    })
  );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
