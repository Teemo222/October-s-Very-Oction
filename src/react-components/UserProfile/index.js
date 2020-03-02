import React from "react";

import "./styles.css";
import Header from '../Header';
import { getOrderBySeller, getOrderByBuyer} from '../../Model/Order'
import { getAllItems } from '../../Model/Merchandise'
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


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
      return (<div className = "ProfileDetail">
        <h2>Hello, {currentUser.username} </h2>
      </div>);      
    } else {
      return (
        <div className = "ProfileDetail">
          <h2>Hello, Mr. A</h2>
        </div>
      )
    }
  }
}




class Purchase extends React.Component {
  render() {
    const { order } = this.props;
    
    return (
      <TableRow className="row" >
        <TableCell component="th" scope="row">
          {order.item.itemName}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.price}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.transactionTime.toString()}
        </TableCell>

      </TableRow>
    );
  }
}

class Selling extends React.Component {
  render() {
    const { order } = this.props;
    
    return (
      <TableRow className="row" >
        <TableCell component="th" scope="row">
          {order.item.itemName}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.price}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.transactionTime.toString()}
        </TableCell>

      </TableRow>
    );
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
    const purchases = currentUser.purchaseHistory;
    return (
    <div className = "orderTable">
       <TableLabels/>
      { purchases.map((purchase, index) => {
        return (<Purchase order={purchase} key={index}/>);
      })
    }
    </div>);
  }
}

class TableLabels extends React.Component{
  render(){
    return (
    <TableRow className="row" >
        <TableCell component="th" scope="row">
          Item Name
        </TableCell>

        <TableCell component="th" scope="row">
          Price 
        </TableCell>

        <TableCell component="th" scope="row">
          Transaction Date
      </TableCell>
      </TableRow>
      )
  }


}

class SellingHistory extends React.Component {
  render(){
    const { currentUser } = this.props;
    const sellings = currentUser.sellingHistory;
    return (
      <div className = "orderTable">
        <TableLabels/>
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
    return (<div >
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
                  handleUserSignOut={handleUserSignOut}
           />
           <br/>
           <div className="profile-content">
            <Menu className="leftMenu" onClick={setActive} />
           <div className="mainContent">
             <this.state.activePage  currentUser={currentUser}/>
           </div>
          </div>          
        </div>         
      </div>
     
    );  
  }   
}

export default UserProfile;
