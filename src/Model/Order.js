const ORDERPLACED = 0;
const AUTHENTICATING = 1;
const DELIVERING =2;
const RETURNING = 3;

class Order {
    constructor(item, buyer, seller, price) {
        this.item = item;
        this.buyer = buyer;
        this.seller = seller;
        this.transactionTime = new Date();
        this.price = price;
    }
}

const allOrders = [];

export function addOrder(item, buyer, seller, price) {
    allOrders.push(new Order(item, buyer, seller, price));
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

export default Order