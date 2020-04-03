import React from "react";

import "./styles.css";
import Header from '../Header';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {setUserInfo} from '../../actions/handleUser';
import {getItemById} from '../../actions/handleMerchandise';
import {getOrderByOrderId} from '../../actions/handleOrder';
import {formatDateToDateTime} from '../../actions/formatDate'
import {getStatus} from '../../Model/Order'


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
    const { currentUser, updateUserFromServer } = this.props;
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
          updateUserFromServer();
          // window.location.reload();
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
    const { currentUser, updateUserFromServer } = this.props;
    if(currentUser) {
      // console.log(this.props);
      return (<div className = "ProfileDetail">
        <h2>Welcome, {currentUser.username} </h2>
        <UserInfo currentUser = {currentUser}
        updateUserFromServer = {updateUserFromServer}
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
          {order.item.itemName}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.price}
        </TableCell>
        <TableCell component="th" scope="row">
          {formatDateToDateTime(order.time)}
        </TableCell>
        <TableCell component="th" scope="row">
          {getStatus(order)}
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
          {order.item.itemName}
        </TableCell>

        <TableCell component="th" scope="row">
          {order.price}
        </TableCell>

        <TableCell component="th" scope="row">
          {formatDateToDateTime(order.time)}
        </TableCell>
        <TableCell component="th" scope="row">
        {getStatus(order)}{}
        </TableCell>

      </TableRow>
    );
  }
}

class Message extends React.Component {

  render() {
    const {message} = this.props
    return (
      <TableRow className="row" >
        <TableCell component="th" scope="row">
          {message.title}
        </TableCell>

        <TableCell component="th" scope="row">
          {formatDateToDateTime(message.date)}
        </TableCell>

        <TableCell component="th" scope="row">
          {message.content}
        </TableCell>

      </TableRow>
    );
  }
}

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
      <TableCell component="th" scope="row">
          Order Status
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

class Inbox extends React.Component {
  render(){
    const { currentUser , purchases} = this.props;
    if(!currentUser){return (<div className = "InboxTable">
                                <TableRow className="row" >
                                  <TableCell component="th" scope="row">
                                    Title
                                  </TableCell>

                                  <TableCell component="th" scope="row">
                                    Date 
                                  </TableCell>

                                  <TableCell component="th" scope="row">
                                    Content
                                </TableCell>
                                </TableRow>
                            </div>)}
    else{
        return (
        <div className = "InboxTable">
          <TableRow className="row" >
            <TableCell component="th" scope="row">
              Title
            </TableCell>
          <TableCell component="th" scope="row">
              Date 
          </TableCell>

          <TableCell component="th" scope="row">
            Content
          </TableCell>
          </TableRow>
          { currentUser.inbox.map((message, index) => {
            return (<Message message={message} key={index}/>);
          })
        }
        {
          
        }
        </div>);
      }
    }
}

class Menu extends React.Component{
  render() {
    const {onClick } = this.props;
    return (<div >
      <MenuItem name="Profile" onClick={e=>{onClick(ProfileDetail)}}/>
      <MenuItem name="Inbox" onClick={e=>{onClick(Inbox)}}/>
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
      sellings.push(order)
    })

    const purchases = []
    this.props.currentUser.purchaseHistory.map(async (orderId) => {
      const order = await getOrderByOrderId(orderId)
      purchases.push(order)
    })
    this.setState({sellings: sellings, purchases: purchases, sellingLength: this.props.currentUser.sellingHistory.length, purchaseLength: this.props.currentUser.purchaseHistory.length})
  }


  setActive(page){
    this.setState({activePage:page});
  }

  render() {  
    let flag = false;

    if(this.props.currentUser != null && (this.state.sellings == null || this.state.purchases == null)){
        flag = true
    }
    else if(this.props.currentUser != null && this.state.sellingLength != this.props.currentUser.sellingHistory.length){
        flag = true
    }
    else if(this.props.currentUser != null && this.state.purchaseLength != this.props.currentUser.purchaseHistory.length){
        flag = true
    }
    if (flag){
      this.loadHistory()
    } 

    const {
      currentUser,
      handleUserLogIn,  
      handleUserSignUp,
      handleUserSignOut,
      updateUserFromServer        
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
                                      purchases={this.state.purchases}
                                      updateUserFromServer={updateUserFromServer}
                                      />
           </div>
          </div>          
        </div>         
      </div>
     
    );  
  }   
}

export default UserProfile;
