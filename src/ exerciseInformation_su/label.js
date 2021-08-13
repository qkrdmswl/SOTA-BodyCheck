import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: '운동명',
      headerName: '운동명',
      width: 150,
      editable: true,
    },
    {
      field: '무게',
      headerName: '무게',
      width: 150,
      editable: true,
    },
    {
      field: '횟수',
      headerName: '횟수',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, '운동명') || ''} ${
          params.getValue(params.id, '무게') || ''
        }`,
    },
  ];
  
  const rows = [
    { id: 1, 무게: 'Snow', 운동명: 'Jon', 횟수: 35 },
    { id: 2, 무게: 'Lannister', 운동명: 'Cersei', 횟수: 42 },
    { id: 3, 무게: 'Lannister', 운동명: 'Jaime', 횟수: 45 },
    { id: 4, 무게: 'Stark', 운동명: 'Arya', 횟수: 16 },
    { id: 5, 무게: 'Targaryen', 운동명: 'Daenerys', 횟수: null }
  ];
  
  export default function DataTable() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagesize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    );
  }