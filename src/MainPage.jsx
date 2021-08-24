import React from 'react';
import Header from './Layouts/Header';
import ExerLabel from "./ exercise/ExerInfo";
//import InputSample from './exerLabel';
import Calender from "./calendar/calender";
function MainPage() {
  return <div className='main'>
  <Header/>
  <Calender />
  </div>;
}

export default MainPage;