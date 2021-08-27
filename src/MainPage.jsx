import React from 'react';
import Header from './Layouts/Header';

//import InputSample from './exerLabel';
import Calender from "./calendar/calender";
import ExerFullPage from "./ exercise/exerFullPage";

function MainPage() {
  return <div className='main'>
  <Header/>
  <ExerFullPage />
  <Calender />
  </div>;
}

export default MainPage;