import React, { useState, Component } from 'react';
//exer
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StateMachineProvider, createStore } from "little-state-machine";
import MainPage from './ exercise/MainPage';
//import exerLabel from './pages/exerLabel';
import InputSample from './ exercise/exerLabel';
//import Header from './components/Header';
//user
import { Container } from "react-bootstrap";
import SignInModal from './SignModels/SignInModal';
import SignUpModal from './SignModels/SignUpModal';
import Footer from './Layouts/Footer';
import Header from './Layouts/Header';
import Layout from './Layouts/Layout';
//import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
//calender
//import Container from "./contents/dietTable";
//import MyApp from "./contents/calendar";
//import Preview from "./contents/preview";
import Calender from "./calendar/calender";
import exerLabelPage from "./ exercise/exerLabelPage";
import Step1 from "./ exercise/exerLabel";

function App() {
  return (
    <>
       <StateMachineProvider>
      <Router>
        <Route path='/main' component={Header} />
        <Switch>
          <Route path='/main/exerLabel' component={InputSample} />
          <Route path='/' component={MainPage} />
          <Route path='/main/calender' component={Calender} />        
          <Route render={() => <div className='error'>링크똑디 안쓰나</div>} />         
        </Switch>
      </Router>
      </StateMachineProvider>
    </>
  );
}


export default App;