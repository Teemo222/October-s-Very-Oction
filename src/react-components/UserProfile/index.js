import React from "react";

import "./styles.css";
import Header from '../Header';


/* The SignUp Component */
class UserProfile extends React.Component {
  render() {  
    const {
      currentUser,
    } = this.props;

    return (  
      <div className="userprofile__bg-image center">  
         <Header currentUser = {currentUser}/>
         <div>
          <h1>Welcome, Mr.Nobody</h1>
         </div>
      </div>  
    );  
  }   
}

export default UserProfile;
