import React from "react";

import "./styles.css";
import Header from '../Header';
import UserTable from '../UserTable';
import OrderTable from '../OrderTable';
import AdminHeader from '../AdminHeader';
import ItemForm from '../ItemForm'

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
          <div class='TableContainer'><OrderTable className="table"/></div>
          <div class='TableContainer'><UserTable className="table2"/></div>
          <div class='table3'><ItemForm/></div>
          
        </div>
        
      );
    }
  }
  
  export default ManagerProfile;