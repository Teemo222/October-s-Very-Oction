import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";
import SignUp from './../SignUp';

/* The Header Component */
class Header extends React.Component {

  render() {
    const {
      currentUser,
    } = this.props;

    function handleClick(event) {
      event.preventDefault()
      if (currentUser == null){
        window.location.href="Login"
      }
      else{
        window.location.href="UserProfile"
      }
    }

    return (
      <div className="header">
        <div className = "headDiv" >
          <Link to={"/"}>
            <img className = "logo" src="/img/logo.png"></img>
            <h1 className = "title">October's Very Oction</h1>
          </Link> 
        </div>
        <div className = "menuDiv">
          <ul className="menu">
            <li>
              <a href="">About us</a>
            </li>
            <li>
              <a href="SignUp">Sign Up</a>
            </li>
            <li>
              <a 
                href=""
                onClick = {handleClick}>My account</a>
            </li>
          </ul>
        </div>  
    </div>
    );
  }
}

export default Header;
