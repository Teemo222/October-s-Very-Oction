class User{
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.purchaseHistory = []
    this.sellingHistory = []
    this.inbox = []
    this.address = ""
    this.creditCardNumber = ""
    this.email = ""
  }
}

class Authenticator extends User{
  constructor(userId, username, password){
    super(userId, username, password)
    this.tasks = []
  }
}


const authenticator = new Authenticator(0, "admin", "admin")


let count = 1
const users = [];
const admin = [authenticator];




// export function addUser(username, password){
//   for (let i = 0; i < users.length; i++){
//     if (users[i].username == username){
//       return false;
//     }
//   }
//   users.push(new User(count, username, password));
//   count ++;
//   return true;
// }

// export function getUser(username, password){
//   for (let i = 0; i < users.length; i++){
//     if (users[i].username == username && users[i].password == password){
//       return users[i]
//     }
//   }
//   for (let i = 0; i < admin.length; i++){
//     if (admin[i].username == username && admin[i].password == password){
//       return admin[i]
//     }
//   }
//   return null;
// }

// export function setUserPassword(userId, password) {
//   // assume userId exists
//   for (let i = 0; i < users.length; i++){
//     if (users[i].userId == userId){
//       users[i].password = password;
//     }
//   }
// }

// export function getAll(){
//   return users;
// }

// export function getAdmin(){
//   return admin;
// }


// export default User;

