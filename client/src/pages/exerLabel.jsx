//서해수 운동라벨
import React from 'react';
//import Header from '../components/Header';
import Header from '../Layouts/Header';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
/*
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
        `${params.getValue(par₩ams.id, '운동명') || ''} ${
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
  }*/

//입력필드
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="운동명" defaultValue="운동명을 입력하세요" />
        
        <TextField
          id="standard-number"
          label="무게"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-number"
          label="횟수"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
                <TextField
          id="standard-number"
          label="세트"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <Button variant="contained" color="primary">
  Primary
</Button>
<Button onClick={() => { alert('clicked') }}>Click me</Button>
    </form>
  );
}

//입력필드 끝




/*
function ProfilePage() {
  return <div className='exerLabel'>운동정의 페이지</div>;


}

export default ProfilePage;*/