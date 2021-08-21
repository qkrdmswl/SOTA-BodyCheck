//서해수 운동라벨
import React,{useRef,useState} from 'react';
import { Link } from "react-router-dom";
//import Header from '../components/Header';
import Header from '../Layouts/Header';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
//import updateAction from "modules";
//import exerLabelPage from './exerLabelPage';
import CreateExerLabel from './CreateExerLabel';
import ExerList from './ExerList';
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
//input은 되는데 정ㅇ보를 저장하러=ㅕ고 하는데 잘 안돼
/*
function InputSample(){
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    name :'',
    weight:'',
    count:'',
    sets:"",
  });

const {name, weight, count, sets}=inputs

const onChange =(e)=>{
  const {name,value} =e.target
  const nextInputs={
    ...inputs,
    [name]: value,
  }
  setInputs(nextInputs)
  
}
const onSubmit=()=>{ //이걸 제출로 바꿔
  const submitInput={

    name:name,
    weight:weight,
    count:count,
    sets:sets,
  
  }

  setInputs(submitInput)
}
//

const onCreate = () => {
  const user = {
    id: nextId.current,
    username,
    email
  };
  setexers(exers.concat(user));

  setInputs({
    username: '',
    email: ''
  });
  nextId.current += 1;
};
return (
  <>
    <CreateUser
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList exers={exers} />
  </>
);



//
return(
  <form>
  <div>
    <exerLabelPage name="react"/>
   <input
   exerLabelPage
   name="name"
   placeholder="운동이름"
   onChange={onChange}
   value={name}
   />
   <input
   exerLabelPage
   name="weight"
   placeholder="무게"
   onChange={onChange}
   value={weight}
   />
      <input
      exerLabelPage
   name="count"
   placeholder="횟수"
   onChange={onChange}
   value={count}
   />
      <input
      exerLabelPage
   name="sets"
   placeholder="셋트"
   onChange={onChange}
   value={sets}
   />
   <button onClick={onSubmit}>  제출  </button>
  
  <div>
    {name}:{weight}kg :{count}회 :{sets}셋트
  </div>
  </div>
   <Link to ='/main/exerLabelPage'>운동라벨</Link>
  </form>
  
)


}




export default InputSample;
*/

/*
function InputSample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={

            ({ target: { value } }) => setName(value)}
        
        />
        
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </label>
    </>
  );
}
export default InputSample;
*/
/*
const Step1 = props => {
  const { register, handleSubmit } = useForm();
  const { actions } = useStateMachine({ updateAction });
  const onSubmit = data => {
    actions.updateAction(data);
    props.history.push("./step2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  );
};

export default withRouter(Step1);*/

function InputSample(){
  const [inputs, setInputs] = useState({
    name :'',
    weight:'',
    count:'',
    sets:'',
  });

const {name, weight, count, sets}=inputs;

const onChange =e =>{
  const { name, value } = e.target;
  setInputs({
    ...inputs,
    [name]: value
  });
};

  const [exers, setExers] = useState([
    {
      id: 1,
      name: '런닝',
      weight: '3',
      count:'3',
      sets:'3'
    },
    {
      id: 2,
      name: '플랭크',
      weight: '3',
      count:'3',
      sets:'3'
    },
    {
      id: 3,
      name: '디짐',
      weight: '3',
      count:'3',
      sets:'3'
    }]);
  const nextId = useRef(4); 

  const onCreate = () => {
    const exer = {
      id: nextId.current,
      name,
      weight,
      count,
      sets
    };

    //setExers(exers.concat(exer));
    setExers([...exers, exer]);

    setInputs({
      name: '',
      weight: '',
      count:'',
      sets:''
    });
    nextId.current += 1;
  };
  return (

    <>
      <CreateExerLabel 
      name={name}
      weight={weight}
      count={count}
      sets={sets}
      onChange={onChange}
      onCreate={onCreate}
      />
      <ExerList exers={exers} />
    </>
  
  );
}

export default InputSample;
