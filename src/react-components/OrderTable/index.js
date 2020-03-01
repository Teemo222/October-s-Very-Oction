import React from "react";

import "./styles.css";
import Header from './../Header';

class OrderTable extends React.Component {
    render() {
      const {
        currentUser,
        handleUserLogIn,  
        handleUserSignUp,
        handleUserSignOut  
      } = this.props;
  
      return (
        <div></div>
      );
    }
  }
  
  export default OrderTable;