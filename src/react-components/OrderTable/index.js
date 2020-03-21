import React from "react";

import "./styles.css";
import Header from './../Header';
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableBody";
import OrderRow from '../OrderRow';
import Table from "@material-ui/core/Table";
import { getAllOrders }from "../../actions/handleOrder.js";
import { TableCell } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";

class OrderTable extends React.Component {

    renderOrderRow(order, idx){
      return <OrderRow order={order} key={idx}/>
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
              {getAllOrders().map((order,idx) => {
                  return this.renderOrderRow(order, idx);
              })}
            </TableBody>
        </Table>
        </div>
      )
    }
  }
  
  export default OrderTable;