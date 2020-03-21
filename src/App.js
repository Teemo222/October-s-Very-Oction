/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import './App.css';
import HomePage from './react-components/HomePage';
import ItemPage from './react-components/ItemPage';
import SearchPage from './react-components/SearchPage';
import ManagerProfile from './react-components/ManagerProfile';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
// import {addUser, getUser, getAll} from './Model/User';
import {addUser, loginUser} from './actions/handleUser';
import UserProfile from './react-components/UserProfile';
import {addItem, itemAddBid} from './actions/handleMerchandise'
import {getAllItems} from './Model/Merchandise';

class App extends React.Component {

  state = {
    data: null,
    item: null,
    searchInput : "",
    currentUser: null,
    merchandises: [],
    count:0
  }
  
  handleSelectItem = (item) => {
    return (event) => {
      event.preventDefault();
    
      this.setState({
        ["item"]: item
      });
    }
};

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    
    this.setState({
      ["searchInput"]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };

  handleUserLogIn = async (event, callback) => {
    event.preventDefault();
    const target = event.target;
   
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    const user = await loginUser(username, password);

    if (user != null){
      this.setState({
        ["currentUser"]: user
      });
      callback(true)
    }
    else{
      callback(false)
    }
  };

  handleUserSignUp = async (event, callback) => {
    event.preventDefault();
    const target = event.target;
   
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    
    try {
      let res = await addUser(username, password);
      console.log(res);
      callback(res);
    } catch(err) {
      console.log(err);
      callback(false);
    } 
  };  
  
  handleUserSignOut = () =>{
    this.setState({
      ["currentUser"]: null
    });
  }

  render() {

    if(this.state.count == 0){
      // Following 2 lines might add data multiple times if you run app multiple times, database error
      // addUser("user", "user");
      // addUser("user2", "user2");
      addItem("Nike Kobe 7", "SNEAKERS", "This shoe is really cool", "/img/kobe.jpg");
      addItem("UT Sweatshirt", "STREETWEAR", "WOW I love it so much", "/img/14355271t.jpg");
      addItem("Nike Kobe 4", "SNEAKERS", "Nice shoe huh", "/img/kobe2.jpg");
      addItem("Nike AF 1", "SNEAKERS", "God I'm in love", "/img/img01.jpg");
      addItem("UT sticker", "COLLECTIONS", "Uoft compsci sticker", "/img/uoftcompsci.jpg");
      addItem("N95 Mask", "COLLECTIONS", "Expensive", "/img/46457.jpg");
      addItem("Nike SB Dunk", "SNEAKERS", "Great show", "/img/nikesb.jpg");
      addItem("Nike Hoodie", "STREETWEAR", "Beautiful hoodie", "/img/nikehoodie.jpg");

      itemAddBid("5e76a13db4dc3a2a01a5f6dd", 10, "5e76a135b4dc3a2a01a5f6db")
      this.state.count += 1;
    }


    return (
      <div> 
       <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' 
              render={() => (<HomePage 
                currentUser = {this.state.currentUser}
                handleInputChange = {this.handleInputChange}
                handleUserLogIn = {this.handleUserLogIn}
                handleUserSignUp = {this.handleUserSignUp}
                handleUserSignOut = {this.handleUserSignOut}
                //more attributes
                
                />)} />
            <Route exact path='/ItemPage' 
              render={() => (<ItemPage 
                currentUser = {this.state.currentUser}
                item = {this.state.item}
                handleUserLogIn = {this.handleUserLogIn}
                handleUserSignUp = {this.handleUserSignUp}
                handleUserSignOut = {this.handleUserSignOut}
                //more attributes
                
                />)}/>
            <Route exact path='/SearchPage' 
              render={() => (<SearchPage 
                currentUser = {this.state.currentUser}
                searchInput = {this.state.searchInput}
                handleUserLogIn = {this.handleUserLogIn}
                handleUserSignUp = {this.handleUserSignUp}
                handleSelectItem = {this.handleSelectItem}
                handleUserSignOut = {this.handleUserSignOut}
                //more attributes
                
                />)}/>
            <Route exact path='/UserProfile' 
              render={() => (<UserProfile 
                currentUser = {this.state.currentUser}  
                handleUserLogIn = {this.handleUserLogIn}  
                handleUserSignUp = {this.handleUserSignUp}
                handleUserSignOut = {this.handleUserSignOut}           
                //more attributes
                
                />)}/>
            <Route exact path='/ManagerProfile' 
              render={() => (<ManagerProfile 
                currentUser = {this.state.currentUser}
                handleUserSignOut = {this.handleUserSignOut}
                />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
