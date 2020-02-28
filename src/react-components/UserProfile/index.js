import React from "react";

import "./styles.css";
import Header from '../Header';
import { getOrderBySeller, getOrderByBuyer} from '../../Model/Order'
import { getAllItems } from '../../Model/Merchandise'


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
    const { currentUser } = this.props;
    if(currentUser) {
      // console.log(this.props);
      return (<div>
        <h2>Hello, {currentUser.username} </h2>
      </div>);      
    } else {
      return (
        <div>
          <h2>Hello, Mr. A</h2>
        </div>
      )
    }
  }
}

class Purchase extends React.Component {
   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  render() {
    const { order } = this.props;
    const { item, buyer, seller, transactionTime, price} = order;
    const { itemName, itemCategory,  itemDescription} = item;
    return (
    <div className="purchase">
      <h4>Item name: {itemName}</h4>
      <p>Purchase time: {this.formatDate(transactionTime)}</p>
      <p>Price: {Number.parseFloat(price).toFixed(2)}</p>
      <p>Category: {itemCategory}</p>
      <p>Description: {itemDescription}</p>
    </div>)
  }
}

class Selling extends React.Component {
  formatDate(date) {
   var d = new Date(date),
       month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();

   if (month.length < 2) 
       month = '0' + month;
   if (day.length < 2) 
       day = '0' + day;

   return [year, month, day].join('-');
}

 render() {
   const { order } = this.props;
   const { item, buyer, seller, transactionTime, price} = order;
   const { itemName, itemCategory,  itemDescription} = item;
   return (
   <div className="purchase">
     <h4>Item name: {itemName}</h4>
     <p>Purchase time: {this.formatDate(transactionTime)}</p>
     <p>Price: {Number.parseFloat(price).toFixed(2)}</p>
     <p>Category: {itemCategory}</p>
     <p>Description: {itemDescription}</p>
   </div>)
 }
}

// // temporary function for hardcoding order
// function hardcordOrder(user) {
//   const orders = getOrderByUser(user);
//   const items = getAllItems();
//   if(orders.length === 0) {
//       for(let i = 0; i < 3 && i < items.length; i++) {
//         addOrder(items[i], user, Math.random() * 100);
//       }
//   }
// }

class PurchaseHistory extends React.Component {
  render(){
    const { currentUser } = this.props;
    const purchases = getOrderByBuyer(currentUser);
    return (
    <div>
      { purchases.map((purchase, index) => {
        return (<Purchase order={purchase} key={index}/>);
      })
    }
    </div>);
  }
}

class SellingHistory extends React.Component {
  render(){
    const { currentUser } = this.props;
    const sellings = getOrderBySeller(currentUser);
    return (
      <div>
        { sellings.map((selling, index) => {
          return (<Selling order={selling} key={index}/>);
        })
      }
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
      handleUserSignUp,
      handleUserSignOut        
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
             <this.state.activePage currentUser={currentUser}/>
           </div>
          </div>          
        </div>         
      </div>
     
    );  
  }   
}

export default UserProfile;
