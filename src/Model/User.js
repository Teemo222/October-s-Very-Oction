
class User{
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}
const users = [
  new User(1, 'zhaowe58', 'adsfoisjfdjf'),
  new User(2, 'wangs415', 'aoaiuwjfoijfwe'),
  new User(3, 'Mark', 'sfdsjfidfjdi')
];

const admin = [
  
];

export function addUser(userId, username, password){
  users.push(new User(userId, username, password));

  console.log(users)
}


export default User;

addUser(1, "a", "b");

