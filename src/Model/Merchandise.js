import {addOrder} from "../actions/handleOrder";
import {getItems, itemAddBid, itemAddAsk, itemRemoveBid, itemRemoveAsk} from '../actions/handleMerchandise'


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

  addBid = function(price, userId){
    if (Object.keys(this.asks).length > 0 && price >= this.getLowestAsk()){
      const sellerId = this.getLowestAskSeller();
      const price = this.getLowestAsk();
      itemRemoveAsk(this.itemId, price, sellerId)
      // const order = addOrder(this, user, seller, price)
      // this.orderHistory.push(order)
      // user.purchaseHistory.push(order)
      // seller.sellingHistory.push(order)
    }
    else{
      itemAddBid(this.itemId, price, userId)
    }    
 
  }

  addAsk = function(price, userId){
    if (Object.keys(this.bids).length > 0 && price <= this.getHighestBid()){
      const buyerId = this.getHighestBidBuyer();
      const price = this.getHighestBid();
      itemRemoveBid(this.itemId, price, buyerId)
      // const order = addOrder(this, buyer, user, price)
      // this.orderHistory.push(order)
      // buyer.purchaseHistory.push(order)
      // user.sellingHistory.push(order)
    }
    else{
      itemAddAsk(this.itemId, price, userId)
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
    const asks = Object.keys(item.asks)
    asks.map((ask) => {
      if (item.asks[ask].length > 0){
        obj.asks[ask] = item.asks[ask]
      }
    })
    const bids = Object.keys(item.bids)
    bids.map((bid) => {
      if (item.bids[bid].length > 0){
        obj.bids[bid] = item.bids[bid]
      }
    })
    item.orderHistory.map((order) => {
      obj.orderHistory.push(order)
    })
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