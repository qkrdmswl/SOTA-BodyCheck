import React from 'react';
import Header from './Layouts/Header';
import Calender from "./calendar/calender";
import Exer from 'exercise/ExerList';

function MainPage() {
  return <div className='main'>
  <Header/>
  {/*<Exer />*/}
  <Calender />
  </div>;
}

export default MainPage;