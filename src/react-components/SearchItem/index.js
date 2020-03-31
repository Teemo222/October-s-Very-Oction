import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";
import { API_URL } from '../../config'

/* The ItemPage Component */
class SearchItem extends React.Component {

  render() {
    const {merchandise, handleSelectItem} = this.props;

    let imageSrc = merchandise.itemImageSrc;     
    if(API_URL !== '/') {
      imageSrc = API_URL + imageSrc;
    }

    return (

      <Link to={"/itemPage"}>
            <div class="singleitem" onMouseOver={handleSelectItem}>
              
                <div class="item-image">
                    <img class="img-1" src={imageSrc}/>
                </div>
                <div class="item-info">
                  <h3 class="item-name">{merchandise.itemName}</h3>
                </div>
               
             </div>
             </Link>
    );
  }
}

export default SearchItem;
