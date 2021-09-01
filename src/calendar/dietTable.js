import "./dietTable.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import axios from "axios";

var datasByRow = [,];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 식사: "", 메뉴: "", 칼로리: "" };
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(propertyName, e) {
    var change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  }

  handleClear() {
    this.setState({ 식사: "", 메뉴: "", 칼로리: "" });
  }

  render() {
    return (
      <div className="row inputs">
        <Input
          name="식사"
          change={this.handleChange.bind(this, "식사")}
          value={this.state.식사}
          placeholder="식사"
        />
        <Input
          name="메뉴"
          change={this.handleChange.bind(this, "메뉴")}
          value={this.state.메뉴}
          placeholder="메뉴"
        />
        <Input
          name="칼로리"
          change={this.handleChange.bind(this, "칼로리")}
          value={this.state.칼로리}
          placeholder="칼로리"
        />
        <div className="col-md-3">
          <AddButton
            newData={this.state}
            create={this.props.onCreate}
            clear={this.handleClear}
            getDate={this.props.getDate}
          />
        </div>
      </div>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  render() {
    return (
      <div className="col-md-3">
        <input
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.change}
          value={this.props.value}
          className="form-control"
        />
      </div>
    );
  }
}

class Column extends React.Component {
  render() {
    return <td style={{ width: "30%" }}>{this.props.placeholder}</td>;
  }
}

class DeleteButton extends React.Component {
  onClick() {
    this.props.delete.call(null, this.props.uuid);

    axios({
      url: "diet/me",
      method: "delete",
      data: {},
    });
  }

  render() {
    return (
      <td style={{ width: "10%" }}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.onClick.bind(this)}
        >
          Delete
        </button>
      </td>
    );
  }
}

class AddButton extends React.Component {
  onClick() {
    if (
      this.props.newData.식사.length > 0 &&
      this.props.newData.메뉴.length > 0
    ) {
      this.props.create.call(
        null,
        this.props.newData.식사,
        this.props.newData.메뉴,
        this.props.newData.칼로리
      );
      this.props.clear.call(null);
    }
    const data = this.props.newData;
    const date = this.props.getDate();
    console.log(date, data);

    axios({
      url: "diet/me",
      method: "post",
      data: {
        name: this.props.newData.식사,
        meal: this.props.newData.메뉴,
        memo: this.props.newData.칼로리,
        DateRecordid: this.props.date,
      },
    });

    // axios
    //   .post("diet/me", { data, date })
    //   .then((res) => {
    //     console.log("asdf");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  // constructor(props) {
  //   super(props);
  //   this.sum = this.sum.bind(this);
  //   this.onClick = this.onClick.bind(this);
  // }

  // doSomthing = (e) => {
  //   this.sum();
  //   this.onClick();
  // };

  render() {
    return (
      <button
        type="button"
        style={{ width: "100%" }}
        className="btn btn-success"
        onClick={this.onClick.bind(this)}
      >
        Add
      </button>
    );
  }
}

class Kcal extends React.Component {
  render() {
    return this.props.칼로리;
  }
}

class Row extends React.Component {
  render() {
    return (
      <tr>
        <Column type="식사" placeholder={this.props.식사} />
        <Column type="메뉴" placeholder={this.props.메뉴} />
        <Column type="칼로리" placeholder={this.props.칼로리} />
        <DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
      </tr>
    );
  }
}

class Table extends React.Component {
  // state = {
  //   num1: 0,
  //   num2: 0,
  //   result: 0,
  // };

  // sum() {
  //   this.setState({
  //     num1: 0,
  //     result: 1,
  //   });
  // }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: "30%" }}>
              식사
            </th>
            <th scope="col" style={{ width: "30%" }}>
              메뉴
            </th>
            <th scope="col" style={{ width: "30%" }}>
              칼로리
            </th>
            <th scope="col" style={{ width: "10%" }}></th>
          </tr>
        </thead>

        <tbody>
          {this.props.datas.map((data, i) => {
            return (
              <Row
                key={i}
                uuid={i}
                식사={data.식사}
                메뉴={data.메뉴}
                칼로리={data.칼로리}
                onDelete={this.props.onDelete}
              />
            );
          })}
          <th scope="col" style={{ width: "30%" }}>
            총 칼로리
          </th>
          <th scope="col" style={{ width: "30%" }}></th>
          <th scope="col" style={{ width: "30%" }}>
            {this.props.datas.map((data, i) => {
              // sum();
              return <Kcal 칼로리={data.칼로리} />;
            })}
          </th>
        </tbody>
      </table>
    );
  }
}

class Container extends React.Component {
  // state = {
  //   result: 0,
  // };

  constructor(props) {
    super(props);
    this.state = { datas: datasByRow, counter: datasByRow.lenght };
    this.onDelete = this.onDelete.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  // sum = (e) => {};

  onDelete(id) {
    var data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({ datas: data_list, counter: data_list.lenght });
  }

  onCreate(식사, 메뉴, 칼로리) {
    this.setState({
      datas: this.state.datas.concat([
        { 식사: 식사, 메뉴: 메뉴, 칼로리: 칼로리 },
      ]),
    });
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        <Inputs onCreate={this.onCreate} getDate={this.props.getDate} />
        <Table datas={this.state.datas} onDelete={this.onDelete} />
      </div>
    );
  }
}

export default Container;
