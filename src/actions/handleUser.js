import {API_URL} from '../config';
const { v4: uuidv4 } = require('uuid');
/* AJAX fetch() calls */
const log = console.log;

log('Loaded front-end javascript.');

// A function to send a POST request with a new student.
export async function addUser(username, password) {
    // the URL for the request
    const url = API_URL+'users/create';

    // The data we are going to send in our request
    let user = {
        username : username,
        password : password
    };

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        ,credentials: "include"
    });

    // Send the request with fetch()
    try {
        // https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok
        let res = await fetch(request);
        if(res.status !== 200) {
            return false;
        }
        let data = await res.json();
        return true;
    } catch(err) {
        return false;
    }
};

export async function loginUser(username, password) {
    // the URL for the request
    const url = API_URL+'users/login';

    // The data we are going to send in our request
    let user = {
        username : username,
        password : password
    };

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        ,credentials: "include"
    });

    // Send the request with fetch()
    try {
        let res = await fetch(request);
        let data;
        if(res.status === 200) {
            data = await res.json();
            return data;
        } else {
            log("login user fail, response status: ", res.status)
        }
    } catch(err) {
        log(err)
    }  
}

export function logoutUser() {
    // the URL for the request
    const url = API_URL+'users/logout';

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'get'
        ,credentials: "include"
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        
    }).catch((error) => {
        log(error)
    });    
}

export async function setUserPassword(userid, password) {
    // assume userId exists
    const url = API_URL+'users/password';

    // The data we are going to send in our request
    let user = {
        userid: userid,
        password : password
    };

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        ,credentials: "include"
    });

    // Send the request with fetch()
    try {
        let res = await fetch(request);
        if(res.status != 200) {
            alert("operation failed");
            return;
        }
        let data = await res.json();
        // updateCurrentUser(data);
        return data;
    } catch(err) {
        log(err);
    } 
  }

  export async function setUserInfo(userid, email, address, creditCardNumber) {
    // assume userId exists
    const url = API_URL+'users/info';

    // The data we are going to send in our request
    let user = {
        userid: userid,
        email,
        address,
        creditCardNumber
    };

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "include"
    });

    // Send the request with fetch()
    try {
        let res = await fetch(request);
        if(res.status != 200) {
            alert("operation failed");
            return;
        }
        let data = await res.json();
        return data;
    } catch(err) {
        log(err);
    } 
  }
  
  export async function getAllUsers(){
    const url = API_URL+'users/all';

    // Create our request constructor with all the parameters we need
    const request = new Request(url);

    // Send the request with fetch()
    try {
        let res = await fetch(request, { credentials: "include"});
        let data = res.json();
        return data;  
    } catch(err) {
        log(err);
    }
  }

// export function updateCurrentUser(user) {
//     sessionStorage.setItem('user', JSON.stringify(user));
// }

// A function to check if a user is logged in on the session cookie
export const readCookie = async(app) => {
    const url = API_URL+"users/check-session/" + uuidv4();
    // const url = "/users/check-session";

    try {
        let res = await fetch(url, { credentials: 'include' });
        if(res.status == 200) {
            let tempUser = await res.json();

            return tempUser
        } else {
            return null;
        }
    } catch(error) {
        return null;
    }
};


export async function addToPurchase(userid, orderid) {
    const url = API_URL+'users/add-purchase';
    let purchase = {
        userid: userid,
        orderid: orderid
    };
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(purchase),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        ,credentials: "include"
    });
    try {
        let res = await fetch(request);
        if(res.status != 200) {
            alert("operation failed");
            return;
        }
        let data = await res.json();
        
        return data;
    } catch(err) {
        log(err);
    } 
  
}

export async function addToSelling(userid, orderid) {
    const url = API_URL+'users/add-selling';
    let selling = {
        userid: userid,
        orderid: orderid
    };
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(selling),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        ,credentials: "include"
    });
    try {
        let res = await fetch(request);
 
        if(res.status != 200) {
            alert("operation failed");
            return;
        }
        let data = await res.json();
        // updateCurrentUser(data)
        return data;
    } catch(err) {
        log(err);
    } 
}

export async function addMessageToDb(userId, message) {
    const url = API_URL+'users/add-message';
    let mes = {
        userid: userId,
        message: message
    };
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(mes),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
        ,credentials: "include"
    });
    try {
        let res = await fetch(request);
        if(res.status != 200) {
            alert("operation failed");
            return;
        }
        let data = await res.json();
        // updateCurrentUser(data)
        return data;
    } catch(err) {
        log(err);
    } 
}