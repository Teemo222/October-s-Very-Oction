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
  }

  renderItems(merchandise, handleSelectItem) {
    return <SearchItem merchandise = {merchandise} handleSelectItem = {handleSelectItem}/>;
  }
  
  renderFilter(){
    return <Filter handleFilterChange={this.handleFilterChange}/>;
  }

  renderSearchBox(){
    return <SearchBox handleInputChange={this.handleInputChange}/>;
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target.previousSibling;
    const value = target.value;
    
    // 'this' is bound to the component in this arrow function.
    let lst = filterByKeyword(getAllItems(), value);
    this.setState({
      ["displayed"]: lst,
      ["searched"]:lst
    })
    console.log(value);
    console.log(this.state.displayed)
     
  };
  handleFilterChange = (cat) =>{
    return (event) => {
      event.preventDefault();
      let lst = filterByCategory(this.state.searched, cat)
      this.setState({
        ["displayed"]: lst,
      });
    }
  }

  render() {
    const { currentUser,
            searchInput,
            handleUserLogIn,
            handleUserSignUp,
            handleSelectItem
          } = this.props;

          
    return (

        <div className="search__bg-image center">
          <Header currentUser = {currentUser}
                  handleUserLogIn = {handleUserLogIn}
                  handleUserSignUp = {handleUserSignUp}
          />
          
          <div class = "content">
            <div>
            {this.renderSearchBox()}
            </div>
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
