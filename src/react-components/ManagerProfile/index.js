import React from "react";

import "./styles.css";
import Header from '../Header';
import UserTable from '../Usertable'

class ManagerProfile extends React.Component {
    render() {
      const {
        currentUser,
        handleUserLogIn,  
        handleUserSignUp,
        handleUserSignOut  
      } = this.props;
  
      return (
        <UserTable/>
      );
    }
  }
  
  export default ManagerProfile;