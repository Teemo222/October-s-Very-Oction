import {getAllOrders, addOrderDb, getOrderByBuyer, getOrderBySeller, handleItemStatus} from '../actions/handleOrder.js'
import {addMessageToDb} from '../actions/handleUser'

const ORDERPLACED = 0;
const AUTHENTICATING = 1;
const DELIVERING =2;
const RETURNING = 3;

class Order {
    constructor(orderId, itemId, buyerId, sellerId, price) {
        this.orderId = orderId;
        this.itemId = itemId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.transactionTime = new Date();
        this.price = price;
        this.status = ORDERPLACED;
    }
}



export async function addOrder(itemId, buyerId, sellerId, price){
    const result = await addOrderDb(itemId, buyerId, sellerId, price, new Date(), ORDERPLACED);
    return result
}


export async function getOrderOfBuyer(buyerId) {
  const orders = await getOrderByBuyer(buyerId)
  const result = []
  orders.map((order) => {
    let obj = new Order(order._id, order.item, order.buyer, order.seller, order.price)
    obj.transactionTime = order.time;
    obj.status = order.status
    result.push(obj)
  })
  return result
}

export async function getOrderOfSeller(sellerId) {
    const orders = await getOrderBySeller(sellerId)
    const result = []
    orders.map((order) => {
      let obj = new Order(order._id, order.item, order.buyer, order.seller, order.price)
      obj.transactionTime = order.time;
      obj.status = order.status
      result.push(obj)
    })
    return result
}

export function ReceiveAuthentication(){
    this.setState({
        ["status"]: AUTHENTICATING
      })
}

export function getStatus(order){
    switch(order.status){
        case ORDERPLACED:
            return "Order Placed";
        case AUTHENTICATING:
            return "Authenticating";
        case DELIVERING:
            return "Delivering";
        case RETURNING:
            return "Rejected";
    }   
}

export function getAction(order){
    switch(order.status){
        case ORDERPLACED:
            return "Receive";
        case AUTHENTICATING:
            return "Finish Authenticate";
        case DELIVERING:
            return "";
        case RETURNING:
            return "";
    }  
}

export async function passItem(order){
    if(order.status == AUTHENTICATING){order.status = DELIVERING}
    else{return}
    await handleItemStatus(order.orderId, "pass")
    const messageToSeller = {
        title: "Authentication passed",
        date: new Date(),
        content: "The merchandise you delivered to us, " + order.item.itemName + ", has passed the authentication. It will be shipped to the buyer within a few business days"
      }
    await addMessageToDb(order.seller._id, messageToSeller)
    const messageToBuyer = {
        title: "Authentication passed",
        date: new Date(),
        content: "The merchandise you purchased, " + order.item.itemName + ", has passed the authentication. It will be shipped to you within a few business days"
      }
    await addMessageToDb(order.buyer._id, messageToBuyer)
}

export async function receiveItem(order){
    if(order.status == ORDERPLACED){order.status = AUTHENTICATING}
    else{return}
    await handleItemStatus(order.orderId, "receive")
    const messageToSeller = {
        title: "Merchandise Received",
        date: new Date(),
        content: "The merchandise you sent to us, " + order.item.itemName + ", has been received by our authentication team. It will be processed within a few business days"
      }
    await addMessageToDb(order.seller._id, messageToSeller)
    const messageToBuyer = {
        title: "Authentication passed",
        date: new Date(),
        content: "The merchandise you purchased, " + order.item.itemName + ", has been delivered to us and waiting to be authenticated."
      }
    await addMessageToDb(order.buyer._id, messageToBuyer)
}

export async function rejectItem(order){
    if(order.status == AUTHENTICATING){order.status = RETURNING}
    else{return}
    await handleItemStatus(order.orderId, "reject")
    const messageToSeller = {
        title: "Authentication failed",
        date: new Date(),
        content: "Unfortunately, the merchandise you sent to us, " + order.item.itemName + ", is returned by our authentication team. It will be shipped back to you within a few business days"
      }
    await addMessageToDb(order.seller._id, messageToSeller)
    const messageToBuyer = {
        title: "Authentication failed",
        date: new Date(),
        content: "Unfortunately, the merchandise you purchased, " + order.item.itemName + ", is returned by our authentication team. The order is cancelled."
      }
    await addMessageToDb(order.buyer._id, messageToBuyer)

}

export function getColumns(){
    return ["item", "buyer", "seller"]
}

export async function getOrders(){
  const orders = await getAllOrders()
  const result = []
  orders.map((order) => {
    let obj = new Order(order._id, order.item, order.buyer, order.seller, order.price)
    obj.transactionTime = order.time;
    obj.status = order.status
    result.push(obj)
  })
  return result
}

export default Order;