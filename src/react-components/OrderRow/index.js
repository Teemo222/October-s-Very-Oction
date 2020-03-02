import React from 'react';
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import {getAll, getStatus} from "../../Model/Order"

class OrderRow extends React.Component {
    // handleButtonText(){
    //   if(this.props.order.getStatus() == )
    // } 


    render() {
      const {
        order
      } = this.props;
  
      return (
        <TableRow key={order.item.itemId}>
            <TableCell component="th" scope="row">
                {order.item.itemName}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.buyer.userId}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.seller.userId}
            </TableCell>
            <TableCell component="th" scope="row">
            {order.transactionTime}
            </TableCell>
            <TableCell component="th" scope="row">
                {order.getStatus()}
            </TableCell>
            {/* <TableCell component="th" scope="row">
                <Button text={} onclick={}/>
            </TableCell> */}
        </TableRow>
      )
    }
  }
  
  export default OrderRow;