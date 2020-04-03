import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";

/* The Header Component */
class AdminHeader extends React.Component {

  render() {
    const {
      currentUser,
      handleUserSignOut
    } = this.props;


    return (
      <div className="header">
        <div className = "logoDiv" >
          <img className = "logo" src="/img/logo.png"></img>
        </div>

        <div className = "headDiv" >        
            <h1 className = "title">October's Very Oction</h1>
        </div>
        <div className = "menuDiv">
          <ul className="menu">
            <li>
            <Link to={"/"} onClick={handleUserSignOut}>
              Sign Out
            </Link> 
            </li>
          </ul>
        </div>  
    </div>
    );
  }
}

export default AdminHeader;
