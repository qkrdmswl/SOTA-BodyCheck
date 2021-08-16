import React from 'react';
import Header from '../Layouts/Header';
import ExerLabel from "./exerLabel";
//import InputSample from './exerLabel';
import Calender from "./calender";
function MainPage() {
  return <div className='main'>
    <Header/>
  <ExerLabel/>
  <Calender />
  </div>;
}

export default MainPage;