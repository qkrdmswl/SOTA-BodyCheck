import React from 'react';
//exer
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import exerLabel from './pages/exerLabel';
//import Header from './components/Header';
//user
import { Container } from "react-bootstrap";
import SignInModal from './SignModels/SignInModal';
import SignUpModal from './SignModels/SignUpModal';
import Footer from './Layouts/Footer';
import Header from './Layouts/Header';
import Layout from './Layouts/Layout';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
//calender

function App() {
  return (
    <>
      <Router>
        <Route path='/main' component={Header} />
        <Switch>
          <Route path='/main/exerLabel' component={exerLabel} />
          <Route path='/' component={MainPage} />
          <Route path='/main' component={MainPage} />
          <Route render={() => <div className='error'>링크똑디 안쓰나</div>} />
        </Switch>
      </Router>
    </>
  );
}


export default App;