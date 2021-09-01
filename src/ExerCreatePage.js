import React from 'react';
import Header from "./Layouts/Header";
import Exer from './exercise/ExerList';
import BodycheckLogo from './BodyCheckLogo';
function ExerCreatePage() {
  return <div className='CreateExerLabel'>
  <Header/>
  <Exer />
  </div>
  
}

export default ExerCreatePage;