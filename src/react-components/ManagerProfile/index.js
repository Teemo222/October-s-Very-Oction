import React from "react";

import "./styles.css";
import Header from '../Header';
import UserTable from '../UserTable';
import OrderTable from '../OrderTable';
import AdminHeader from '../AdminHeader';

class ManagerProfile extends React.Component {
    render() {
      const {
        currentUser,
        handleUserLogIn,  
        handleUserSignUp,
        handleUserSignOut  
      } = this.props;
  
      // console.log("Profile");

      return (
        <div>
          <OrderTable class="table"/>
          <UserTable class="table2"/>
        </div>
        
      );
    }
  }
  
  export default ManagerProfile;