import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

export default function DepartmentsList({
  departments,
  handleEmpRemove,
  handleEmpView,
  handleCatRemove,
  handleCatView
}) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Department",
      width: 150,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      editable: true,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 300,
      renderCell: (params) => (
        <div>
          {params?.row?.categories?.map(({name}) => (
            <Chip key={name} label={name} style={{ margin: 2 }} 
            onClick={handleCatView}
            onDelete={handleCatRemove}
            />
          ))}
        </div>
      ),
    },

    {
      field: "employees",
      headerName: "Employees",
      description: "This column has a value getter and is not sortable.",
      width: 300,
      renderCell: (params) =>{
        console.log(params)
        return  (
          <div>
            {params?.row?.employees?.map(({_id, name}) => (
              <Chip key={name} label={name} style={{ margin: 2 }}
              onClick={() => handleEmpView(_id)}
              onDelete={() => handleEmpRemove(params.row?.id, _id)}
              />
            ))}
          </div>
        )
      }
    },
  ];

  const rows = departments?.map(
    ({ _id, name, location, categories, employees }) => ({
      id: _id,
      name,
      location,
      categories,
      employees,
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
