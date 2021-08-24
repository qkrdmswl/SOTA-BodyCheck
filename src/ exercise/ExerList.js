import React, { Component } from 'react';
import ExerDetails from './ExerInfo';
import CreateExerLabel from './CreateExerLabel';
import ExerInfo from './ContactInfo';

class Exer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          selectedKey: -1,
          keyword: '',
          exerData: [{
              name: '예시',
              weight: '42',
              count:'3',
              sets:'3'
          }]
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);

      this.handleCreate = this.handleCreate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleEdit = this.handleEdit.bind(this);

  }

  handleChange(e) {
      this.setState({
          keyword: e.target.value
      })
  }

  handleClick(key) {
      this.setState({
          selectedKey: key
      })
  }

  handleCreate(exer) {
      var newExer = Array.from(this.state.exerData);
      newExer.push(exer);
      this.setState({
          exerData: newExer
      });
  }

  handleRemove() {
      if (this.state.selectedKey < 0) {
          return;
      }
      var newExer = Array.from(this.state.exerData);
      newExer.splice(this.state.selectedKey, 1);
      this.setState({
          exerData: newExer,
          selectedKey: -1
      });

  }

  handleEdit(_name, _weight, _count, _sets) {  // onEdit 이벤트 발생시 실행할 함수 선언
      var newExer = Array.from(this.state.exerData);    // 배열 복제
      newExer[this.state.selectedKey] = { name: _name, weight: _weight, count:_count , sets:_sets};    // 선택된 키의 요소에 대해 name과 weight에 전달된 값을 넣어준다.
      this.setState({
          exerData: newExer
      });
  }

  render() {

      const mapToComponents = (data) => {
          data = data.filter((exer) => {
              return exer.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
          })
          return data.map((exer, i) => {
              return (<ExerInfo
                  exer={exer}
                  key={i}
                  onClick={() => this.handleClick(i)}
              />);
          })
      }
      
      return (
          <div id="전체">
               {/*운동List*/}
              <input id="검색input"
                  name="keyword"
                  placeholder="Search"
                  value={this.state.keyword}
                  onChange={this.handleChange}
              />
              <div id="exerList" style={{"margin":"10px"}}>{mapToComponents(this.state.exerData)}</div>
              <ExerDetails
                  isSelected={this.state.selectedKey != -1}
                  exer={this.state.exerData[this.state.selectedKey]}
                  onRemove={this.handleRemove}
                  onEdit={this.handleEdit}    // onEdit 이벤트를 handleEdit 함수로 연결
              />
              <CreateExerLabel
                  onCreate={this.handleCreate}
              />
          </div>
      );
  }
}

export default Exer;