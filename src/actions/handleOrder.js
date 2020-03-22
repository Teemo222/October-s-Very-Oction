/* AJAX fetch() calls */
const log = console.log

log('Loaded front-end javascript.')


export async function getOrderByBuyer(buyerId) {
    const url = 'http://localhost:5000/order-buyer/' + buyerId;
    try{
        const res = await fetch(url);
        return res;
    }catch(err){
        console.log(err);
        throw err; // WHAT TO DO ?
    }

}

export async function addOrder(itemId, buyerId, sellerId, price){
    const url = 'http://localhost:5000/order/';

    const req = new Request(url, {
        method:"post",
        body:{
            item:itemId,
            buyer:buyerId,
            seller:sellerId,
            price: price
        },
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    return await fetch(req);
}

export async function getAllOrders() {
    const url = 'http://localhost:5000/all-order/';
    return await fetch(url);
}

export async function getOrderBySeller(sellerId) {
    const url = 'http://localhost:5000/order-seller/' + sellerId;
    return await fetch(url);
}