import React from "react";

import "./styles.css";
import Header from './../Header';
import { DataTable } from "react-editable-table";
import TableBody from "@material-ui/core/TableBody";
import OrderRow from '../OrderRow';
import Table from "@material-ui/core/Table";
import { getAllOrders }from "../../Model/Order.js"

class OrderTable extends React.Component {
    
    renderOrderRow(order){
      return <OrderRow order/>
    }

    render() {
      const {
        currentUser,
        handleUserLogIn,  
        handleUserSignUp,
        handleUserSignOut  
      } = this.props;
  
      return (
        <Table>
          <TableBody>
              {getAllOrders().map(order => {
                  return this.renderOrderRow(order);
              })}
            </TableBody>
        </Table>
      )
    }
  }
  
  export default OrderTable;