import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import SearchBox from '../SearchBox';
import Filter from '../Filter';

import { posts } from "./posts.js";


/* The SearchPage Component */
class SearchPage extends React.Component {

  renderItems(merchandises) {
    for(let i = 0; i < merchandises.length; i++){
      return <SearchItem merchandise = {merchandises[i]}/>;
    }
    
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
              {this.renderItems(merchandises)}
            </div>
            </div>
        </div> 
    );
  }
}

export default SearchPage;
