import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";

/* The Header Component */
class SearchBox extends React.Component {
  render() {
    const {
      handleInputChange
    } = this.props;

    return (
      <div className = "searchDiv">
      <form id = "searchBox"class="search">
      <input
        id = "searchBoxInput" 
        type="text" 
        placeholder="Search.." 
        name="searchInput"
      />
        <input type="submit"
        id = "searchBoxButton" 
        type="submit" 
        value="GO!"
        onClick = {handleInputChange}
        />
      
      
     </form>
     </div>
    );
  }
}

export default SearchBox;
