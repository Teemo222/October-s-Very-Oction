/* AJAX fetch() calls */
const log = console.log

log('Loaded front-end javascript.')

// A function to send a GET request to the web server,
//  and then loop through them and add a list element for each student.
export function getStudents() {
    // the URL for the request
    const url = 'http://localhost:5000/students';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get students')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        log(json)
    }).catch((error) => {
        log(error)
    })
}

// A function to send a POST request with a new student.
export function addStudent() {
    // the URL for the request
    const url = 'http://localhost:5000/students';

    // The data we are going to send in our request
    let data = {
        name: "nice",
        year: 1
    }

    log(JSON.stringify(data))
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
            log(res)
            console.log('Added student')
    }).catch((error) => {
        log(error)
    })
}
