import React from "react";

import "./styles.css";
import Header from '../Header';


class Menu extends React.Component{
  render() {
    const {items } = this.props;
    return (<div className="profile-menu">
        {items}
    </div>);
  }
}

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
    } = this.props;
    let setActive = this.setActive.bind(this);
    let items = [
      (<MenuItem name="Profile" onClick={e=>{setActive(ProfileDetail)}}/>),
      (<MenuItem name="Purchase History" onClick={e=>{setActive(PurchaseHistory)}}/>),
      (<MenuItem name="Selling History" onClick={e=>{setActive(SellingHistory)}}/>),
    ];
    let menu = (<Menu items={items}></Menu>);

    return (  
      <div>
         <div className="userprofile__bg-image center">  
           <Header currentUser = {currentUser}/>
           <br/>
           <div className="profile-content">
           {menu}
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
