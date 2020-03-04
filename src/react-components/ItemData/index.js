import React from "react";

import "./styles.css";

import {Line} from 'react-chartjs-2';

class DataBox extends React.Component {

  render(){

    const {dataName,
           stats} = this.props;
        

    return(<div className = "databox">
        <h2 className = "dataName">{dataName}</h2>
        <h2 className = "data">{stats}</h2>
    </div>)
  }
}


/* The ItemData Component */
class ItemData extends React.Component {

  render() {
    let {
      item
    } = this.props;

    const data = {
      labels: [],
      datasets: [
        {label: "purchases",
        fill: false, 
        borderColor: "purple",
        backgroundColor: "pink", 
        data: []
        }
      ]
    }

    const itemHistory = item.orderHistory;

    function processItemOrderHistory(){
      for (let i = 0; i<itemHistory.length; i++){
        const order = itemHistory[i]
        data.labels.push(order.transactionTime)
        data.datasets[0].data.push({x: order.transactionTime, y: order.price})
      }

    }

    processItemOrderHistory()

    const averagePrice = function(){
      let count = 0;
      let acc= 0
      for (let i = 0; i<itemHistory.length; i++){
        const order = itemHistory[i]
        acc += order.price;
        count += 1;
      }
      if (count == 0){return 0.0}
      return acc / count
    }


    return (
      <div className="wrapper">
        <div className="leftPart">
               <Line
                options = {{reponsive: true}}
                data = {data}
               />
        
              
        </div>
      
        <div className="rightPart">
          <DataBox dataName = {"Total Sales"}
                   stats = {item.orderHistory.length}
          />
          <DataBox dataName = {"Average Price"}
                   stats = {averagePrice()}
          />
        </div>
        
      </div>

    );
  }
}

export default ItemData;
