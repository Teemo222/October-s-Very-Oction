import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";

/* The ItemPage Component */
class SearchItem extends React.Component {

  render() {
    const {merchandise, handleSelectItem} = this.props;
    return (

      <Link to={"/itemPage"}>
            <div class="singleitem" onMouseOver={handleSelectItem}>
              
                <div class="item-image">
                    <img class="img-1" src={merchandise.itemImageSrc}/>
                </div>
                <div class="item-info">
                  <h3 class="name">{merchandise.itemName}</h3>
                </div>
               
             </div>
             </Link>
    );
  }
}

export default SearchItem;
