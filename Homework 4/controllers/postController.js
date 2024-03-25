import Post from '../models/Post.js';
import { readPosts, writePosts } from '../utils/database.js';

const getAllPosts = (req, res) => {
  const posts = readPosts();
  res.json(posts);
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post(title, content);
  const posts = readPosts();
  posts.push(newPost);
  writePosts(posts);
  res.status(201).json({ message: 'Post created successfully', post: newPost });
};

const deletePost = (req, res) => {
  const postId = req.params.id;
  const posts = readPosts();
  const index = posts.findIndex(post => post.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
    writePosts(posts);
    res.json({ message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const posts = readPosts();
  const index = posts.findIndex(post => post.id === postId);
  if (index !== -1) {
    const updatedPost = { ...posts[index], title, content, updatedAt: new Date().toISOString() };
    posts[index] = updatedPost;
    writePosts(posts);
    res.json({ message: 'Post updated successfully', post: updatedPost });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
};

export { getAllPosts, createPost, deletePost, updatePost };
