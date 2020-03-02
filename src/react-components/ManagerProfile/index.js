import React from "react";

import "./styles.css";
import Header from '../Header';
import UserTable from '../UserTable';
import OrderTable from '../OrderTable'

class ManagerProfile extends React.Component {
    render() {
      const {
        currentUser,
        handleUserLogIn,  
        handleUserSignUp,
        handleUserSignOut  
      } = this.props;
  
      return (
        <OrderTable/>
      );
    }
  }
  
  export default ManagerProfile;