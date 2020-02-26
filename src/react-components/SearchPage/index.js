import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import SearchBox from '../SearchBox';
import Filter from '../Filter';



/* The SearchPage Component */
class SearchPage extends React.Component {

  state={
    displayed:[]
  }

  renderItems(merchandise) {
    return <SearchItem merchandise = {merchandise}/>;
  }
  
  renderFilter(){
    return <Filter />;
  }


  render() {
    const { currentUser,
            searchInput,
            handleUserLogIn,
            handleUserSignUp,
            merchandises,
            handleSelectItem
          } = this.props;
    
    displayed = [...merchandises]
          
    return (

        <div className="search__bg-image center">
          <Header currentUser = {currentUser}
                  handleUserLogIn = {handleUserLogIn}
                  handleUserSignUp = {handleUserSignUp}
          />
          
          <div class = "content">
            <div class="left">
              {this.renderFilter()}
            </div>
            <div class="right">

              {displayed.map((item) => {        
                return this.renderItems(item);
              })}
            </div>
            </div>
        </div> 
    );
  }
}

export default SearchPage;
