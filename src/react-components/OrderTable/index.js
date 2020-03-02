import React from "react";

import "./styles.css";
import Header from './../Header';
import TableBody from "@material-ui/core/TableBody";
import OrderRow from '../OrderRow';
import Table from "@material-ui/core/Table";
import { getAllOrders }from "../../Model/Order.js"

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