import React from "react";

import "./styles.css";

import {Line} from 'react-chartjs-2';



class DataBox extends React.Component {

  render(){
    return(<div className = "databox">
        <h2 className = "dataName">Total sales</h2>
        <h2 className = "data">1000</h2>
    </div>)
  }
}

// let list = []
// let make = function(){for (let i = 0; i < 100; i++){list.push(i)}}

// make();

const x = new Date(2017, 1, 1);
const y = new Date(2017, 1, 1);



/* The ItemData Component */
class ItemData extends React.Component {

  state = {
    data: {
      labels: [x,y],
      datasets: [
        {label: "purchases",
        fill: false, 
        borderColor: "purple",
        backgroundColor: "pink", 
        data: [{
          x: x,
          y: 100
      }, {
          x: y,
          y: 3000
      }]
        }
      ]
    }
  };

  render() {
    let {
      
    } = this.props;

   
    return (
      <div className="wrapper">
        <div className="leftPart">
               <Line
                options = {{reponsive: true}}
                data = {this.state.data}
               />
        
              
        </div>
      
        <div className="rightPart">
          <DataBox/>
          <DataBox/>
          <DataBox/>
          <DataBox/>
        </div>
        
      </div>

    );
  }
}

export default ItemData;
