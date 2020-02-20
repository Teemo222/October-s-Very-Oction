import React from "react";

import "./styles.css";


/* The ItemPage Component */
class SearchItem extends React.Component {

  render() {
    const {item} = this.props;
    
    return (
        <div>
            <div class="singleitem">
                <div class="item-image">
                    <img class="img-1" src="./46457.jpg"/>
                </div>
                <div class="item-info">
                    <h3 class="name">Nike Air Force 1 Low</h3>
                    <div class="price">$170.00</div>
                </div>
             </div>
        </div>
    );
  }
}

export default SearchItem;
