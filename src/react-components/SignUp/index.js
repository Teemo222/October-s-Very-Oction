import React from "react";

import "./styles.css";
import Header from '../Header';


/* The SignUp Component */
class SignUp extends React.Component {
  render() {  
    const {
      currentUser,
    } = this.props;

    return (  
      <div className="signup__bg-image center">  
        <Header currentUser = {currentUser}/>
      </div>  
    );  
  }   
}

export default SignUp;
