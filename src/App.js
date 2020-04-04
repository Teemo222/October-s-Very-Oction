/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import './App.css';
import HomePage from './react-components/HomePage';
import ItemPage from './react-components/ItemPage';
import SearchPage from './react-components/SearchPage';
import ManagerProfile from './react-components/ManagerProfile';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import {addUser, loginUser, readCookie, logoutUser} from './actions/handleUser';
import UserProfile from './react-components/UserProfile';

class App extends React.Component {

  state = {
    data: null,
    item: null,
    searchInput : "",
    currentUser: null,
    merchandises: [],
    count:0
  }
  
  handleUserFunction = () => {
      let count = this.state.count + 1;
      this.setState({count: count})
      this.getUserFromServerSession(); // or updateUserFromServer
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
      ["searchInput"]: value 
    });
  };
  
  getUserFromServerSession = async () => {
    const tempUser =  await readCookie(this);
    const { currentUser } = this.state;
    if (tempUser && !currentUser){
      this.setState({
        ["currentUser"]: tempUser
      });
    }
    else if (tempUser && currentUser){
      if(tempUser.purchaseHistory.length !== currentUser.purchaseHistory.length || tempUser.sellingHistory.length !== currentUser.sellingHistory.length){
      this.setState({
        ["currentUser"]: tempUser
      });
      }
    }    
  }

  updateUserFromServer = () => {
    this.setState({
      currentUser: null
    });
    this.getUserFromServerSession();
  }

  componentDidMount() {
    this.getUserFromServerSession();
  }

  componentDidUpdate() {
    this.getUserFromServerSession();
  }

  handleUserLogIn = async (event, callback) => {
    event.preventDefault();
    const target = event.target;
   
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    const user = await loginUser(username, password);
    if ((user != null) && !(user.success === false)){
      // sessionStorage.setItem('user', JSON.stringify(user));
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
      callback(res);
    } catch(err) {
      callback(false);
    } 
  };  
  
  handleUserSignOut = async () =>{
    logoutUser();
    // sessionStorage.removeItem('user');
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
                handleUserFunction = {this.handleUserFunction}
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
                updateUserFromServer = {this.updateUserFromServer}
                />)}/>
            <Route exact path='/ManagerProfile' 
              render={() => (<ManagerProfile 
                currentUser = {this.state.currentUser}
                handleUserSignOut = {this.handleUserSignOut}
                updateUserFromServer = {this.updateUserFromServer}
                />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );  
  }
}

export default App;
