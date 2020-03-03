import React from "react";

import "./styles.css";
import Header from './../Header';
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableBody";
import OrderRow from '../OrderRow';
import Table from "@material-ui/core/Table";
import { getAllOrders }from "../../Model/Order.js";
import { TableCell } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";

class OrderTable extends React.Component {

    renderOrderRow(order){
      return <OrderRow order={order}/>
    }

    

    render() {
      const {
      } = this.props;
  
      return (
        <div class="table">
        <Table>
          <TableHead>
            <TableRow id="order-table-title">
              Manage Order
              {/* <TableCell id="order-table-title">Manage Order</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Buyer</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {getAllOrders().map(order => {
                  return this.renderOrderRow(order);
              })}
            </TableBody>
        </Table>
        </div>
      )
    }
  }
  
  export default OrderTable;