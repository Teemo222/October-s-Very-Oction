import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import SearchBox from '../SearchBox';
import Filter from '../Filter';
import {addItem, getAllItems, getFilterItems} from '../../Model/Merchandise';




/* The SearchPage Component */
class SearchPage extends React.Component {

  state={
    displayed:[],
    searched:[],
    searchString:"",
    count: 0
  }

  renderItems(merchandise, handleSelectItem) {
    return <SearchItem merchandise = {merchandise} handleSelectItem = {handleSelectItem}/>;
  }
  
  renderFilter(){
    return <Filter handleFilterChange={this.handleFilterChange}/>;
  }

  renderSearchBox(){
    return <SearchBox handleInputChange={this.handleInputChange} 
                      searchInput={this.state.searchString} 
                      handleClick={this.handleClick}
            />;
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
      ["searched"]: lst,
    })
  }

  firstTimeSearch = async (searchInput) => {
    let lst = await getFilterItems(searchInput, null);
    let a = this.state.count + 1
    this.setState({
      ["displayed"]: lst,
      ["searched"]: lst,
      ["count"]: a
    })
   
  }

  handleFilterChange = (cat) =>{
    return async (event) => {
      event.preventDefault();
      console.log(cat)
      console.log(this.state.searchString)
      let lst = await getFilterItems(this.state.searchString, cat)
      console.log(lst)
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
