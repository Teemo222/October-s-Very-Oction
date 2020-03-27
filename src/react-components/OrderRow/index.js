import React from 'react';
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import {getAll, getStatus, passItem, receiveItem, rejectItem} from "../../Model/Order"

class OrderRow extends React.Component {

  state={"a":0}

  handleReceiveItem = (order) =>{
    return (event) => {
      receiveItem(order);
      let b = 0;
      this.setState({["a"]:b});
    }
  }

  handlePassItem = (order) =>{
    return (event) => {
      passItem(order);
      let b = 0;
      this.setState({["a"]:b});
    }
  }

  handleRejectItem = (order) =>{
    return (event) => {
      rejectItem(order);
      let b = 0;
      this.setState({["a"]:b});
    }
  }


    render() {
      const {
        order,
      } = this.props;

      return (
        <TableRow key={order.item.itemId}>
            <TableCell component="th" scope="row">
                {order.item._id}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.item.itemName}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.buyer.username}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.seller.username}
            </TableCell>
            <TableCell component="th" scope="row">
                {getStatus(order)}
            </TableCell>
            <TableCell component="th" scope="row">
                <Button onClick={this.handleReceiveItem(order)}>Receive</Button>
            </TableCell>
            <TableCell component="th" scope="row">
                <Button onClick={this.handlePassItem(order)}>Pass</Button>
            </TableCell>
            <TableCell component="th" scope="row">
                <Button onClick={this.handleRejectItem(order)}>Reject</Button>
            </TableCell>
        </TableRow>
      )
    }
  }
  
  export default OrderRow;