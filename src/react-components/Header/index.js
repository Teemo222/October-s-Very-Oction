import React from "react";

import "./styles.css";

import { Link } from "react-router-dom";
import SignUp from './../SignUp';
import Login from './../Login';

/* The Header Component */
class Header extends React.Component {

  render() {
    const {
      currentUser,
      handleUserLogIn,
      handleUserSignUp
    } = this.props;

    console.log(currentUser)

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
              <SignUp handleUserSignUp = {handleUserSignUp}
              />
            </li>
            <li>
             <Login currentUser = {currentUser}
                    handleUserLogIn = {handleUserLogIn}
             />
            </li>
          </ul>
        </div>  
    </div>
    );
  }
}

export default Header;
