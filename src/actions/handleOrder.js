/* AJAX fetch() calls */
const log = console.log

export async function getOrderByOrderId(orderId) {
    const url = 'http://localhost:5000/order/' + orderId;

    const order = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get orders')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json
    }).catch((error) => {
        log(error)
    })
    
    return order;
}


export async function getOrderByBuyer(buyerId) {
    const url = 'http://localhost:5000/order-buyer/' + buyerId;

    const orders = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get orders')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json
    }).catch((error) => {
        log(error)
    })
    
    return orders;
}

export async function getOrderBySeller(sellerId) {
    const url = 'http://localhost:5000/order-seller/' + sellerId;

    const orders = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get orders')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json
    }).catch((error) => {
        log(error)
    })
    
    return orders;
}

export async function addOrderDb(itemId, buyerId, sellerId, price, time, status){
    const url = 'http://localhost:5000/order';

    const act = {
        item:itemId,
        buyer:buyerId,
        seller:sellerId,
        price:price,
        time:time,
        status:status
    }

    const req = new Request(url, {
        method:"post",
        body:JSON.stringify(act),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    const order = await fetch(req).then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((order) => {  // the resolved promise with the JSON body
        return order
    }).catch((error) => {
        log(error)
    })
    return order
}

export async function getAllOrders() {
    const url = 'http://localhost:5000/all-order/';
    fetch(url).then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((orders) => {  // the resolved promise with the JSON body
        return orders
    }).catch((error) => {
        log(error)
    })
}

export async function handleItemStatus(orderId, action) {
    // the URL for the request

    let url;
    switch(action){
        case "pass":
            url = "http://localhost:5000/pass-order/" + orderId;
        case "receive":
            url = "http://localhost:5000/receive-order/" + orderId;
        case "reject":
            url = "http://localhost:5000/reject-order/" + orderId;
    }  

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    // Send the request with fetch()
    await fetch(request).catch((error) => {
        log(error)
        throw error;
    })
}