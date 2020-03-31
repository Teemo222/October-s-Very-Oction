import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import SearchBox from '../SearchBox';
import Filter from '../Filter';
import {getFilterItems} from '../../Model/Merchandise';
import DropDown from '../DropDown'
import { getContrastRatio } from "@material-ui/core";
import { ConnectionStates } from "mongoose";

/* The SearchPage Component */
class SearchPage extends React.Component {

  state={
    displayed:[],
    searchString:"",
    count: 0
  }
  
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    this.setState({
      ["searchString"]: value
    })
    console.log(value)
  };

  handleClick = async (event) => {
    event.preventDefault();
    let lst = await getFilterItems(this.state.searchString, null);
    this.setState({
      ["displayed"]: lst,
    })
  }

  firstTimeSearch = async (searchInput) => {
    let lst = await getFilterItems(searchInput, null);
    let a = this.state.count + 1
    this.setState({
      ["displayed"]: lst,
      ["count"]: a
    })
   
  }

  handleFilterChange = (cat) =>{
    return async (event) => {
      event.preventDefault();
      let lst = await getFilterItems(this.state.searchString, cat)
      this.setState({
        ["displayed"]: lst,
      });
      
    }
  }

  handleSortingChange = (event) =>{
      const value = event.target.value
      if (value == "Popularity"){
        const result = this.state.displayed.sort(function compare(a, b) {
          if (a.orderHistory.length < b.orderHistory.length) {
            console.log(a.orderHistory)
            console.log(b.orderHistory)
            return -1;
          }
          if (a.orderHistory.length > b.orderHistory.length) {
            return 1;
          }
          return 0;
        })
        this.setState({
          ["displayed"]: result.reverse()
        });
      }
      else if (value == "Price high to low"){
        const result = this.state.displayed.sort(function compare(a, b) {
          if (a.getLowestAsk() == "N/A"){
            return -1
          }
          if (b.getLowestAsk() == "N/A"){
            return 1
          }
          if (a.getLowestAsk() < b.getLowestAsk()) {
            return -1;
          }
          if (a.getLowestAsk() > b.getLowestAsk()) {
            return 1;
          }
          return 0; 
        })
        this.setState({
          ["displayed"]: result.reverse()
        });
      }
      else if (value == "Price low to high"){
        const result = this.state.displayed.sort(function compare(a, b) {
          if (a.getLowestAsk() == "N/A"){
            return -1
          }
          if (b.getLowestAsk() == "N/A"){
            return 1
          }
          if (a.getLowestAsk() < b.getLowestAsk()) {
            return 1;
          }
          if (a.getLowestAsk() > b.getLowestAsk()) {
            return -1;
          }
          return 0; 
        })
        this.setState({
          ["displayed"]: result.reverse()
        });
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
    



    const test = () => {
      if (this.state.count == 0){
        this.firstTimeSearch(searchInput)
      }
    }
    test()
    
    return (

        <div className="search__bg-image center">
          <Header currentUser = {currentUser}
                  handleUserLogIn = {handleUserLogIn}
                  handleUserSignUp = {handleUserSignUp}
                  handleUserSignOut = {handleUserSignOut}
          />
          <div>
            <SearchBox handleInputChange={this.handleInputChange} 
                        searchInput={this.state.searchString} 
                        handleClick={this.handleClick}
            />
            </div>
          <div class = "content">
            
            <div class="left">
              <Filter handleFilterChange={this.handleFilterChange}/>
              <DropDown handleSortingChange={this.handleSortingChange}/>
            </div>
            <div class="right">

              {this.state.displayed.map((item) => {    
                return <SearchItem merchandise = {item} handleSelectItem = {handleSelectItem(item)}/>;
              })}
            </div>
            </div>
        </div> 
    );
  }
}

export default SearchPage;
