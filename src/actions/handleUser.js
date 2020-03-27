/* AJAX fetch() calls */
const log = console.log;

log('Loaded front-end javascript.');

// A function to send a POST request with a new student.
export async function addUser(username, password) {
    // the URL for the request
    const url = 'http://localhost:5000/users/create';

    // The data we are going to send in our request
    let user = {
        username : username,
        password : password
    };

    // log(JSON.stringify(user));
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
        console.log("!!! status");
        console.log(res);
        if(res.status !== 200) {
            return false;
        }
        let data = await res.json();
        log(data);
        return true;
    } catch(err) {
        console.log("signup ERROR");
        // log(err);
        return false;
    }
    // fetch(request)
    // .then(function(res) {
    //         log(res)
    //         console.log('Added User')
    // }).catch((error) => {
    //     log(error)
    // });
};

export async function loginUser(username, password) {
    // the URL for the request
    const url = 'http://localhost:5000/users/login';

    // The data we are going to send in our request
    let user = {
        username : username,
        password : password
    };

    // log(JSON.stringify(user));
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
        let data = await res.json();
        return data;
    } catch(err) {
        log(err)
    }  
}

export function logoutUser() {
    // the URL for the request
    const url = 'http://localhost:5000/users/logout';

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'get'
        ,credentials: "include"
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
            log(res)
            console.log('User Logout')
    }).catch((error) => {
        log(error)
    });    
}

export async function setUserPassword(userid, password) {
    // assume userId exists
    const url = 'http://localhost:5000/users/password';

    // The data we are going to send in our request
    let user = {
        userid: userid,
        password : password
    };

    log(JSON.stringify(user));
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
        log(data);
        console.log('User Password Updated');
        return data;
    } catch(err) {
        log(err);
    } 
  }

  export async function setUserInfo(userid, email, address, creditCardNumber) {
    // assume userId exists
    const url = 'http://localhost:5000/users/info';

    // The data we are going to send in our request
    let user = {
        userid: userid,
        email,
        address,
        creditCardNumber
    };

    log(JSON.stringify(user));
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
        // updateCurrentUser(data)
        log(data);
        console.log('User Info Updated');
        return data;
    } catch(err) {
        log(err);
    } 
  }
  
  export async function getAllUsers(){
    const url = 'http://localhost:5000/users/all';

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
    const url = "http://localhost:5000/users/check-session";
    // const url = "/users/check-session";

    try {
        let res = await fetch(url, { credentials: 'include' });
        if(res.status == 200) {
            let tempUser = await res.json();
            console.log("in readCookie")
            console.log(tempUser);
            return tempUser
        } else {
            return null;
        }
    } catch(error) {
        console.log(error);
        return null;
    }
};


export async function addToPurchase(userid, orderid) {
    const url = 'http://localhost:5000/users/add-purchase';
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
        // updateCurrentUser(data)
        log(data);
        console.log('User Info Updated');
        return data;
    } catch(err) {
        log(err);
    } 
  
}

export async function addToSelling(userid, orderid) {
    const url = 'http://localhost:5000/users/add-selling';
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
        console.log(res)
        if(res.status != 200) {
            alert("operation failed");
            return;
        }
        let data = await res.json();
        // updateCurrentUser(data)
        log(data);
        console.log('User Info Updated');
        return data;
    } catch(err) {
        log(err);
    } 
}

  
//   export async function isAdmin(){
//       // the URL for the request
//       const url = 'http://localhost:5000/users/admin';

//       // Create our request constructor with all the parameters we need
//       const request = new Request(url);
  
//       // Send the request with fetch()
//       try {
//         let res = await fetch(request);
//         return res.isAdmin;  
//       } catch(err) {
//           log(err);
//       }
//   }