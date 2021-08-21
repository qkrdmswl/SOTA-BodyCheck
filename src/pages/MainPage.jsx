import React from 'react';
import Header from '../Layouts/Header';
import ExerLabel from "./exerLabel";
//import InputSample from './exerLabel';
import Calender from "./calender";
import exerLabelPage from './exerLabelPage';
import InputSample from "./exerLabel";
function MainPage() {
  return <div className='main'>
  <Header/>
  <InputSample/>
  <Calender />
  </div>;
}

export default MainPage;