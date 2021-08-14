import React from 'react';
import Header from '../Layouts/Header';
import ExerLabel from "../pages/exerLabel";
import Calender from "../pages/calender";
function MainPage() {
  return <div className='main'>
    <Header/>
  <ExerLabel />
  <Calender />
  </div>;
}

export default MainPage;