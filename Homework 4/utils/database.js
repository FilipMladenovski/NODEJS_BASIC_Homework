import fs from 'fs';

const readUsers = () => {
  try {
    const data = fs.readFileSync('./users.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users data:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing users data:', error);
  }
};

export { readUsers, writeUsers };

const readPosts = () => {
  try {
    const data = fs.readFileSync('./posts.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posts data:', error);
    return [];
  }
};

const writePosts = (posts) => {
  try {
    fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing posts data:', error);
  }
};

export { readPosts, writePosts };

