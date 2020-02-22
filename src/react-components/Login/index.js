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
      <div className="login__bg-image center">  
        <Header currentUser = {currentUser}/>
        
      </div>  
    );  
  }   
}

export default Login;
