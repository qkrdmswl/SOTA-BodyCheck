import React from 'react';
import Header from './Layouts/Header';
import ExerLabel from "./ exercise/exerLabel";
//import InputSample from './exerLabel';
import Calender from "./calendar/calender";
import exerLabelPage from './ exercise/exerLabelPage';
import InputSample from "./ exercise/exerLabel";
function MainPage() {
  return <div className='main'>
  <Header/>
  <Calender />
  </div>;
}

export default MainPage;