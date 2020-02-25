/* New cleaned up version of App.js */
import React from 'react';

// Importing react-router-dom to use the React Router
import './styles.css';
import Header from './../Header';
import SearchBox from './../SearchBox';

class HomePage extends React.Component {

  render() {
    const {
      currentUser,
      handleInputChange,
      handleUserLogIn
    } = this.props;

    document.title = "October's Very Oction";
    return (
      <div className = "home__bg-image center"> 
        <Header 
          currentUser = {currentUser}
          handleUserLogIn = {handleUserLogIn}
        />
        <div id="mainTextDiv">
          Buy & Sell <br/>
          Authenticate Sneakers
        </div>
        <SearchBox 
          handleInputChange = {handleInputChange}
        />
      </div>
    );  
  }
}

export default HomePage;
