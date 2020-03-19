/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import './App.css';
import HomePage from './react-components/HomePage';
import ItemPage from './react-components/ItemPage';
import SearchPage from './react-components/SearchPage';
import ManagerProfile from './react-components/ManagerProfile';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import {addUser, getUser, getAll} from './Model/User';
import UserProfile from './react-components/UserProfile';
import {addItem} from './actions/handleMerchandise'
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

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI().then(res => this.setState({ data: res.express })).then(
      res => {alert(this.state.data)}
    ).catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {

    const response = await fetch('http://localhost:5000/');
    const body = await response.json();

    console.log(2)
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  
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

    if(this.state.count == 0){
      addUser("user", "user");
      addUser("user2", "user2");
      addItem("Nike Kobe 7", "SNEAKERS", "This shoe is really cool", "/img/kobe.jpg");
      addItem("UT Sweatshirt", "STREETWEAR", "WOW I love it so much", "/img/14355271t.jpg");
      addItem("Nike Kobe 4", "SNEAKERS", "Nice shoe huh", "/img/kobe2.jpg");
      addItem("Nike AF 1", "SNEAKERS", "God I'm in love", "/img/img01.jpg");
      addItem("UT sticker", "COLLECTIONS", "Uoft compsci sticker", "/img/uoftcompsci.jpg");
      addItem("N95 Mask", "COLLECTIONS", "Expensive", "/img/46457.jpg");
      addItem("Nike SB Dunk", "SNEAKERS", "Great show", "/img/nikesb.jpg");
      addItem("Nike Hoodie", "STREETWEAR", "Beautiful hoodie", "/img/nikehoodie.jpg");

      getAllItems()
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
