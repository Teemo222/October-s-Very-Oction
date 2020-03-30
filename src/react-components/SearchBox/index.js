import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";

/* The Header Component */
class SearchBox extends React.Component {
  render() {
    const {
      searchInput,
      handleInputChange,
      handleClick
    } = this.props;

    return (
      <div className = "searchDiv">
      <form id = "searchBox">
      <input
        id = "searchBoxInput" 
        type="text" 
        placeholder={searchInput}
        onChange={handleInputChange}
        name="searchInput"
      />
        <input 
        id = "searchBoxButton" 
        type="submit" 
        value="GO!"
        onClick = {handleClick}
        />
      
      
     </form>
     </div>
    );
  }
}

export default SearchBox;
