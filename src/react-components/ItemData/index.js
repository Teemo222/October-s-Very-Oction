import React from "react";

import "./styles.css";

import {Line} from 'react-chartjs-2';
import {getOrderByOrderId} from '../../actions/handleOrder'
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import { TableCell } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {formatDateToDateTime} from '../../actions/formatDate'
import Dropdown from '../DropDown'

class DataBox extends React.Component {

  render(){

    const {dataName,
           stats} = this.props;
        

    return(<div className = "databox">
        <h2 className = "dataName">{dataName}</h2>
        <h2 className = "data-number">{stats}</h2>
    </div>)
  }
}

class OrderHistoryRow extends React.Component {

    render() {
      const {
        order
      } = this.props;

      return (
        <TableRow key={order.item.itemId}>
            <TableCell component="th" scope="row">
                {order.buyer.username}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.seller.username}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.price}
            </TableCell>
            <TableCell component="th" scope="row">
                {formatDateToDateTime(order.time)}
            </TableCell>
        </TableRow>
      )
    }
  }

class OrderHistoryTable extends React.Component {
  renderOrderHistoryRow(order, idx){
    return <OrderHistoryRow order={order} key={idx}/>
  }


  render() {
    const { 
      itemOrders, 
      handleViewAllButton
    } = this.props;

    return (
      <div className="order-history-table-wrapper">
      <Table>
        <TableHead>
          <TableRow id="order-table-title">
           Latest Sales <button onClick={handleViewAllButton}>View all sales</button>
          </TableRow>
          <TableRow>
            <TableCell>Buyer Username</TableCell>
            <TableCell>Seller Username</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {itemOrders.map((order,idx) => {
                return this.renderOrderHistoryRow(order, idx);
            })}
          </TableBody>
      </Table>
      </div>
    )
  }
}



/* The ItemData Component */
class ItemData extends React.Component {
  state = {
    item: this.props.item,
    data: {
      labels: [],
      datasets: [
        {label: "price",
        fill: false, 
        borderColor: "purple",
        backgroundColor: "pink", 
        data: []
        }
      ]
    },
    orders: [],
    length: 0,
    showAll: false,
    displayedOrders: []
  }

  handleViewAllButton = (event) =>{
    if(this.state.showAll){
      event.target.innerText = "View all sales"
    }
    else{
      event.target.innerText = "View recent sales"
    }
    this.setState({showAll: !this.state.showAll})
  }

  async processItemOrderHistory(){
    const itemHistory = this.state.item.orderHistory;
    const data = {
      labels: [],
      datasets: [
        {label: "price",
        fill: false, 
        borderColor: "purple",
        backgroundColor: "pink", 
        data: []
        }
      ]
    }
    const orders = []
    for (let i = 0; i<itemHistory.length; i++){
      await getOrderByOrderId(itemHistory[i]).then((order) => {
        data.labels.push(formatDateToDateTime(order.time).toString())
        data.datasets[0].data.push({x: formatDateToDateTime(order.time).toString, y: order.price})
        orders.push(order)
      })
    }
    this.setState({data: data, 
                  length: this.state.item.orderHistory.length, 
                  orders: orders,
                  displayedOrders: orders})
  }

  averagePrice(){
    let count = 0;
    let acc= 0
    for (let i = 0; i<this.state.displayedOrders.length; i++){
        acc += this.state.displayedOrders[i].price;
        count += 1;
    }
    if (count == 0){return 0.0}
    return Math.round(acc/count)
  }

  maxPrice(){
    let max = 0
    for (let i = 0; i<this.state.displayedOrders.length; i++){
        if(this.state.displayedOrders[i].price > max){
          max = this.state.displayedOrders[i].price
        }
    }
    return max
  }

  minPrice(){
    let min = 0
    for (let i = 0; i<this.state.displayedOrders.length; i++){
        if(min === 0 || this.state.displayedOrders[i].price < min){
          min = this.state.displayedOrders[i].price
        }
    }
    return min
  }


  async componentDidMount() {
    await this.processItemOrderHistory()

  }

  handleDropdownChange = (event) =>{
    const datetime = require('date-and-time')
    const value = event.target.value
    let newOrders;
    if(value === "All"){
      newOrders = this.state.orders
    }
    else if(value === "Past hour"){
      newOrders = this.state.orders.filter((order) => {
        const diff = datetime.subtract(new Date(), new Date(order.time)).toSeconds(); 
        return diff >= 0 && diff <= 3600
      }) 
    }
    else if(value === "Past 24 hours"){
      newOrders = this.state.orders.filter((order) => {
        const diff = datetime.subtract(new Date(), new Date(order.time)).toHours(); 
        return diff >= 0 && diff <= 24
      }) 
    }
    else if(value === "Past week"){
      newOrders = this.state.orders.filter((order) => {
        const diff = datetime.subtract(new Date(), new Date(order.time)).toDays(); 
        return diff >= 0 && diff <= 7
      }) 
    }
    else if(value === "Past month"){
      newOrders = this.state.orders.filter((order) => {
        const diff = datetime.subtract(new Date(), new Date(order.time)).toDays(); 
        return diff >= 0 && diff <= 30
      }) 
    }
    const data = {
      labels: [],
      datasets: [
        {label: "price",
        fill: false, 
        borderColor: "purple",
        backgroundColor: "pink", 
        data: []
        }
      ]
    }
    for (let i = 0; i<newOrders.length; i++){
        data.labels.push(formatDateToDateTime(newOrders[i].time).toString())
        data.datasets[0].data.push({x: formatDateToDateTime(newOrders[i].time).toString, y: newOrders[i].price})
    }
    this.setState({displayedOrders: newOrders, 
                   data: data})
  }

  render() {
    if(this.state.length != this.state.item.orderHistory.length){
      this.componentDidMount()
    }

    const average = this.averagePrice()

    let itemOrders;
    if(this.state.showAll){
      itemOrders = this.state.displayedOrders.sort((a, b) => {
        const dateOfA = new Date(a.time)
        const dateOfB = new Date(b.time)
        if(dateOfA > dateOfB){return -1}
        else if(dateOfA < dateOfB){return 1}
        else{return 0}
      })
    }
    else{
      itemOrders = this.state.displayedOrders.sort((a, b) => {
        const dateOfA = new Date(a.time)
        const dateOfB = new Date(b.time)
        if(dateOfA > dateOfB){return -1}
        else if(dateOfA < dateOfB){return 1}
        else{return 0}
      }).slice(0,5)
    }

     return (
      <div className="data-wrapper">
        <div className="leftPart">
               <Line
                options = {{reponsive: true}}
                data = {this.state.data}
               /> 
               <OrderHistoryTable handleViewAllButton = {this.handleViewAllButton}
                                  itemOrders = {itemOrders}/>
        </div>
      
        <div className="rightPart">
          <Dropdown options = {["All", "Past hour", "Past 24 hours", "Past week", "Past month"]} 
                    labelName = "Choose Time Period"
                    handleDropdownChange = {this.handleDropdownChange}/>
          <DataBox className = "databox"
                   dataName = {"Total Sales"}
                   stats = {this.state.displayedOrders.length}
          />
          <DataBox className = "databox"
                   dataName = {"Average Price"}
                   stats = {average}
          />
          <DataBox className = "databox"
                   dataName = {"Max Price"}
                   stats = {this.maxPrice()}
          />
          <DataBox className = "databox"
                   dataName = {"Min Price"}
                   stats = {this.minPrice()}
          />
        </div>
        
      </div>

    );
  }
}

export default ItemData;
