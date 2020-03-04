import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";
import {getAdmin} from "../../Model/User"


/* The Login Component */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
    };
  }

  showLogin = () => {
    this.setState({
      shown: true,
    });
  }

  closeLogin = () => {
    this.setState({
      shown: false,
    });
  }


  cancelPopUp = (e) => {
    const backgroundDiv = document.querySelector("#background-div");
    if(e.target === backgroundDiv) {
      this.closeLogin()
    }
  }

  showMessage = (success) => {
    if (success){
      alert("log in successfully")
    }
    else{
      alert("login failed")
    }
    setTimeout(this.closeLogin, 1000);
  }

  render() {  
    const { cancelPopUp } = this;
    const { shown } = this.state;
    const {currentUser,
          handleUserLogIn
    } = this.props;

    const submit = (event) => {
      event.preventDefault()
      handleUserLogIn(event, this.showMessage);
    }

    const logInOrProfile = (event) => {
      if (currentUser == null){
        event.preventDefault()
        this.showLogin()
      }
    }

    let popup;
    if(shown) {
      popup = (
        <div className="login-popup-background" id="background-div" onClick={cancelPopUp}>
          <div className="login-popup" id="login-div">
          <form onSubmit={submit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"></input><br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"></input><br />
            <button className="submitButton" type = "submit">Login</button>        
          </form>
        </div>
        </div>
      );
    }

    let buttonText;
    let link = "/";

    if (currentUser != null){
      if (getAdmin().includes(currentUser)){ 
        link = "/ManagerProfile"
      }
      else{
        link = "/UserProfile"
      }
      buttonText = "My Account";

    }
    else{
      buttonText = "Login";
    }
    
  let button = (<Link to={link}><a id = "LogInButton" onClick={logInOrProfile}>{buttonText}</a></Link>);
    

    return (  
     <div>
       {button}
       {popup }
     </div>
    );  
  }   
}

export default Login;