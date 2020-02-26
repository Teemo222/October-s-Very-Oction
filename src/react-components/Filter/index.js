import React from "react";

import "./style.css";

import Header from '../Header';

/* The ItemPage Component */
class Filter extends React.Component {
    
  render() {
    return (
            <div class="filter">
                
                    <p class="filtertext">SNEAKERS</p>
                    <p class="filtertext">STREETWEAR</p>
                    <p class="filtertext">COLLECTIONS</p>
                    <p class="filtertext">WATCHES</p>
                    <p class="filtertext">BAGS</p>
    </div>
    );
  }
}

export default Filter;
