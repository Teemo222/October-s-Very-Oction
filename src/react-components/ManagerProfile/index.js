import React from "react";

import "./styles.css";
import Header from './../Header';

class ManagerProfile extends React.Component {
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
  
  export default ManagerProfile;