import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import SearchBox from '../SearchBox';
import Filter from '../Filter';
import {addItem, getAllItems, filterByKeyword, filterByCategory} from '../../Model/Merchandise';



/* The SearchPage Component */
class SearchPage extends React.Component {

  state={
    displayed:[],
    searched:[],
    searchString:""
  }

  renderItems(merchandise, handleSelectItem) {
    return <SearchItem merchandise = {merchandise} handleSelectItem = {handleSelectItem}/>;
  }
  
  renderFilter(){
    return <Filter handleFilterChange={this.handleFilterChange}/>;
  }

  renderSearchBox(){
    return <SearchBox handleInputChange={this.handleInputChange} searchInput={this.state.searchString} handleClick={this.handleClick}/>;
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    this.setState({
      ["searchString"]: value
    })
     
  };

  handleClick = (event) => {
    event.preventDefault();
    let lst = filterByKeyword(getAllItems(), this.state.searchString);
    this.setState({
      ["displayed"]: lst,
      ["searched"]: lst,
    })
  }

  handleFilterChange = (cat) =>{
    return (event) => {
      event.preventDefault();
      let lst = filterByCategory(this.state.searched, cat)
      this.setState({
        ["displayed"]: lst,
      });
      console.log(lst)
    }
  }

  render() {
    const { currentUser,
            searchInput,
            handleUserLogIn,
            handleUserSignUp,
            handleSelectItem,
            handleUserSignOut
          } = this.props;
    
    
          
    return (

        <div className="search__bg-image center">
          <Header currentUser = {currentUser}
                  handleUserLogIn = {handleUserLogIn}
                  handleUserSignUp = {handleUserSignUp}
                  handleUserSignOut = {handleUserSignOut}
          />
          <div>
            {this.renderSearchBox()}
            </div>
          <div class = "content">
            
            <div class="left">
              {this.renderFilter()}
            </div>
            <div class="right">
              {this.state.displayed.map((item) => {    
                return this.renderItems(item, handleSelectItem(item));
              })}
            </div>
            </div>
        </div> 
    );
  }
}

export default SearchPage;
