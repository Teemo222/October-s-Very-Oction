/* New cleaned up version of App.js */
import React, { useDebugValue } from 'react';

// Importing react-router-dom to use the React Router
import './App.css';
import HomePage from './react-components/HomePage';
import ItemPage from './react-components/ItemPage';
import SearchPage from './react-components/SearchPage';
import ManagerProfile from './react-components/ManagerProfile';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import {addUser, getUser} from './Model/User';
import UserProfile from './react-components/UserProfile';
import {addItem, getAllItems, filterByKeyword, filterByCategory} from './Model/Merchandise';

class App extends React.Component {

  state = {
    item: null,
    searchInput : "",
    currentUser: null,
    merchandises: []
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

  handleUserLogIn = (event, callback) => {
    event.preventDefault();
    const target = event.target;
   
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    const user = getUser(username, password);

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

  handleUserSignUp = (event, callback) => {
    event.preventDefault();
    const target = event.target;
   
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    
    callback(addUser(username, password));
  };  
  
  handleUserSignOut = () =>{
    this.setState({
      ["currentUser"]: null
    });
  }

  render() {

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
                handleUserLogIn = {this.handleUserLogIn}  
                handleUserSignUp = {this.handleUserSignUp}
                handleUserSignOut = {this.handleUserSignOut}
                />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
