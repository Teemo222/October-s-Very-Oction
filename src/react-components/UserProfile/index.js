import React from "react";

import "./styles.css";
import Header from '../Header';
import { getOrderBySeller, getOrderByBuyer, getOrderOfBuyer} from '../../Model/Order'
import { getAllItems } from '../../Model/Merchandise'
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {setUserInfo} from '../../actions/handleUser';
import {getOrderByOrderId} from '../../actions/handleOrder';
import {getItemById} from '../../actions/handleMerchandise';


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

class UserInfo extends React.Component {
  
  state = {
    showEdit: false
  }

  displayInfo = (event, currentUser) => {
    const email = document.querySelector("#email").value;
    const address = document.querySelector("#address").value;
    const card = document.querySelector("#card").value;
    currentUser.email = email
    currentUser.address = address
    currentUser.creditCardNumber = card

    this.setState({
      showEdit: false,
    });
  }

  displayEdit = (event) => {
    event.preventDefault();
    this.setState({
      showEdit: true,
    });
  }

  closeLogin = () => {
    this.setState({
      showEdit: false,
    });
  }

  cancelPopUp = (e) => {
    const backgroundDiv = document.querySelector("#edit-background-div");
    if(e.target === backgroundDiv) {
      this.closeLogin()
    }
  }

  render(){
    const { currentUser } = this.props;
    const {showEdit} = this.state;
    let info;
    let edit;

    const update = async (event) =>{
      event.preventDefault()
      const email = document.querySelector("#email").value;
      const address = document.querySelector("#address").value;
      const creditCardNumber = document.querySelector("#card").value;
      try {
        let data = await setUserInfo(currentUser._id, email, address, creditCardNumber);
        if(data) {
          console.log("updated user");
          console.log(data)
          this.setState({
            showEdit: false,
          });
          window.location.reload();
        }
      } catch(err) {
        console.log(err)
      }
    }

    info = (<div className = "userInfo">
                    <div className = "index"><strong>Username: {currentUser.username}</strong></div>  <br/>
                    <div className = "index"><strong>Email: {currentUser.email}</strong></div> <br/>
                    <div className = "index"><strong>Address: {currentUser.address}</strong></div> <br/>
                    <div className = "index"><strong>Card Number: {currentUser.creditCardNumber}</strong></div> <br/>
                    <button className = "editButton" onClick = {this.displayEdit}>Edit</button> 
                  </div>);
    

    if(showEdit){
      edit = (
        <div className="edit-popup-background" id="edit-background-div" onClick={this.cancelPopUp}>
          <div className="edit-popup" id="login-div">
          <form onSubmit={update}>
              <label>Email: </label>
              <input id="email" name="email"></input><br/>
              <label>Address: </label>
              <input id="address" name="address"></input><br/>
              <label >Card Number: </label>
              <input id="card" name="creditCardNumber"></input><br/>
              <button >Confirm</button>            
          </form>
        </div>
        </div>);
      }



    return (<div>
      {info}
      {edit}
      </div>
    );
  }
}


class ProfileDetail extends React.Component {
  
  render(){
    const { currentUser } = this.props;
    if(currentUser) {
      // console.log(this.props);
      return (<div className = "ProfileDetail">
        <h2>Welcome, {currentUser.username} </h2>
        <UserInfo currentUser = {currentUser}
        />
      </div>);      
    } else {
      return (
        <div className = "ProfileDetail">
          <h2>You haven't logged in yet.</h2>
        </div>
      )
    }
  }
}




class Purchase extends React.Component {

  render() {

    const {order} = this.props
    return (
      <TableRow className="row" >
        <TableCell component="th" scope="row">
          {order.itemName}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.price}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.time}
        </TableCell>

      </TableRow>
    );
  }
}

class Selling extends React.Component {

  render() {
    const {order} = this.props

    return (
      <TableRow className="row" >
        <TableCell component="th" scope="row">
          {order.itemName}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.price}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.time}
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
    const { currentUser , purchases} = this.props;
    if(!currentUser){return (<div className = "orderTable">
                                <TableLabels/>
                            </div>)}
    else{
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
    console.log(this.props)
    const { currentUser, sellings} = this.props;

    console.log(sellings)

    if(!currentUser){return (<div className = "orderTable">
                               <TableLabels/>
                            </div>)}
    else{

      return (
        <div className = "orderTable">
          <TableLabels/>
          { sellings.map((selling, index) => {
            return (<Selling order={selling} key={index}/>);
          })
        }
        </div>);
    }}
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

  state = {
      sellings: null,
      purchases: null,
      sellingLength: 0,
      purchaseLength: 0,
      activePage: ProfileDetail
    }
  

  async loadHistory(){
    const sellings = []
    this.props.currentUser.sellingHistory.map(async (orderId) => {
      const order = await getOrderByOrderId(orderId)
      const item = await getItemById(order.item)
      order.itemName = item.itemName
      sellings.push(order)
    })

    const purchases = []
    this.props.currentUser.purchaseHistory.map(async (orderId) => {
      const order = await getOrderByOrderId(orderId)
      const item = await getItemById(order.item)
      order.itemName = item.itemName
      purchases.push(order)
    })


    this.setState({sellings: sellings, purchases: purchases, sellingLength: this.props.currentUser.sellingHistory.length, purchaseLength: this.props.currentUser.purchaseHistory.length})
  }


  setActive(page){
    console.log(this.props.currentUser)
    this.setState({activePage:page});
  }

  render() {  

    console.log("re-render here")
    console.log(this.props.currentUser)

    let flag = false;

    if(this.props.currentUser != null && (this.state.sellings == null || this.state.purchases == null)){
        flag = true
    }
    else if(this.props.currentUser != null && this.state.sellingLength != this.props.currentUser.sellingHistory.length){
        flag = true
    }
    else if(this.props.currentUser != null && this.state.purchaseLength != this.props.currentUser.sellingHistory.length){
        flag = true
    }
    if (flag){
      this.loadHistory()
    } 

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
             <this.state.activePage  currentUser={currentUser}
                                      sellings={this.state.sellings}
                                      purchases={this.state.purchases}/>
           </div>
          </div>          
        </div>         
      </div>
     
    );  
  }   
}

export default UserProfile;
