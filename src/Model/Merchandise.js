import {addOrder} from "../actions/handleOrder";
import {getItems} from '../actions/handleMerchandise'

class Merchandise{
  constructor(itemId, itemName, itemCategory, itemDescription, itemImageSrc) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemDescription = itemDescription;
    this.itemImageSrc = itemImageSrc;
    this.bids = {}; // price : [userids]
    this.asks = {}; // price : [userids]
    this.orderHistory = []; //orderids
  }

  getLowestAsk = function (){
    const arr = Object.keys(this.asks);
    const data = []
    for (let i = 0; i< arr.length; i++){
      data.push(parseInt(arr[i]));

    }
    if (arr.length == 0){
      return "N/A"
    }
    const result =  Math.min.apply(null, data)

    return result
  }

  //return id of seller
  getLowestAskSeller = function (){
    const price = this.getLowestAsk();
    return this.asks[price][0]
  }

  getHighestBid = function(){
    const arr = Object.keys(this.bids);
    const data = []
    for (let i = 0; i< arr.length; i++){
      data.push(parseInt(arr[i]));
    }
    if (arr.length == 0){
      return "N/A"
    }
    const result =  Math.max.apply(null, data)
    return result
  }

  //return id of buyer
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
      if(this.asks[price].length == 0){
        delete this.asks[price]
      }
      // const order = addOrder(this, user, seller, price)
      // this.orderHistory.push(order)
      // user.purchaseHistory.push(order)
      // seller.sellingHistory.push(order)
    }
    else{
      if(price in this.bids){
        this.bids[price].push(user)
      }
      else{
        this.bids[price] = [user]
      }
    }    
 
  }

  addAsk = function(price, user){
    if (Object.keys(this.bids).length > 0 && price <= this.getHighestBid()){

      const buyer = this.getHighestBidBuyer();

      const price = this.getHighestBid();

      for (let i = 0; i < this.bids[price].length; i++){
        if (this.bids[price][i] === buyer){
          this.bids[price].splice(i, 1)
          break;
        }
      }
      if(this.bids[price].length == 0){
        delete this.bids[price]
      }
      // const order = addOrder(this, buyer, user, price)
      // this.orderHistory.push(order)
      // buyer.purchaseHistory.push(order)
      // user.sellingHistory.push(order)
    }
    else{
      if(price in this.asks){
        this.asks[price].push(user)
      }
      else{
        this.asks[price] = [user]
      }
    }  

  }

    getAllAsks = function () {
      const arr = Object.keys(this.asks);
      const result = [];
      for (let i = 0; i< arr.length; i++){
        for (let j = 0; j < this.asks[arr[i]].length; j++){
          result.push(parseInt(arr[i]));
        }
      }
      return result;
    }

    getAllBids = function () {
      const arr = Object.keys(this.bids);
      const result = [];
      for (let i = 0; i< arr.length; i++){
        for (let j = 0; j < this.bids[arr[i]].length; j++){
          result.push(parseInt(arr[i]));
        }
      }
      return result;
    }
}


export async function getAllItems(){
  const items = await getItems()
  const result = []
  items.map((item) => {
    let obj = new Merchandise(item._id, item.itemName, item.itemCategory, item.itemDescription, item.itemImageSrc)
    // item.asks.map((ask) => {
    //   //map asks
    // })
    // item.bids.map((bid) => {
    //   //map bids
    // })
    // item.orderHistory.map((order) => {
    //   //map orders
    // })
    result.push(obj)
  })
  return result
}

export async function filterByKeyword(originalList, keyword){
  const result = []
  console.log(originalList)
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

export default Merchandise;