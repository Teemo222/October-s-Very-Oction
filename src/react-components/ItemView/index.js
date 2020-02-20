import React from "react";

import "./styles.css";


/* The ItemView Component */
class ItemView extends React.Component {

  render() {
    const {item} = this.props;
    
    return (
      <div class="container">
        <div class="left-column">
                <img src={item.itemImageSrc}/>
            </div>
      
            
            <div class="right-column">
           
                <div class="product-description">
                    <span>{item.itemCategory}</span>
                    <h1>{item.itemName}</h1>
                    <p>{item.itemDescription} </p>
                </div>

            
                <div class="product-price">
                    <span id = "bidPrice">2236$</span>
                    <a class="buy-btn">Bid</a>
                    <span id = "sellPrice">2128$</span>
                    <a class="sell-btn">Sell</a>
                </div>
            </div>
        

      </div>

    );
  }
}

export default ItemView;
