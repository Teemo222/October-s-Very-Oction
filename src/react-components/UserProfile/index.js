import React from "react";

import "./styles.css";
import Header from '../Header';


class MenuItem extends React.Component {
  render(){
    const { name, onClick } =this.props;
    return (
      <div className="profile-menu-item" onClick={onClick}>
        <p>{name}</p>
      </div>
    )
  }
}

class ProfileDetail extends React.Component {
  render(){
    return (<div>
      Detail
    </div>);
  }
}


class PurchaseHistory extends React.Component {
  render(){
    return (<div>
      PurchaseHistory
    </div>);
  }
}

class SellingHistory extends React.Component {
  render(){
    return (<div>
      SellingHistory
    </div>);
  }
}

class Menu extends React.Component{
  render() {
    const {onClick } = this.props;
    return (<div className="profile-menu">
      <MenuItem name="Profile" onClick={e=>{onClick(ProfileDetail)}}/>
      <MenuItem name="Purchase History" onClick={e=>{onClick(PurchaseHistory)}}/>
      <MenuItem name="Selling History" onClick={e=>{onClick(SellingHistory)}}/>
    </div>);
  }
}

/* The SignUp Component */
class UserProfile extends React.Component {
  constructor(){
    super();
    this.state = {
      activePage: ProfileDetail
    }
  }
  setActive(page){
    this.setState({activePage:page});
  }
  render() {  
    const {
      currentUser,
      handleUserLogIn,  
      handleUserSignUp        
    } = this.props;

    let setActive = this.setActive.bind(this);

    return (  
      <div>
         <div className="userprofile__bg-image center">  
           <Header currentUser = {currentUser}
                  handleUserLogIn = {handleUserLogIn}
                  handleUserSignUp = {handleUserSignUp}
           />
           <br/>
           <div className="profile-content">
            <Menu onClick={setActive} />
           <div>
             <this.state.activePage />
           </div>
          </div>          
        </div>         
      </div>
     
    );  
  }   
}

export default UserProfile;
