import React, { Component } from 'react';
import ExerDetails from './ExerInfo';
import CreateExerLabel from './CreateExerLabel';
import Exer from "./ExerList";

class ExerFullPage extends Component {
render(){
        return (
            <div>
                < Exer/>
            <ExerDetails />
              <CreateExerLabel 
         style={{ "visibility":"hidden" }} /> 
           </div>
            
        );
}
        }




export default ExerFullPage;