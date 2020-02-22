import React from "react";

import "./styles.css";
import Header from '../Header';


/* The Login Component */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
    };
  }

  handleInputChange(e){

  }

  showLogin = () => {
    const { shown } = this.state;
    this.setState({
      shown: true
    });
  }

  cancelPopUp = (e) => {
    const backgroundDiv = document.querySelector("#background-div");
    if(e.target === backgroundDiv) {
      this.setState({
        shown: false
      });
    }
  }

  render() {  
    const {
      currentUser,
    } = this.props;

    const { showLogin, cancelPopUp } = this;
    const { shown } = this.state;
    let popup;
    if(shown) {
      popup = (
        <div className="signup-popup-background" id="background-div" onClick={cancelPopUp}>
          <div className="signup-popup" id="signup-div">
          <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"></input><br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"></input><br />
            <button>Login</button>        
          </form>
        </div>
        </div>
      );
    }

    return (  
     <div>
       <a onClick={showLogin}>Login</a>
       {popup }
     </div>
    );  
  }   
}

export default Login;
