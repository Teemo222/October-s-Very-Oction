import React from "react";

import "./styles.css";
import Header from './../Header';
import { DataTable } from "react-editable-table";
import MaterialTable from "material-table";

import { getAllOrders }from "../../Model/Order.js"

class OrderTable extends React.Component {
    render() {
      const {
        currentUser,
        handleUserLogIn,  
        handleUserSignUp,
        handleUserSignOut  
      } = this.props;
  
      return (
        <MaterialTable/>
      )
    }
  }
  
  export default OrderTable;