import React from 'react';
import Header from './Layouts/Header';
import Calender from "./calendar/calender";
function MainPage() {
  return <div className='main'>
  {<Header/>}
  {/*<BodycheckLogo />*/ }
  {/*<Exer />*/}
  {<Calender />}
  </div>;
}

export default MainPage;