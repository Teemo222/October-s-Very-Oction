import React from "react";

import "./styles.css";


/* The Login Component */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
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
      alert("fuck you")
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
        this.showLogin()
      }
      else{
        window.location.href='/userProfile';
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
            <button type = "submit">Login</button>        
          </form>
        </div>
        </div>
      );
    }

    let button = (<a id = "LogInButton"onClick={logInOrProfile}>Login</a>);
    
    if (currentUser != null){
      document.querySelector("#LogInButton").innerText = "My Account";
    }

    return (  
     <div>
       {button}
       {popup }
     </div>
    );  
  }   
}

export default Login;