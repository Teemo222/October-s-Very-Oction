import React from "react";

import "./styles.css";


/* The Login Component */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
    };
  }

  showSignUp = () => {
    this.setState({
      shown: true,
    });
  }

  closeSignUp = () => {
    this.setState({
      shown: false,
    });
  }

  cancelPopUp = (e) => {
    const backgroundDiv = document.querySelector("#background-div");
    if(e.target === backgroundDiv) {
      this.closeSignUp()
    }
  }

  showMessage = (success) => {
    if (success){
      alert("sign up successfully")
    }
    else{
      alert("login failed")
    }
    setTimeout(this.closeSignUp, 1000);
  }

  render() {  

    const { cancelPopUp } = this;
    const { shown } = this.state;
    const {handleUserSignUp,
            handleUserSignOut,
            currentUser
    } = this.props;

    const submit = (event) => {
      event.preventDefault()
      handleUserSignUp(event, this.showMessage);
    }

    const SignUpOrSignOut = (event) => {
      if (currentUser == null){
        event.preventDefault()
        this.showSignUp()
      }else{
        handleUserSignOut(event);
      }
    }

    let popup;
    if(shown) {
      popup = (
        <div className="signup-popup-background" id="background-div" onClick={cancelPopUp}>
          <div className="signup-popup" id="login-div">
          <form onSubmit={submit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username"></input><br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"></input><br />
            <button type = "submit">Sign Up</button>        
          </form>
        </div>
        </div>
      );
    }

    let buttonText;

    if (currentUser == null){
      buttonText = "Sign Up";
    }
    else{
      buttonText = "Sign Out";
    }
    
  
    let button = (<a onClick={SignUpOrSignOut}>{buttonText}</a>);

    return (  
     <div>
       {button}
       {popup }
     </div>
    );  
  }   
}

export default SignUp;