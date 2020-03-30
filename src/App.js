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
import {addUser, loginUser, readCookie, logoutUser} from './actions/handleUser';
import UserProfile from './react-components/UserProfile';
import {addItem} from './actions/handleMerchandise'
import {addOrder} from './Model/Order'
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
  
  handleUserFunction = () => {
      let count = this.state.count + 1;
      this.setState({count: count})
      this.getUserFromServerSession(); // or updateUserFromServer
  }

  handleSelectItem = (item) => {
    return (event) => {
      event.preventDefault();
      console.log(item)
    
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

  // getUserFromSessionStorage = async () => {
  //   let tempUser = await JSON.parse(sessionStorage.getItem('user'));
  //   const { currentUser } = this.state;
  //   console.log("on load: currentUser vs tempUser")
  //   console.log(currentUser);
  //   console.log(tempUser)
  //   if (tempUser && !currentUser){
  //     console.log("set user from session storage")
  //     this.setState({
  //       ["currentUser"]: tempUser
  //     });
  //   }
  //   else if (tempUser && currentUser){
  //     if(tempUser.purchaseHistory.length !== currentUser.purchaseHistory.length || tempUser.sellingHistory.length !== currentUser.sellingHistory.length){
  //       console.log("set user from session storage")
  //     this.setState({
  //       ["currentUser"]: tempUser
  //     });
  //     }
  //   }
  // }
  
  getUserFromServerSession = async () => {
    const tempUser =  await readCookie(this);
    const { currentUser } = this.state;
    console.log("on load: currentUser vs tempUser")
    console.log("currentUser")
    console.log(currentUser);
    console.log("tempUser")
    console.log(tempUser)
    if (tempUser && !currentUser){
      console.log("set user from server session")
      this.setState({
        ["currentUser"]: tempUser
      });
    }
    else if (tempUser && currentUser){
      if(tempUser.purchaseHistory.length !== currentUser.purchaseHistory.length || tempUser.sellingHistory.length !== currentUser.sellingHistory.length){
        console.log("set user from server session")
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
    console.log("mount")
    this.getUserFromServerSession();
  }

  componentDidUpdate() {
    console.log("update")
    this.getUserFromServerSession();
    console.log(this.state.currentUser)
  }

  handleUserLogIn = async (event, callback) => {
    event.preventDefault();
    const target = event.target;
   
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    const user = await loginUser(username, password);
    console.log("after loginUser");
    console.log(user);

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
      console.log(res);
      callback(res);
    } catch(err) {
      console.log(err);
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

    console.log(process.env.MONGODB_URI)

    if(this.state.count == 0){
      // Following 2 lines might add data multiple times if you run app multiple times, database error
      // addUser("user", "user");
      // addUser("user2", "user2");
      // addItem("Nike Kobe 7", "SNEAKERS", "This shoe is really cool", "/img/kobe.jpg");
      // addItem("UT Sweatshirt", "STREETWEAR", "WOW I love it so much", "/img/14355271t.jpg");
      // addItem("Nike Kobe 4", "SNEAKERS", "Nice shoe huh", "/img/kobe2.jpg");
      // addItem("Nike AF 1", "SNEAKERS", "God I'm in love", "/img/img01.jpg");
      // addItem("UT sticker", "COLLECTIONS", "Uoft compsci sticker", "/img/uoftcompsci.jpg");
      // addItem("N95 Mask", "COLLECTIONS", "Expensive", "/img/46457.jpg");
      // addItem("Nike SB Dunk", "SNEAKERS", "Great show", "/img/nikesb.jpg");
      // addItem("Nike Hoodie", "STREETWEAR", "Beautiful hoodie", "/img/nikehoodie.jpg");
      

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
