import { v4 as uuidv4 } from 'uuid';

class User {
  constructor(name, username, password) {
    this.id = uuidv4();
    this.name = name;
    this.username = username;
    this.password = password;
    this.createdAt = new Date().toISOString();
  }
}

export default User;
