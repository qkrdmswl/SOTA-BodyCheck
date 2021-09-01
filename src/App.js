import React, { useState, Component } from "react";
//exer
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import MainPage from './MainPage';
//user
import { Container } from "react-bootstrap";
import SignInModal from "./SignModels/SignInModal";
import SignUpModal from "./SignModels/SignUpModal";
import Footer from "./Layouts/Footer";
import Header from "./Layouts/Header";
import Layout from "./Layouts/Layout";
//import HomePage from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import Calender from "./calendar/calender";
import ExerList from './exercise/ExerList';
import Exer from './exercise/ExerList';
import BodycheckLogo from 'BodyCheckLogo';
import ExerCreatePage from './ExerCreatePage';

function App() {
  return (
    
     <StateMachineProvider>
      <Router>
        <Switch>

        { /*<Route path='' render={MainPage} />*/}
        { <Route path='/main' component={MainPage} />}
          <Route path='/as@a.com/exercise' component={ExerList} />
          {<Route path='/as@a.com/exercise/new' render={Exer} />}
          {/*<Route path='/main/calender' component={Calender} /> */} 
          <Route path='/as@a.com/calendar ' component={Calender} />
          <Route path = "/exercise/new" render={ExerCreatePage} />         
          
        { <Route render={() => <div className='error'>app.js정상</div>} />    }     
        </Switch>
      </Router>
    </StateMachineProvider >
    
  );
}

export default App;
