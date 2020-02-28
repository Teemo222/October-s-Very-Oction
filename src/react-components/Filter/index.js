import React from "react";

import "./style.css";

import Header from '../Header';

/* The ItemPage Component */
class Filter extends React.Component {
    
  render() {
    const { handleFilterChange
    } = this.props;
    return (
            <div class="filter">
                <div onClick={handleFilterChange("SNEAKERS")}>
                    <p class="filtertext">SNEAKERS</p>
                </div>
                <div onClick={handleFilterChange("STREETWEAR")}>
                  <p class="filtertext">STREETWEAR</p>
                </div>
                    <div onClick={handleFilterChange("COLLECTIONS")}>
                    <p class="filtertext">COLLECTIONS</p>
                      </div>
                    <div onClick={handleFilterChange("WATCHES")}>
                    <p class="filtertext">WATCHES</p>
                    </div>
                    <div onClick={handleFilterChange("BAGS")}>
                    <p class="filtertext">BAGS</p>
                    </div>
             </div>
    );
  
}
}

export default Filter;
