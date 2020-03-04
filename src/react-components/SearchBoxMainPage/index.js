import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";

/* The Header Component */
class SearchBoxMainPage extends React.Component {
  render() {
    const {
      handleInputChange
    } = this.props;

    return (
      <div className = "searchDiv">
      <form id = "searchBox" className="search">
      <input
        id = "searchBoxInput" 
        type="text" 
        placeholder="Search.." 
        name="searchInput"
        onChange = {handleInputChange}
      />
      <Link to={"/SearchPage"}>
        <input type="submit"
        id = "searchBoxButton" 
        type="submit" 
        value="GO!"
        />
      </Link>
      
     </form>
     </div>
    );
  }
}

export default SearchBoxMainPage;
