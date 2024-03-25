import User from '../models/User.js';
import { readUsers, writeUsers } from '../utils/database.js';

const registerUser = (req, res) => {
  console.log(req.body); // Log the request body for debugging
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Please provide name, username, and password' });
  }
  const users = readUsers();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = new User(name, username, password);
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide username and password' });
  }
  const users = readUsers();
  const user = users.find(user => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  req.session.user = user;
  res.json({ message: 'Login successful', user });
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('session');
    res.json({ message: 'Logout successful' });
  });
};

export { registerUser, loginUser, logoutUser };
