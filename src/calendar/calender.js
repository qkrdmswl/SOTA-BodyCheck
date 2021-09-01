import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Container from "./dietTable";
import MyApp from "./calendarR";
import Preview from "./preview";
import { Link } from "react-router-dom";
import CreateExerLabel from "exercise/CreateExerLabel";
import Exer from "exercise/ExerList";

let date = new Date();
date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
const handleDate = (data) => {
    date = data;
}
const getDate = () => {
  return date;
}
function App() {
  return (
    <div className="App">
      <body>
        <header className="App-header">
          <div className="logo">
            {/*<Link to ="/main">
            <button className="title">Body Check</button>
            </Link>*/}
          </div>
          <div className="icon">
            <i className="icon-signal"></i>
            <i className="icon-my"></i>
          </div>
        </header>
   
        <section>
          <div className="left">
            <div className="calendar">
              
             {<Exer/>}
              <MyApp onChange={handleDate}/>
            </div>
            <div className="diet-table">
              <Container getDate={getDate}/>
            </div>
          </div>

          <div className="right">
            <div className="exercise-table"></div>
            <div className="media-upload">
              <p className="media">미디어 업로드</p>
              <Preview />
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default App;