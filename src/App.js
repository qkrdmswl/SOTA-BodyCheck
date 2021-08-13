import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './pages/SignPage';
import MainPage from './pages/MainPage';
import exerLabel from './pages/exerLabel';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Route path='/main' component={Header} />
        <Switch>
          <Route path='/main/exerLabel' component={exerLabel} />
          <Route path='/' component={MainPage} />
          <Route path='/main' component={MainPage} />
          <Route path='/sign' component={SignPage} />
          <Route render={() => <div className='error'>링크똑디 안쓰나</div>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;