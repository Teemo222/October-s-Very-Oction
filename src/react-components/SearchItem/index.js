import React from "react";

import "./styles.css";
import { Link } from "react-router-dom";

/* The ItemPage Component */
class SearchItem extends React.Component {
  render() {
    const {merchandise} = this.props;
    console.log('111111')
    return (
      <Link to={"/itemPage"}>
            <div class="singleitem">
              
                <div class="item-image">
                    <img class="img-1" src={merchandise.itemImageSrc}/>
                </div>
                <div class="item-info">
                  <h3 class="name">{merchandise.itemName}</h3>
                    <div class="price">$170.00</div>
                </div>
               
             </div>
             </Link>
    );
  }
}

export default SearchItem;
