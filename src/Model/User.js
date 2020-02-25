class User{
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}

export function addUser(userId, username, password){
  const fs = require('fs');
  let users;
  const result = fs.readFileSync("user.json")
  users = JSON.parse(result);
  users.push(new User(userId, username, password));
  fs.writeFileSync("user.json", JSON.stringify(users));

  console.log(users)
}




export default User;

addUser(1, "a", "b");

