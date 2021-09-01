import "./App.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Container from "./dietTable";
import MyApp from "./calendarR";
import Media from "./mediaUpload";
import { Link } from "react-router-dom";
import Exer from "exercise/ExerList";

let date = new Date();
date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const handleDate = (data) => {
  date = data;
};
const getDate = () => {
  return date;
};
function App() {
  return (
    <div className="App">
      <body>
        <header className="App-header">
          <div className="logo">
            {/*<Link to ="/main">
            <button className="title">Body Check</button>
            </Link> */ }
            <hr/>
          </div>
          <div className="icon">
            <i className="icon-signal"></i>
            <i className="icon-my"></i>
          </div>
        </header>

        <section>
          <div className="left"style={{"float":"left", "marginLeft":"100px"}}>
            <div className="calendar">
               <MyApp onChange={handleDate}/>
            </div>
            <div className="diet-table">
              <Container getDate={getDate} />
            </div>
          </div>

          <div className="right" style={{"float":"right", "marginRight":"300px", "marginTop":"30px"}}> 
            <div className="exercise-table">{<Exer/>}</div>
            <div className="media-upload">
              <p className="media">미디어 업로드</p>
              <Media />
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default App;
