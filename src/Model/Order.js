class Order {
    constructor(item, user, price) {
        this.item = item;
        this.user = user;
        this.purchaseTime = new Date();
        this.price = price;
    }
}

const allOrders = [];

export function addOrder(item, user, price) {
    allOrders.push(new Order(item, user, price));
}

export function getOrderByUser(user) {
    const result = [];
    for(let i = 0; i < allOrders.length; i++) {
        if(allOrders[i].user === user) {
            result.push(allOrders[i]);
        }
    }
    return result;
}

export default Order