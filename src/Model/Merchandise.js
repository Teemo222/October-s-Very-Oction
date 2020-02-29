import { addOrder } from "./Order";

class Merchandise{
  constructor(itemId, itemName, itemCategory, itemDescription, itemImageSrc) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemDescription = itemDescription;
    this.itemImageSrc = itemImageSrc;
    this.bids = {};
    this.asks = {};
  }

  getLowestAsk = function (){
    const arr = Object.keys(this.asks);
    const result =  Math.min(arr)
    if (result != Infinity){return result;}
    else{return "N/A"}
  }

  getLowestAskSeller = function (){
    const price = this.getLowestAsk();
    return this.asks[price][0]
  }

  getHighestBid = function(){
    const arr = Object.keys(this.bids);
    const result =  Math.max(arr)
    if (result != Infinity){return result;}
    else{return "N/A"}
  }

  getHighestBidBuyer = function (){
    const price = this.getHighestBid();
    return this.bids[price][0]
  }

  addBid = function(price, user){
    if (Object.keys(this.asks).length > 0 && price >= this.getLowestAsk()){
      const seller = this.getLowestAskSeller();
      const price = this.getLowestAsk();
      for (let i = 0; i < this.asks[price].length; i++){
        if (this.asks[price][i] === seller){
          this.asks[price].splice(i, 1)
          break;
        }
      }
      addOrder(this, user, seller, price)
    }
    else{
      if(price in this.bids){
        this.bids.push(user)
      }
      else{
        this.bids[price] = [user]
      }
    }    
    console.log(this.bids)  
  }

  addAsk = function(price, user){
    if (Object.keys(this.bids).length > 0 && price <= this.getHighestBid()){
      console.log("fuck")
      const buyer = this.getHighestBidBuyer();
      console.log(buyer)
      const price = this.getHighestBid();
      console.log(price)
      for (let i = 0; i < this.bids[price].length; i++){
        if (this.bids[price][i] === buyer){
          this.bids[price].splice(i, 1)
          break;
        }
      }
      if(this.bids[price].length == 0){
        delete this.bids[price]
      }
      console.log(this.bids)
      addOrder(this, buyer, user, price)
    }
    else{
      if(price in this.asks){
        this.asks.push(user)
      }
      else{
        this.asks[price] = [user]
      }
    }  
    console.log(this.asks)  
  }
}

let count = 0;
const allItems = [];

export function addItem(itemName, itemCategory, itemDescription, itemImageSrc){
  for (let i = 0; i < allItems.length; i++){
    if (allItems[i].itemName == itemName){
      return false;
    }
  }
  allItems.push(new Merchandise(count, itemName, itemCategory, itemDescription, itemImageSrc));
  count ++;
  return true;
}

export function getAllItems(){
  return allItems;
}

export function filterByKeyword(originalList, keyword){
  const result = []
  for (let i = 0; i < originalList.length; i++){

    if (originalList[i].itemName.includes(keyword)){
      result.push(originalList[i])
    }
  }
  return result;
}

export function filterByCategory(originalList, category){
  const result = []
  for (let i = 0; i < originalList.length; i++){
  
    if (originalList[i].itemCategory == category){
      result.push(originalList[i])
    }
  }
  
  return result;
}

addItem("Nike Kobe 7", "SNEAKERS", "This shoe is really cool", "/img/kobe.jpg");
addItem("UT Sweatshirt", "STREETWEAR", "WOW I love it so much", "/img/14355271t.jpg");
addItem("Nike Kobe 4", "SNEAKERS", "Beautiful", "/img/kobe2.jpg");
addItem("Nike AF 1", "SNEAKERS", "Beautiful", "/img/img01.jpg");
addItem("UT sticker", "COLLECTIONS", "Beautiful", "/img/uoftcompsci.jpg");
addItem("Nike Mask", "COLLECTIONS", "Beautiful", "/img/46457.jpg");
addItem("Nike Kobe 5", "SNEAKERS", "Beautiful", "/img/kobe2.jpg");
addItem("Nike Kobe 9", "SNEAKERS", "Beautiful", "/img/kobe2.jpg");
addItem("Nike Kobe 10", "SNEAKERS", "Beautiful", "/img/kobe2.jpg");


console.log(allItems)

export default Merchandise