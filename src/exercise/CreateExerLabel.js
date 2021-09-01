import React from 'react';
import Exer from './ExerList';
import ExerInfo from './ContactInfo';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';
import axios from 'axios';
import ExerCreatePage from 'ExerCreatePage';
import Header from 'Layouts/Header';

  export default class CreateExerLabel extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
             isCreate: false ,
              name: '',
              weight: '',
              count:'',
              sets:''
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleClick = this.handleClick.bind(this);
         // this.handleCreate = this.handleCreate.bind(this);
          this.handlePageCreate = this.handlePageCreate.bind(this);
      }


      /*handleCreate(exer) {
        var newExer = Array.from(this.state.exerData);
        newExer.push(exer);
        this.setState({
            exerData: newExer
        });
        this.props.onCreate(exer);
    }*/

      handleChange(e) {   // input 창에 입력 가능하도록 만듬
          let nextState = {};
          nextState[e.target.name] = e.target.value;	// name에는 name입력값, weight에는 weight 입력값을 각각 저장
          this.setState(nextState)
      }
  
      async handleClick() {
          const exer = {   // 한번 만들어지면 수정할 일이 없으므로  const로 선언
              name: this.state.name,
              weight: this.state.weight,
              count: this.state.count,
              sets: this.state.sets
          };
          this.props.onCreate(exer);
          console.log(exer);
          //axios
          const variables = [
            {name: this.state.weight, type:1},
            {name: this.state.count, type:1},
            {name: this.state.sets, type:1}
          ]
          console.log(variables);
        const postResult = await axios.post('/exercise/me', {
            name: this.state.name,
            variables: [
                {name: '무게', type:1},
                {name: '횟수', type:1},
                {name: '셋트', type:1},
              ]
        })
        console.log(postResult.data.data);
//

          this.setState({
              name: '',
              weight: '',
              count:'',
              sets:''
          });

      }

      handlePageCreate() {
        this.setState({
            isCreate: true
        });}

      render() {
const create =(
    <div id="운동생성" style={{ "width": "30%" , "padding":"center"}}>
    
    <h2>운동 생성</h2>
    <p>
        <input
            type="text"
            name="name"
            placeholder="운동이름"
            value={this.state.name}
            onChange={this.handleChange}
        />
        <input
            type="text"
            name="weight"
            placeholder="무게"
            value={this.state.weight}
            onChange={this.handleChange}
        />
        <input
            type="text"
            name="count"
            placeholder="횟수"
            value={this.state.count}
            onChange={this.handleChange}
        />
        <input
            type="text"
            name="sets"
            placeholder="셋트"
            value={this.state.sets}
            onChange={this.handleChange}
        />
    </p>
    {<button onClick={this.handleClick}> 
        {this.state.isCreate ? "ok":"Create"}
        </button>}
    <hr/>

        </div>
        
);
const blank = (<div id="blank" style={{ "visibility":"hidden" }} >안보이게 처리한곳</div>)


      return (
         
       <div style={{"marginTop":"-50px" ,"border-radius":"5px"}}>   
          
        <Link to ="/exercise/new">
            <button id ="create" onClick={this.handlePageCreate}  style={{"marginTop":"10px","border-radius":"5px"}}> + </button>
            </Link>
        {this.state.isCreate ? create :blank}
       </div>
     
          );
      }
  }