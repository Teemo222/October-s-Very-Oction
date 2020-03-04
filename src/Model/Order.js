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
    constructor(item, buyer, seller, price) {
        this.item = item;
        this.buyer = buyer;
        this.seller = seller;
        this.transactionTime = new Date();
        this.price = price;
        this.status = ORDERPLACED;
    }
}

const allOrders = [];

export function addOrder(item, buyer, seller, price) {
    const order = new Order(item, buyer, seller, price);
    allOrders.push(order);
    return order;
}

export function getOrderByBuyer(buyer) {
    const result = [];
    for(let i = 0; i < allOrders.length; i++) {
        if(allOrders[i].buyer === buyer) {
            result.push(allOrders[i]);
        }
    }
    return result;
}

export function getAllOrders(){
    return allOrders;
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

export function passItem(order){
    if(order.status == AUTHENTICATING){order.status = DELIVERING}
}

export function receiveItem(order){
    if(order.status == ORDERPLACED){order.status = AUTHENTICATING}
}

export function rejectItem(order){
    if(order.status == AUTHENTICATING){order.status = RETURNING}
}



export function getColumns(){
    return ["item", "buyer", "seller"]
}

export function getOrderBySeller(seller) {
    const result = [];
    for(let i = 0; i < allOrders.length; i++) {
        if(allOrders[i].seller === seller) {
            result.push(allOrders[i]);
        }
    }
    return result;
}

export default Order;