import React, { useState, Component } from 'react';
//exer
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StateMachineProvider, createStore } from "little-state-machine";
import MainPage from './MainPage';
//import exerLabel from './pages/exerLabel';
import InputSample from './exercise/ExerInfo';
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
import Calender from "./calendar/calender";
import ExerList from './exercise/ExerList';
import Exer from './exercise/ExerList';
import CreateExerLabel from 'exercise/CreateExerLabel';

function App() {
  return (
    <>
       <StateMachineProvider>
      <Router>
        <Switch>
          <Route path='/as@a.com/exercise' component={ExerList} />
          <Route path='/as@a.com/exercise/new' component={Exer} />
          <Route path='/' component={MainPage} />
          {/*<Route path='/main/calender' component={Calender} /> */} 
          <Route path='/as@a.com/calendar ' component={Calender} />
          <Route render={() => <div className='error'>링크똑디 안쓰나</div>} />         
        </Switch>
      </Router>
      </StateMachineProvider>
    </>
  );
}


export default App;