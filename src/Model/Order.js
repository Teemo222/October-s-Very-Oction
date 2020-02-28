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

export function addOrder(itemId, buyer, seller, price) {
    allOrders.push(new Order(itemId, buyer, seller, price));
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