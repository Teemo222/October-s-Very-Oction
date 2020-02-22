import React from "react";

import "./styles.css";
import Header from '../Header';


/* The SignUp Component */
class SignUp extends React.Component {
  handleInputChange(e){

  }

  render() {  
    const {
      currentUser,
    } = this.props;

    return (  
      <div className="signup__bg-image center">  
        <Header currentUser = {currentUser}/>
        <form id = "sign-up-form" >
          <input
            type="text" 
            placeholder="Username" 
            name="Username"
            onChange = {this.handleInputChange}
          />      
          <input
            type="text" 
            placeholder="email" 
            name="email"
            onChange = {this.handleInputChange}
          />    
           <input
            type="text" 
            placeholder="password" 
            name="password"
            onChange = {this.handleInputChange}
          />    
        </form>
      </div>  
    );  
  }   
}

export default SignUp;
