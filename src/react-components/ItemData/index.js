import React from "react";

import "./styles.css";

import {Line} from 'react-chartjs-2';
import {getOrderByOrderId} from '../../actions/handleOrder'

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
  state = {
    item: this.props.item,
    data: {
      labels: [],
      datasets: [
        {label: "purchases",
        fill: false, 
        borderColor: "purple",
        backgroundColor: "pink", 
        data: []
        }
      ]
    },
    average: 0,
    length: 0
  }

  async processItemOrderHistory(){
    const itemHistory = this.state.item.orderHistory;
    const data = this.state.data
    for (let i = 0; i<itemHistory.length; i++){
      await getOrderByOrderId(itemHistory[i]).then((order) => {
        data.labels.push(order.time)
        data.datasets[0].data.push({x: order.time, y: order.price})
      })
    }
    this.setState({data: data, length: this.state.item.orderHistory.length})
  }

  async averagePrice(){
    const itemHistory = this.state.item.orderHistory;
    let count = 0;
    let acc= 0
    for (let i = 0; i<itemHistory.length; i++){
      await getOrderByOrderId(itemHistory[i]).then((order) => {
        acc += order.price;
        count += 1;
      })
    }
    if (count == 0){return 0.0}
    this.setState({average: acc/count})
  }

  async componentDidMount() {
    await this.processItemOrderHistory()
    await this.averagePrice()
  }

  render() {

    console.log("re-rendering")

    if(this.state.length != this.state.item.orderHistory.length){
      this.componentDidMount()
    }

     return (
      <div className="wrapper">
        <div className="leftPart">
               <Line
                options = {{reponsive: true}}
                data = {this.state.data}
               /> 
        </div>
      
        <div className="rightPart">
          <DataBox dataName = {"Total Sales"}
                   stats = {this.state.item.orderHistory.length}
          />
          <DataBox dataName = {"Average Price"}
                   stats = {this.state.average}
          />
        </div>
        
      </div>

    );
  }
}

export default ItemData;
