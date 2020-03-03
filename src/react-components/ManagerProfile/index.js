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
        handleUserSignOut  
      } = this.props;
  
      console.log("Profile");

      return (
        <div className="search__bg-image center">
          <AdminHeader
            currentUser={currentUser}
            handleUserSignOut={handleUserSignOut}
          />
          <div class='container'><OrderTable class="table"/></div>
          <div class='container'><UserTable class="table2"/></div>
          
          
        </div>
        
      );
    }
  }
  
  export default ManagerProfile;