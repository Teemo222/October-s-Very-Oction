/* AJAX fetch() calls */
const log = console.log;

log('Loaded front-end javascript.');

// A function to send a POST request with a new student.
export function addUser(username, password) {
    // the URL for the request
    const url = 'http://localhost:5000/users';

    // The data we are going to send in our request
    let user = {
        username : username,
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
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
            log(res)
            console.log('Added User')
    }).catch((error) => {
        log(error)
    });
};

// A function to send a GET request to the web server,
//  and then loop through them and add a list element for each student.
// export async function getItems() {
//     // the URL for the request
//     const url = 'http://localhost:5000/items';

//     console.log(111)
//     // Since this is a GET request, simply call fetch on the URL
//     const items = await fetch(url)
//     .then((res) => { 
//         if (res.status === 200) {
//             // return a promise that resolves with the JSON body
//            return res.json() 
//        } else {
//             alert('Could not get item')
//        }                
//     })
//     .then((json) => {  // the resolved promise with the JSON body
//         console.log('aaa')
//         return json.items
//     }).catch((error) => {
//         log(error)
//     })
//     console.log(items)
//     return items;
// }