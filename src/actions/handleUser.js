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

