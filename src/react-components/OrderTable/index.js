import React from "react";

import "./styles.css";
import Header from './../Header';
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableBody";
import OrderRow from '../OrderRow';
import Table from "@material-ui/core/Table";
import { getAllOrders }from "../../actions/handleOrder";
import { TableCell } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";

class OrderTable extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        allOrders: []
      }
    }

    renderOrderRow(order, idx){
      return <OrderRow order={order} key={idx}/>
    }

    componentDidMount() {
      getAllOrders()
      .then((allOrders) => {
        console.log("componentDidMount");
        console.log(allOrders)
        this.setState({
          allOrders
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  
    render() {
      const {
      } = this.props;

      const { allOrders } = this.state;
  
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
              <TableCell>Item Name</TableCell>
              <TableCell>Buyer</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {allOrders.map((order,idx) => {
                  return this.renderOrderRow(order, idx);
              })}
            </TableBody>
        </Table>
        </div>
      )
    }
  }
  
  export default OrderTable;