import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import SearchBox from '../SearchBox';
import Filter from '../Filter';
import {getFilterItems} from '../../Model/Merchandise';
import DropDown from '../DropDown'

/* The SearchPage Component */
class SearchPage extends React.Component {

  state={
    displayed:[],
    searched:[],
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

  handleSortingChange = (event) =>{
      alert(event.target.value)
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
