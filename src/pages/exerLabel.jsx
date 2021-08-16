//서해수 운동라벨
import React,{useState} from 'react';
//import Header from '../components/Header';
import Header from '../Layouts/Header';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


//입력필드
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
/*
export default function FormPropsTextFields() {
  const classes = useStyles();


  return (
    
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="ex-name" label="운동명"  value={name} defaultValue="운동명을 입력하세요" />
        
        <TextField
          id="weight"
          label="무게"
          type="number"
         value={weight}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="count"
          label="횟수"
          type="number"
           value={count}
          InputLabelProps={{
            shrink: true,
          }}
        />
                <TextField
          id="sets"
          label="세트"
          type="number"
             value={sets}
          InputLabelProps={{
            shrink: true,
          }}
        />        
      </div>



      <Button variant="contained" color="primary">
  Primary
</Button>

<Button onClick={Good}>확인</Button>
    </form>
  );
function Good(){
  return(
    console.log("hu")
  )
}
}

/*
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

*/
//입력필드 끝

function InputSample(){
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    name :'',
    weight:'',
    count:'',
    sets:"",
  })

const {name, weight, count, sets}=inputs
const onChange =(e)=>{
  const {name,value} =e.target
  const nextInputs={
    ...inputs,
    [name]: value,
  }
  setInputs(nextInputs)
}
const onReset=()=>{ //이걸 제출로 바꿔
  const resetInputs={
    name:"",
    weight:"",
    count:'',
    sets:"",
  }
  setInputs(resetInputs)
}
return(
  <div>
   <input
   name="name"
   placeholder="운동이름"
   onChange={onChange}
   value={name}
   />
   <input
   name="weight"
   placeholder="무게"
   onChange={onChange}
   value={weight}
   />
      <input
   name="count"
   placeholder="횟수"
   onChange={onChange}
   value={count}
   />
      <input
   name="sets"
   placeholder="셋트"
   onChange={onChange}
   value={sets}
   />
   <button onClick={onReset}>초기화</button>
  
  <div>
    <b>값: </b>
    {name}:{weight}kg :{count}회 :{sets}세트
  </div>
  </div>
)

}


export default InputSample;
