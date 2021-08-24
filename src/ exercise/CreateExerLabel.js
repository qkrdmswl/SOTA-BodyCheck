import React from 'react';
<link rel="stylesheet" href="./exercise/exer.css" type="text/css" />

  export default class CreateExerLabel extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              name: '',
              weight: '',
              count:'',
              sets:''
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleClick = this.handleClick.bind(this);
      }
  
      handleChange(e) {   // input 창에 입력 가능하도록 만듬
          let nextState = {};
          nextState[e.target.name] = e.target.value;	// name에는 name입력값, weight에는 weight 입력값을 각각 저장
          this.setState(nextState)
      }
  
      handleClick() {
          const exer = {   // 한번 만들어지면 수정할 일이 없으므로  const로 선언
              name: this.state.name,
              weight: this.state.weight,
              count: this.state.count,
              sets: this.state.sets
          };
  
          this.props.onCreate(exer);
  
          this.setState({
              name: '',
              weight: '',
              count:'',
              sets:''
          });
      }
  
      render() {
          return (
              <div id="운동생성" style={{ "width": "30%" }}>
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
                          type="number"
                          name="count"
                          placeholder="횟수"
                          value={this.state.count}
                          onChange={this.handleChange}
                      />
                      <input
                          type="number"
                          name="sets"
                          placeholder="셋트"
                          value={this.state.sets}
                          onChange={this.handleChange}
                      />
                  </p>
                  <button onClick={this.handleClick}>Create</button>
              </div>
          )
      }
  }