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
      sets:'3',
      active: true,
      editing:false
    },
    {
      id: 2,
      name: '플랭크',
      weight: '3',
      count:'3',
      sets:'3',
      active: false,
      editing:false
    },
    {
      id: 3,
      name: '디짐',
      weight: '3',
      count:'3',
      sets:'3',
      active: false,
      editing:false
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

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setExers(exers.filter(exer => exer.id !== id));
  };

  const onToggle = id => {
    //이름을 누르면 active값이 바뀌는 onToggle함수를 구현한다
    //setUsers로 상태관리를 하고 map 메소드를 통해 파라미터 id와 user.id가 일치 한다면 active값을 반전시켜준다
    //그렇지 않으면 user원소를 그대로 둔다.
    setExers(
      exers.map(exer =>
        id === exer.id ? { ...exer, active: !exer.active } : exer
      )
    );
  };
//
  const onRevise = (id, data) =>{
    setExers(exers.map(exer =>
      id === exer.id ? {...exer, ...data} : exer)); 
   
  }
  
  const onEdit=id=>{
    setExers(
      exers.map(exer =>
        id === exer.id ? { ...exer, editing: !exer.editing } : exer
      )
    );

  }
  /*
  componentDidUpdate(prevProps, prevState){
    // 여기서는 editing 값이 바뀔 때 처리 할 로직이 존재한다.
      // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
      // 수정을 적용할땐, input 의 값들을 부모한테 전달해준다.
         const { info, onUpdate } = this.props;
      if(!prevState.editing && exer.editing) {
        // editing 값이 false -> true 로 전환 될 때
        // info 의 값을 state 에 넣어준다
        this.setExers({
          name: info.name,
          phone: info.phone
        })
      }
  
      if (prevState.editing && !exer.editing) {
        // editing 값이 true -> false 로 전환 될 때
        onUpdate(info.id, {
          name: exer.name,
          phone: exer.phone
        });
      }
        
    }
  
    render() {
      const style = {
        border: '1px solid black',
        padding: '8px',
        margin: '8px'
      };
        const {editing} = setExers;
        
        
        if(editing){ //수정모드
              return (
        <div style={style}>
          <div>
              <input
                value={exer.name}
                name="name"
                placeholder="이름"
                onChange={onChange}
              />
            </div>
            <div>
              <input
                value={exer.weight}
                name="weight"
                placeholder="무게"
                onChange={onChange}
              />
            </div>
           <button onClick={onEdit}>적용</button>        
          <button onClick={onRemove}>삭제</button>
        </div>
      );
        }*/
          
//
  return (
    <>
      <CreateExerLabel 
      name={name}
      weight={weight}
      count={count}
      sets={sets}
      onChange={onChange}
      onCreate={onCreate}
      onRevise={onRevise}
      onEdit={onEdit}
      />
      <ExerList exers={exers} onRemove={onRemove} onRevise={onRevise} onToggle={onToggle} onEdit={onEdit} />
    </>
  
  );
}

export default InputSample;
