
class User{
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}
let count = 0
const users = [];
const admin = [];

export function addUser(username, password){
  for (let i = 0; i < users.length; i++){
    if (users[i].username == username){
      return false;
    }
  }
  users.push(new User(count, username, password));
  count ++;
  return true;
}

export function getUser(username, password){
  for (let i = 0; i < users.length; i++){
    if (users[i].username == username && users[i].password == password){
      return users[i]
    }
  }
  return null;
}

export default User;

