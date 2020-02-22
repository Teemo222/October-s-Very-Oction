import React from "react";

import "./styles.css";
import Header from '../Header';


/* The SignUp Component */
class Login extends React.Component {
  handleInputChange(e){

  }

  render() {  
    const {
      currentUser,
    } = this.props;
    
    return (  
      <div>
        <p>Login In</p>          
      </div>  
    );  
  }   
}

export default Login;
