import {getAllOrders, addOrderDb, getOrderByBuyer, getOrderBySeller, handleItemStatus} from '../actions/handleOrder.js'

const ORDERPLACED = 0;
const AUTHENTICATING = 1;
const DELIVERING =2;
const RETURNING = 3;

// export function formatDate(date) {
//     var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();

//     if (month.length < 2) 
//         month = '0' + month;
//     if (day.length < 2) 
//         day = '0' + day;

//     return [year, month, day].join('-');
// }


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
    console.log(result)
    return result
}


export async function getOrderOfBuyer(buyerId) {
  const orders = await getOrderByBuyer(buyerId)
  const result = []
  orders.map((order) => {
    let obj = new Order(order._id, order.item, order.buyer, order.seller, order.price)
    obj.transactionTime = order.time;
    console.log(order.time)
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
      console.log(order.time)
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
    await handleItemStatus(order.orderId, "pass")
    const messageToSeller = {
        title: "Authentication passed",
        date: new Date(),
        content: "The item you delivered to us has passed the authentication."
      }
    await addMessageToDb(order.seller, messageToSeller)
    const messageToBuyer = {
        title: "Authentication passed",
        date: new Date(),
        content: "The item you purchased has passed the authentication."
      }
    await addMessageToDb(order.seller, messageToBuyer)
}

export async function receiveItem(order){
    if(order.status == ORDERPLACED){order.status = AUTHENTICATING}
    await handleItemStatus(order.orderId, "receive")
    const messageToSeller = {
        title: "Merchandise Received",
        date: new Date(),
        content: "The item you delivered to us has been received."
      }
    await addMessageToDb(order.seller, messageToSeller)
    const messageToBuyer = {
        title: "Authentication passed",
        date: new Date(),
        content: "The item you purchased has been delivered and waiting to be authenticated."
      }
    await addMessageToDb(order.seller, messageToBuyer)
}

export async function rejectItem(order){
    if(order.status == AUTHENTICATING){order.status = RETURNING}
    await handleItemStatus(order.orderId, "reject")
    const messageToSeller = {
        title: "Authentication failed",
        date: new Date(),
        content: "The item you delivered to us has failed the authentication."
      }
    await addMessageToDb(order.seller, messageToSeller)
    const messageToBuyer = {
        title: "Authentication failed",
        date: new Date(),
        content: "The item you purchased has failed the authentication."
      }
    await addMessageToDb(order.seller, messageToBuyer)

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